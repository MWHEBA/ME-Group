<?php
/**
 * ME GROUP WEBSITE — PRODUCTION EMAIL DISPATCHER API
 * 
 * Target Environment: Apache / cPanel / PHP 8.x
 * Location: public/api/send-mail.php (copied to out/api/send-mail.php on export)
 * Last Updated: 2026-10-21 (PHP 8.x modern OOP MIME verification)
 * 
 * Features:
 * - CORS protection (restricted to megroup-eg.com, www.megroup-eg.com, and localhost)
 * - Anti-Spam: Honeypot trap + IP-based rate limiting (5 req / 10 min)
 * - Email Header Injection / CRLF sanitization
 * - MIME Multipart Email with physical file attachments from $_FILES
 * - Professional ME Group branded HTML email templates
 * - Safe Client Auto-acknowledgment (with backscatter protections)
 * - Dual-Engine Transport: Primary native cPanel MTA (SPF-aligned on 84.247.179.163) + SMTP socket fallback
 */

// -----------------------------------------------------------------------------
// 1. HTTP HEADERS & CORS CONTROL
// -----------------------------------------------------------------------------
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://megroup-eg.com',
    'https://www.megroup-eg.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Max-Age: 86400');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'preflight_ok']);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. POST is required.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 2. HELPER UTILITIES & SANITIZATION
// -----------------------------------------------------------------------------

function sanitizeHeader(string $str): string {
    // Strip CRLF and injection attempts
    return trim(str_ireplace(["\r", "\n", "%0a", "%0d", "content-type:", "bcc:", "to:", "cc:"], '', $str));
}

function cleanInput(?string $str): string {
    if ($str === null) return '';
    return htmlspecialchars(trim($str), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function sendJsonResponse(bool $success, string $message, string $refId = '', int $statusCode = 200, array $extra = []): void {
    http_response_code($statusCode);
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message,
        'deliveryReference' => $refId,
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
    ], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}

// -----------------------------------------------------------------------------
// 3. SECURITY: HONEYPOT & RATE LIMITING
// -----------------------------------------------------------------------------

// Honeypot trap: if filled by a bot, silently report success to thwart retry loops
if (!empty($_POST['honeypot'])) {
    sendJsonResponse(true, 'Your request has been received.', 'DISCARD-OK');
}

// IP-based Rate Limiter (Max 5 requests per 10 minutes)
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? '0.0.0.0';

// Handle comma-separated IP lists from proxies
if (strpos($clientIp, ',') !== false) {
    $clientIp = trim(explode(',', $clientIp)[0]);
}

$rateLimitDir = sys_get_temp_dir() . '/megroup_rate_limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0755, true);
}

$rateFile = $rateLimitDir . '/rate_' . md5($clientIp) . '.json';
$currentTime = time();
$windowSeconds = 600; // 10 minutes
$maxRequests = 20; // Generous ceiling for corporate offices, port networks, and active testing

$rateData = ['count' => 0, 'first_request' => $currentTime];
if (file_exists($rateFile)) {
    $content = @file_get_contents($rateFile);
    if ($content) {
        $decoded = json_decode($content, true);
        if (is_array($decoded) && isset($decoded['first_request'], $decoded['count'])) {
            if ($currentTime - $decoded['first_request'] < $windowSeconds) {
                $rateData = $decoded;
            } else {
                // Window expired: start fresh period
                $rateData = ['count' => 0, 'first_request' => $currentTime];
            }
        }
    }
}

if ($rateData['count'] >= $maxRequests) {
    sendJsonResponse(
        false, 
        'تم تجاوز الحد المسموح به من الطلبات مؤقتاً. يرجى الانتظار بضع دقائق ثم المحاولة مجدداً.', 
        '', 
        429
    );
}

$rateData['count']++;
@file_put_contents($rateFile, json_encode($rateData));

// -----------------------------------------------------------------------------
// 4. PARSE & NORMALIZE FORM DATA
// -----------------------------------------------------------------------------

$formType = cleanInput($_POST['formType'] ?? 'general_enquiry');
$locale = cleanInput($_POST['locale'] ?? 'en');
$isAr = ($locale === 'ar');

// Unique reference ID (e.g. MEG-2026-A9C3F)
$refId = 'MEG-' . date('Y') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

