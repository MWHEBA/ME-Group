/**
 * Typed homepage content sourced strictly from confirmed project brief.
 * No unconfirmed statistics, claims, response times, or fabricated certifications.
 */

export interface SystemCategory {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  imageSrc: string;
  href: string;
}

export const CORE_SYSTEMS: SystemCategory[] = [
  {
    id: "mechanical",
    code: "MECH / 01",
    title: "Mechanical Systems",
    tagline: "Propulsion & Auxiliary Machinery",
    description:
      "Comprehensive overhaul and maintenance for main and auxiliary engines, heavy ballast and cooling pumps, turbocharger servicing, and mechanical troubleshooting.",
    items: [
      "Main & Auxiliary Engines",
      "Pumps & Cooling Systems",
      "Turbochargers & Balancing",
      "Fuel & Lube Oil Systems",
    ],
    imageSrc: "/images/dev/engine-room.svg",
    href: "/services/mechanical",
  },
  {
    id: "electrical",
    code: "ELEC / 02",
    title: "Electrical Power & Distribution",
    tagline: "Generation, Switchboards & AVR",
    description:
      "Diagnosis, synchronization, and repair of marine generators, AVR tuning, main switchboards, circuit breaker servicing, and motor overhauls.",
    items: [
      "Marine Generators & AVR",
      "Main Switchboards (MSB)",
      "Circuit Breakers & Protection",
      "Electric Motors & Distribution",
    ],
    imageSrc: "/images/dev/switchboard.svg",
    href: "/services/electrical",
  },
  {
    id: "automation",
    code: "AUTO / 03",
    title: "Automation & Control",
    tagline: "Monitoring, PLC & Safety Interlocks",
    description:
      "Troubleshooting and configuration of marine PLC architectures, Alarm Monitoring Systems (AMS), Power Management Systems (PMS), and essential safety shutdown logic.",
    items: [
      "PLC Systems & Control Panels",
      "Alarm & Monitoring (AMS)",
      "Power Management (PMS)",
      "Fire & Gas Safety Systems",
    ],
    imageSrc: "/images/dev/plc-automation.svg",
    href: "/services/automation",
  },
  {
    id: "pneumatic",
    code: "PNEU / 04",
    title: "Pneumatic Systems",
    tagline: "Starting Air, Valves & Dryers",
    description:
      "Inspection, overhaul, and testing of starting air compressors, maneuvering air valves, cylinders, seal kits, and pneumatic control lines.",
    items: [
      "Starting Air Compressors",
      "Air Dryers & Receivers",
      "Solenoid & Maneuvering Valves",
      "Cylinders & Seal Kits",
    ],
    imageSrc: "/images/dev/compressor.svg",
    href: "/services/pneumatic",
  },
  {
    id: "radio",
    code: "COMM / 08",
    title: "Radio & Bridge Systems",
    tagline: "GMDSS, Satellite & Bridge Electronics",
    description:
      "Comprehensive servicing for marine GMDSS consoles, MF/HF and VHF DSC radios, Inmarsat satellite terminals, reserve battery stations, and emergency beacon certifications.",
    items: [
      "GMDSS Consoles & Battery Stations",
      "VHF & MF/HF DSC Radios",
      "Inmarsat & Satellite Terminals",
      "Emergency Beacons (EPIRB / SART)",
    ],
    imageSrc: "/images/dev/bridge-radio.svg",
    href: "/services/radio-equipment",
  },
];

export interface TriageProblem {
  id: string;
  code: string;
  title: string;
  summary: string;
  actionText: string;
  href: string;
}

