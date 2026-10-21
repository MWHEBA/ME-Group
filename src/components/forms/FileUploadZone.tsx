"use client";

import React, { useRef, useState } from "react";
import { AttachmentMetadata } from "@/lib/forms/types";
import styles from "./FileUploadZone.module.css";

interface FileUploadZoneProps {
  label?: string;
  description?: string;
  attachments: AttachmentMetadata[];
  onAttachmentsChange: (attachments: AttachmentMetadata[]) => void;
  maxFileSizeMB?: number;
  acceptedExtensions?: string;
  locale?: "en" | "ar";
}

export function FileUploadZone({
  label,
  description,
  attachments,
  onAttachmentsChange,
  maxFileSizeMB = 10,
  acceptedExtensions = ".pdf,.jpg,.jpeg,.png,.webp",
  locale = "en",
}: FileUploadZoneProps) {
  const isAr = locale === "ar";
  const resolvedLabel = label ?? (isAr ? "المرفقات الفنية والمستندات" : "TECHNICAL ATTACHMENTS & DOCUMENTATION");
  const resolvedDesc = description ?? (
    isAr
      ? "أرفق صور لوحة البيانات أو لقطات الأعطال أو المستندات الفنية (PDF, JPG, PNG, WEBP حتى 10 ميجابايت)."
      : "Attach nameplate photos, fault screenshots, or technical documents (PDF, JPG, PNG, WEBP up to 10MB)."
  );

  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
  const maxTotalSizeBytes = 10 * 1024 * 1024; // 10MB total cap

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    const allowedExts = acceptedExtensions
      .split(",")
      .map((ext) => ext.trim().toLowerCase());

    const newAttachments: AttachmentMetadata[] = [];
    let currentTotal = attachments.reduce((sum, a) => sum + a.size, 0);

    for (const file of Array.from(files)) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedExts.includes(ext)) {
        setErrorMessage(
          isAr
            ? `نوع الملف "${file.name}" غير مدعوم. الصيغ المسموحة: ${acceptedExtensions}`
            : `File type for "${file.name}" is not supported. Allowed: ${acceptedExtensions}`
        );
        continue;
      }

      if (file.size > maxSizeBytes) {
        setErrorMessage(
          isAr
            ? `الملف "${file.name}" تجاوز الحد الأقصى المسموح به (${maxFileSizeMB} ميجابايت).`
            : `"${file.name}" exceeds the maximum allowed size (${maxFileSizeMB}MB).`
        );
        continue;
      }

      if (currentTotal + file.size > maxTotalSizeBytes) {
        setErrorMessage(
          isAr
            ? "إجمالي حجم المرفقات تجاوز الحد الأقصى المسموح به (10 ميجابايت)."
            : "Total attachment size exceeds maximum allowed limit (10MB)."
        );
        break;
      }

      currentTotal += file.size;
      newAttachments.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        lastModified: file.lastModified,
        file: file,
      });
    }

    if (newAttachments.length > 0) {
      onAttachmentsChange([...attachments, ...newAttachments]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter((a) => a.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return isAr ? `${bytes} بايت` : `${bytes} B`;
    if (bytes < 1024 * 1024) return isAr ? `${(bytes / 1024).toFixed(1)} ك.ب` : `${(bytes / 1024).toFixed(1)} KB`;
    return isAr ? `${(bytes / (1024 * 1024)).toFixed(1)} م.ب` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.headerRow}>
        <span className={styles.sectionLabel}>{resolvedLabel}</span>
        <span className={styles.optionalBadge}>{isAr ? "اختياري" : "OPTIONAL"}</span>
      </div>

      <p className={styles.uploadDesc}>{resolvedDesc}</p>

      {/* Drag & Drop Zone */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label={isAr ? "رفع مستند فني أو صورة" : "Upload technical document or photo"}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedExtensions}
          className={styles.hiddenInput}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className={styles.dropContent}>
          <span className={styles.uploadIcon} aria-hidden="true">⬆</span>
          <div className={styles.dropText}>
            <span className={styles.primaryAction}>
              {isAr ? "اختر ملفاً أو اسحبه هنا" : "CHOOSE FILE OR DRAG & DROP"}
            </span>
            <span className={styles.formatHint}>
              {isAr
                ? "الصيغ المدعومة: صور (JPG, PNG, WEBP)، مستندات (PDF, DOCX, TXT)"
                : "Supported: Photos (JPG, PNG, WEBP), Documents (PDF, DOCX, TXT)"}
            </span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon} aria-hidden="true">!</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Attached Files List */}
      {attachments.length > 0 && (
        <div className={styles.fileList}>
          <span className={styles.listHeading}>
            {isAr ? `الملفات المرفقة (${attachments.length}):` : `ATTACHED FILES (${attachments.length}):`}
          </span>
          <ul className={styles.filesGrid}>
            {attachments.map((att) => (
              <li key={att.id} className={styles.fileCard}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileIcon} aria-hidden="true">📄</span>
                  <div className={styles.fileNames}>
                    <span className={styles.fileName}>{att.name}</span>
                    <span className={styles.fileSize}>{formatFileSize(att.size)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAttachment(att.id);
                  }}
                  className={styles.removeBtn}
                  aria-label={isAr ? `حذف الملف ${att.name}` : `Remove file ${att.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