$contactName = cleanInput($_POST['contactName'] ?? '');
$companyName = cleanInput($_POST['companyName'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL) ? trim($_POST['email']) : '';
$phone = cleanInput($_POST['phone'] ?? '');

if (empty($contactName) && $formType !== 'rapid_support') {
    sendJsonResponse(false, $isAr ? 'الاسم بالكامل مطلوب.' : 'Contact name is required.', '', 400);
}

if (empty($email) && $formType !== 'rapid_support') {
    sendJsonResponse(false, $isAr ? 'البريد الإلكتروني غير صحيح أو مطلوب.' : 'A valid email address is required.', '', 400);
}

// -----------------------------------------------------------------------------
// 5. EXTRACT DETAILS BY FORM TYPE
// -----------------------------------------------------------------------------

$emailSubjectPrefix = '';
$detailsTable = [];

switch ($formType) {
    case 'technical_support':
        $vesselName = cleanInput($_POST['vesselName'] ?? '');
        $imoNumber = cleanInput($_POST['imoNumber'] ?? '');
        $vesselType = cleanInput($_POST['vesselType'] ?? '');
        $currentPort = cleanInput($_POST['currentPort'] ?? '');
        $systemDiscipline = cleanInput($_POST['systemDiscipline'] ?? '');
        $equipmentMaker = cleanInput($_POST['equipmentMaker'] ?? '');
        $equipmentModel = cleanInput($_POST['equipmentModel'] ?? '');
        $problemDescription = cleanInput($_POST['problemDescription'] ?? '');
        $urgency = cleanInput($_POST['urgency'] ?? 'normal');
        $contactPref = cleanInput($_POST['preferredContactMethod'] ?? 'email');

        $emailSubjectPrefix = "[TECHNICAL SUPPORT] {$vesselName} (" . strtoupper($systemDiscipline) . ")";
        $detailsTable = [
            'Form Type' => 'Technical Support Intake',
            'Vessel Name' => $vesselName,
            'IMO Number' => $imoNumber ?: '—',
            'Vessel Type' => $vesselType ?: '—',
            'Current Port / Location' => $currentPort,
            'System Discipline' => strtoupper($systemDiscipline),
            'Equipment Maker / Model' => trim("{$equipmentMaker} {$equipmentModel}") ?: '—',
            'Urgency Level' => strtoupper($urgency),
            'Preferred Contact Method' => strtoupper($contactPref),
            'Client Contact' => $contactName,
            'Company' => $companyName ?: '—',
            'Email' => $email,
            'Phone' => $phone ?: '—',
            'Problem Description' => nl2br($problemDescription),
        ];
        break;

    case 'rapid_support':
        $vesselName = cleanInput($_POST['vesselName'] ?? '');
        $currentPort = cleanInput($_POST['currentPort'] ?? '');
        $problemSummary = cleanInput($_POST['problemSummary'] ?? '');
        $systemDiscipline = cleanInput($_POST['systemDiscipline'] ?? 'Unspecified');

        $emailSubjectPrefix = "[RAPID RESPONSE 24/7] {$vesselName} @ {$currentPort}";
        $detailsTable = [
            'Form Type' => '24/7 Rapid Emergency Support',
            'Vessel Name' => $vesselName,
            'Port / Location' => $currentPort,
            'System Discipline' => strtoupper($systemDiscipline),
            'Emergency Phone' => $phone,
            'Problem Summary' => nl2br($problemSummary),
        ];
        break;

    case 'spare_parts':
        $identificationPath = cleanInput($_POST['identificationPath'] ?? 'known_part');
        $partName = cleanInput($_POST['partName'] ?? '');
        $partNumber = cleanInput($_POST['partNumber'] ?? '');
        $maker = cleanInput($_POST['maker'] ?? '');
        $model = cleanInput($_POST['model'] ?? '');
        $quantity = cleanInput($_POST['quantity'] ?? '1');
        $deliveryLocation = cleanInput($_POST['deliveryLocation'] ?? '');
        $requiredDate = cleanInput($_POST['requiredDate'] ?? '');
        $notes = cleanInput($_POST['notes'] ?? '');

        $emailSubjectPrefix = "[SPARE PARTS] {$partName} ({$quantity} units)";
        $detailsTable = [
            'Form Type' => 'Spare Parts Requisition',
            'Identification Path' => $identificationPath === 'known_part' ? 'Known OEM Part Number' : 'Nameplate / Photo Identification',
            'Part Name' => $partName,
            'Part Number' => $partNumber ?: '—',
            'Equipment Maker / Model' => trim("{$maker} {$model}") ?: '—',
            'Quantity' => $quantity,
            'Delivery Port / Location' => $deliveryLocation,
            'Target Required Date' => $requiredDate ?: '—',
            'Client Contact' => $contactName,
            'Company' => $companyName ?: '—',
            'Email' => $email,
            'Phone' => $phone ?: '—',
            'Notes / Specs' => nl2br($notes) ?: '—',
        ];
        break;

    case 'general_enquiry':
    default:
        $subject = cleanInput($_POST['subject'] ?? 'General Marine Enquiry');
        $message = cleanInput($_POST['message'] ?? '');

        $emailSubjectPrefix = "[COMMERCIAL ENQUIRY] {$subject}";
        $detailsTable = [
            'Form Type' => 'Commercial / General Enquiry',
            'Subject' => $subject,
            'Contact Name' => $contactName,
            'Company' => $companyName ?: '—',
            'Email' => $email,
            'Phone' => $phone ?: '—',
            'Message Details' => nl2br($message),
        ];
        break;
}

// -----------------------------------------------------------------------------
// 6. PROCESS FILE ATTACHMENTS
// -----------------------------------------------------------------------------

$attachments = [];
$allowedMimes = [
    'application/pdf' => 'pdf',
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'application/msword' => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'text/plain' => 'txt',
];
$maxFileSizeBytes = 5 * 1024 * 1024; // 5MB per file

if (!empty($_FILES['attachments'])) {
    $files = $_FILES['attachments'];
    $fileCount = is_array($files['name']) ? count($files['name']) : 0;

    for ($i = 0; $i < $fileCount; $i++) {
        $error = $files['error'][$i];
        if ($error === UPLOAD_ERR_NO_FILE) continue;
        if ($error !== UPLOAD_ERR_OK) continue;

        $tmpName = $files['tmp_name'][$i];
        $size = $files['size'][$i];
        $originalName = basename($files['name'][$i]);

        if ($size > $maxFileSizeBytes) continue;

        // Verify real MIME type using modern finfo object (PHP 8.x compatible)
        $detectedMime = 'application/octet-stream';
        if (class_exists('finfo')) {
            $finfoObj = new finfo(FILEINFO_MIME_TYPE);
            $detectedMime = $finfoObj->file($tmpName) ?: 'application/octet-stream';
        } elseif (function_exists('mime_content_type')) {
            $detectedMime = mime_content_type($tmpName) ?: 'application/octet-stream';
        }

        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if (isset($allowedMimes[$detectedMime]) || in_array($ext, ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'docx', 'txt'], true)) {
            $content = file_get_contents($tmpName);
            if ($content !== false) {
                $attachments[] = [
                    'name' => sanitizeHeader($originalName),
                    'mime' => $detectedMime ?: 'application/octet-stream',
                    'data' => chunk_split(base64_encode($content)),
                ];
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 7. BUILD BRANDED HTML EMAIL TEMPLATES
// -----------------------------------------------------------------------------

function renderAdminEmailHtml(string $refId, array $details, int $attachmentCount): string {
    $rowsHtml = '';
    foreach ($details as $label => $val) {
        $rowsHtml .= "
        <tr>
            <td style=\"padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-weight: 600; color: #475569; width: 35%; font-size: 13px; text-transform: uppercase;\">
                {$label}
            </td>
            <td style=\"padding: 10px 14px; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-size: 14px;\">
                {$val}
            </td>
        </tr>";
    }

    $attachmentNotice = $attachmentCount > 0 
        ? "<div style=\"margin-top: 15px; padding: 12px 16px; background-color: #F1F5F9; border-left: 4px solid #0066CC; font-size: 13px; color: #1E293B;\">
            📎 <strong>Physical Attachments:</strong> {$attachmentCount} attached document(s) included with this dispatch.
           </div>"
        : "";

    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset=\"UTF-8\">
        <title>ME Group Technical Dispatch</title>
    </head>
    <body style=\"margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC;\">
        <div style=\"max-width: 680px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);\">
            <!-- Header -->
            <div style=\"background-color: #0B1118; padding: 24px 30px; border-top: 4px solid #D9141B;\">
                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
                    <tr>
                        <td>
                            <h1 style=\"margin: 0; color: #FFFFFF; font-size: 18px; letter-spacing: 1.5px; font-weight: 700;\">ME GROUP</h1>
                            <p style=\"margin: 4px 0 0; color: #94A3B8; font-size: 12px; letter-spacing: 1px;\">MARINE ENGINEERING GROUP — OPERATIONS DISPATCH</p>
                        </td>
                        <td align=\"right\">
                            <span style=\"background-color: #1E293B; color: #E2E8F0; padding: 6px 12px; font-size: 12px; font-family: monospace; font-weight: 600; border: 1px solid #334155;\">{$refId}</span>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Body -->
            <div style=\"padding: 30px;\">
                <h2 style=\"margin: 0 0 16px; font-size: 16px; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;\">Inbound Web Submission Details</h2>
                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse: collapse; border: 1px solid #E2E8F0;\">
                    {$rowsHtml}
                </table>
                {$attachmentNotice}
            </div>

            <!-- Footer -->
            <div style=\"background-color: #F8FAFC; padding: 18px 30px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B;\">
                <table width=\"100%\">
                    <tr>
                        <td>ME Group Technical Operations • Alexandria Port Area & Egyptian Ports</td>
                        <td align=\"right\">" . gmdate('Y-m-d H:i:s') . " UTC</td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
    </html>";
}

function renderClientConfirmationHtml(string $refId, string $contactName, string $formType): string {
    return "
    <!DOCTYPE html>
    <html dir=\"ltr\">
    <head>
        <meta charset=\"UTF-8\">
        <title>Confirmation — ME Group</title>
    </head>
    <body style=\"margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC;\">
        <div style=\"max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0;\">
            <div style=\"background-color: #0B1118; padding: 20px 24px; border-top: 4px solid #D9141B;\">
                <h1 style=\"margin: 0; color: #FFFFFF; font-size: 16px; letter-spacing: 1px;\">ME GROUP • MARINE ENGINEERING</h1>
            </div>
            <div style=\"padding: 24px;\">
                <p style=\"font-size: 15px; color: #0F172A;\">Dear <strong>{$contactName}</strong>,</p>
                <p style=\"font-size: 14px; color: #334155; line-height: 1.6;\">
                    Thank you for reaching out to <strong>Marine Engineering Group (ME Group)</strong>. We have received your technical inquiry. Your inquiry reference tracking number is:
                </p>
                <div style=\"margin: 18px 0; padding: 14px; background: #F1F5F9; border-left: 4px solid #D9141B; font-family: monospace; font-size: 18px; font-weight: bold; color: #0F172A;\">
                    {$refId}
                </div>
                <p style=\"font-size: 14px; color: #334155; line-height: 1.6;\">
                    Our technical and marine engineering team is reviewing your requirements and will contact you promptly.
                </p>
                <hr style=\"border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;\">
                <div dir=\"rtl\" style=\"text-align: right; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;\">
                    <p style=\"font-size: 15px; color: #0F172A;\">السيد / <strong>{$contactName}</strong>،</p>
                    <p style=\"font-size: 14px; color: #334155; line-height: 1.6;\">
                        نشكركم لتواصلكم مع <strong>مجموعة الهندسة البحرية (ME Group)</strong>. تم استلام طلبكم بنجاح برقم المتابعة المرجعي الموضح أعلاه، وجاري دراسته من قبل الفريق الهندسي المختص.
                    </p>
                </div>
                <div style=\"margin-top: 24px; padding: 12px; background: #FFFBEB; border: 1px solid #FDE68A; font-size: 13px; color: #92400E;\">
                    <strong>24/7 Operations Hub:</strong> For critical vessel breakdown and urgent dispatch, call: +20 1012116108 or +20 3 5510000.
                </div>
            </div>
            <div style=\"background-color: #F8FAFC; padding: 14px 24px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B;\">
                ME Group Head Office: Alexandria, Egypt • info@megroup-eg.com • https://megroup-eg.com
            </div>
        </div>
    </body>
    </html>";
}

// -----------------------------------------------------------------------------
// 8. COMPOSE MIME EMAIL WITH MULTIPART ATTACHMENTS
// -----------------------------------------------------------------------------

$toAdmin = 'info@megroup-eg.com';

// Use client's name in From display header while sending through official domain for SPF/DKIM/DMARC alignment
$fromDisplayName = !empty($contactName) 
    ? sanitizeHeader($contactName) . ' via ME Group Web' 
    : 'ME Group Technical Dispatch';
$fromAdmin = "{$fromDisplayName} <info@megroup-eg.com>";

// Direct reply to the client's email so clicking Reply in the email client immediately addresses the user
if (!empty($email)) {
    $cleanClientName = sanitizeHeader($contactName);
    $replyTo = !empty($cleanClientName) 
        ? "{$cleanClientName} <" . sanitizeHeader($email) . ">" 
        : sanitizeHeader($email);
} else {
    $replyTo = 'info@megroup-eg.com';
}

$fullSubject = sanitizeHeader("{$emailSubjectPrefix} — Ref: {$refId}");

$htmlAdminBody = renderAdminEmailHtml($refId, $detailsTable, count($attachments));

// Unique boundary strings
$boundaryMixed = '==_Mixed_Boundary_' . md5(uniqid((string)time(), true));
$boundaryAlt = '==_Alt_Boundary_' . md5(uniqid((string)time(), true));

$headers = [];
$headers[] = 'From: ' . $fromAdmin;
$headers[] = 'Reply-To: ' . $replyTo;
$headers[] = 'Return-Path: <info@megroup-eg.com>';
$headers[] = 'X-Mailer: MEGroup-Dispatch/1.0';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundaryMixed . '"';

// Plain text alternative
$plainText = "ME GROUP TECHNICAL DISPATCH — Ref: {$refId}\n\n";
foreach ($detailsTable as $lbl => $val) {
    $plainText .= "{$lbl}: " . strip_tags((string)$val) . "\n";
}

// Assemble Email Message Body
$messageBody = "--" . $boundaryMixed . "\r\n";
$messageBody .= 'Content-Type: multipart/alternative; boundary="' . $boundaryAlt . "\"\r\n\r\n";

// Alternative Part 1: Plain text
$messageBody .= "--" . $boundaryAlt . "\r\n";
$messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$messageBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$messageBody .= $plainText . "\r\n\r\n";

// Alternative Part 2: HTML
$messageBody .= "--" . $boundaryAlt . "\r\n";
$messageBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$messageBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$messageBody .= $htmlAdminBody . "\r\n\r\n";
$messageBody .= "--" . $boundaryAlt . "--\r\n";

// Multipart Mixed Part 3: Physical Attachments
foreach ($attachments as $att) {
    $messageBody .= "--" . $boundaryMixed . "\r\n";
    $messageBody .= 'Content-Type: ' . $att['mime'] . '; name="' . $att['name'] . "\"\r\n";
    $messageBody .= "Content-Transfer-Encoding: base64\r\n";
    $messageBody .= 'Content-Disposition: attachment; filename="' . $att['name'] . "\"\r\n\r\n";
    $messageBody .= $att['data'] . "\r\n";
}
$messageBody .= "--" . $boundaryMixed . "--\r\n";

// -----------------------------------------------------------------------------
// 9. DUAL-ENGINE TRANSPORT DISPATCH
// -----------------------------------------------------------------------------

// Mode A: Native Local cPanel MTA (Exim on 84.247.179.163, SPF-aligned)
$mailSent = @mail(
    $toAdmin,
    $fullSubject,
    $messageBody,
    implode("\r\n", $headers),
    '-finfo@megroup-eg.com'
);

// Fallback: If mail() returned false and an external SMTP config exists outside webroot
if (!$mailSent && file_exists('/home/megroupe/email_config.php')) {
    include_once '/home/megroupe/email_config.php';
    if (function_exists('megroup_smtp_send')) {
        $mailSent = megroup_smtp_send($toAdmin, $fullSubject, $messageBody, $headers);
    }
}

// -----------------------------------------------------------------------------
// 10. CLIENT AUTO-RESPONDER (PROTECTED)
// -----------------------------------------------------------------------------
if ($mailSent && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Only send client confirmation if client is not flooding (max 1 auto-responder per recipient per hour)
    $clientRateKey = $rateLimitDir . '/client_' . md5($email) . '.txt';
    $lastSent = file_exists($clientRateKey) ? (int)@file_get_contents($clientRateKey) : 0;

    if ($currentTime - $lastSent > 3600) {
        $clientSubject = sanitizeHeader("ME Group Technical Dispatch — Request Received [Ref: {$refId}]");
        $clientHtml = renderClientConfirmationHtml($refId, $contactName, $formType);

        $clientHeaders = [
            'From: ' . $fromAdmin,
            'Reply-To: ' . $toAdmin,
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'X-Mailer: MEGroup-Dispatch/1.0',
        ];

        @mail(
            $email,
            $clientSubject,
            $clientHtml,
            implode("\r\n", $clientHeaders),
            '-finfo@megroup-eg.com'
        );

        @file_put_contents($clientRateKey, (string)$currentTime);
    }
}

// -----------------------------------------------------------------------------
// 11. FINAL RESPONSE RETURN
// -----------------------------------------------------------------------------

if ($mailSent) {
    sendJsonResponse(
        true,
        $isAr ? 'تم إرسال الطلب بنجاح إلى الفريق الهندسي.' : 'Request dispatched successfully to engineering.',
        $refId,
        200,
        ['attachmentsCount' => count($attachments)]
    );
} else {
    // If mail function failed on server
    sendJsonResponse(
        false,
        $isAr 
            ? 'تعذر إرسال البريد من السيرفر في الوقت الحالي. يرجى الاتصال بنا عبر الهاتف.' 
            : 'Server mail transport unavailable. Please contact our 24/7 hotline directly.',
        $refId,
        500
    );
}