export const TRIAGE_PROBLEMS: TriageProblem[] = [
  {
    id: "mechanical-issue",
    code: "MECH / ISSUE",
    title: "Mechanical Problem",
    summary:
      "Engine vibration, pump failure, cooling loss, or auxiliary equipment breakdown.",
    actionText: "Request Mechanical Squad",
    href: "/contact/technical-support?category=mechanical",
  },
  {
    id: "electrical-fault",
    code: "ELEC / FAULT",
    title: "Electrical Fault",
    summary:
      "Generator blackout, breaker tripping, voltage instability, or switchboard failure.",
    actionText: "Request Electrical Squad",
    href: "/contact/technical-support?category=electrical",
  },
  {
    id: "automation-issue",
    code: "AUTO / ISSUE",
    title: "Automation & Control Issue",
    summary:
      "PLC fault, sensor alarm malfunction, maneuvering failure, or monitoring offline.",
    actionText: "Request Automation Squad",
    href: "/contact/technical-support?category=automation",
  },
  {
    id: "pneumatic-fault",
    code: "PNEU / FAULT",
    title: "Pneumatic System Issue",
    summary:
      "Compressor pressure loss, valve leakage, or starting air supply failure.",
    actionText: "Request Pneumatic Support",
    href: "/contact/technical-support?category=pneumatic",
  },
  {
    id: "radio-bridge-fault",
    code: "COMM / FAULT",
    title: "Radio & Bridge Systems Fault",
    summary:
      "GMDSS station malfunction, VHF/MF transmission failure, satellite terminal offline, or Class radio survey deficiency.",
    actionText: "Request Radio Squad",
    href: "/contact/technical-support?category=radio",
  },
  {
    id: "technical-inspection",
    code: "INSP / DIAG",
    title: "Technical Inspection & Diagnostics",
    summary:
      "Preventive assessment, laser shaft alignment, diagnostic inspection, or survey preparation.",
    actionText: "Schedule Inspection",
    href: "/contact/technical-support?category=inspection",
  },
  {
    id: "spare-parts-need",
    code: "SUPPLY / PARTS",
    title: "Marine Spare Parts Required",
    summary:
      "Urgent or scheduled replacement component, seal kit, valve, or hardware enquiry.",
    actionText: "Request Spare Parts",
    href: "/contact/spare-parts",
  },
  {
    id: "rapid-intervention",
    code: "RAPID / 24-7",
    title: "Urgent Vessel Breakdown",
    summary:
      "Active blackout, propulsion shutdown, or voyage-critical emergency requiring prioritized dispatch.",
    actionText: "Engage Rapid Support",
    href: "/contact/rapid-support",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "INSPECT",
    description:
      "Initial operational triage, telemetry logs, and fault review to define the technical scope.",
  },
  {
    step: "02",
    title: "DIAGNOSE",
    description:
      "Targeted on-site testing, root-cause identification, and preparation of required tools and spares.",
  },
  {
    step: "03",
    title: "REPAIR",
    description:
      "Precision mechanical, electrical, or automation overhaul conducted by experienced marine engineers.",
  },
  {
    step: "04",
    title: "TEST",
    description:
      "Rigorous bench calibration, pressure holding, insulation resistance, and functional verification.",
  },
  {
    step: "05",
    title: "COMMISSION",
    description:
      "Full dynamic testing under operating loads, synchronization verification, and technical sign-off.",
  },
  {
    step: "06",
    title: "SUPPORT",
    description:
      "Comprehensive engineering reporting, maintenance guidance, and ongoing vessel technical support.",
  },
];

export const CONFIRMED_EQUIPMENT = [
  { category: "PROPULSION & AUX", items: ["Main Engines", "Auxiliary Engines", "Turbochargers"] },
  { category: "POWER & ELECTRICAL", items: ["Generators", "Electric Motors", "Switchboards", "AVR Units"] },
  { category: "AUTOMATION & LOGIC", items: ["PLC Systems", "Control Panels", "Alarm & Monitoring (AMS)"] },
  { category: "FLUID & PNEUMATICS", items: ["Pumps", "Compressors", "Pneumatic Systems", "Control Valves"] },
  { category: "COMMUNICATION & BRIDGE", items: ["GMDSS Consoles", "MF/HF & VHF DSC", "Satellite Terminals", "Emergency Beacons"] },
];

export const WHY_ME_GROUP = [
  {
    code: "PILLAR / 01",
    title: "ENGINEERING EXPERTISE",
    description:
      "Deep technical capability across heavy marine machinery, medium/low voltage power distribution, and complex automation architectures.",
  },
  {
    code: "PILLAR / 02",
    title: "RAPID RESPONSE",
    description:
      "On-demand mobilization for urgent vessel equipment failures to minimize downtime and keep operations on schedule.",
  },
  {
    code: "PILLAR / 03",
    title: "INTEGRATED SUPPORT",
    description:
      "A single engineering partner managing multi-disciplinary faults across mechanical, electrical, pneumatic, and control interfaces.",
  },
  {
    code: "PILLAR / 04",
    title: "OPERATIONAL RELIABILITY",
    description:
      "Committed to rigorous engineering practices, verified procedures, and long-term equipment performance onboard.",
  },
];
