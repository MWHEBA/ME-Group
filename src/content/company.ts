import type { Gated } from "./types";

export interface CompanyPillar {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface ApproachStage {
  step: string;
  stageName: string;
  technicalAction: string;
  deliverable: string;
}

export interface QualitySafetyPrinciple {
  code: string;
  title: string;
  description: string;
  focusAreas: string[];
}

export interface CompanyContent extends Gated {
  overview: {
    kicker: string;
    heroHeading: string;
    heroSubheading: string;
    leadStatement: string;
    stance: string;
    pillars: CompanyPillar[];
    seoTitle: string;
    seoDescription: string;
  };
  about: {
    kicker: string;
    heroHeading: string;
    heroSubheading: string;
    leadStatement: string;
    coreDisciplinesSummary: string;
    transparencyPhilosophy: string;
    transparencyPoints: { title: string; detail: string }[];
    seoTitle: string;
    seoDescription: string;
  };
  approach: {
    kicker: string;
    heroHeading: string;
    heroSubheading: string;
    leadStatement: string;
    reconciliationNote: string;
    lifecycleStages: ApproachStage[];
    operationalPrinciples: { title: string; text: string }[];
    seoTitle: string;
    seoDescription: string;
  };
  qualitySafety: {
    kicker: string;
    heroHeading: string;
    heroSubheading: string;
    leadStatement: string;
    conservativeStance: string;
    principles: QualitySafetyPrinciple[];
    seoTitle: string;
    seoDescription: string;
  };
}

export const COMPANY_CONTENT: CompanyContent = {
  status: "confirmed",
  overview: {
    kicker: "ORGANIZATION / OVERVIEW",
    heroHeading: "AN INTEGRATED MARINE ENGINEERING PARTNER.",
    heroSubheading:
      "Delivering multi-disciplinary technical support, structured maintenance, and vessel supplies to safeguard maritime operational continuity.",
    leadStatement:
      "ME Group is an engineering-first marine services company. We support ship owners, technical superintendents, and fleet managers by resolving complex machinery, power distribution, automation, and pneumatic challenges through hands-on technical diagnostic rigor.",
    stance:
      "We operate strictly as engineering specialists—not a broker, freight agency, or general ship chandler. Technical credibility, transparent diagnostic reporting, and verified operational restoration guide every intervention.",
    pillars: [
      {
        number: "01",
        title: "Integrated Engineering Thinking",
        summary:
          "Cross-discipline diagnostics bridging mechanical prime movers, electrical switchboards, PLCs, and pneumatic actuators.",
        detail:
          "Vessel equipment rarely fails in isolation. Our specialists evaluate the complete operational chain—from governor linkage to voltage regulators and sensor loops—eliminating repeat breakdowns.",
      },
      {
        number: "02",
        title: "Structured Technical Lifecycle",
        summary:
          "Methodical engineering protocols from initial on-board inspection through calibrated assembly and full-load verification.",
        detail:
          "We follow a disciplined 5-stage lifecycle (Inspect, Diagnose, Repair, Test, and Support) to ensure machinery is returned to service within verified operational tolerances.",
      },
      {
        number: "03",
        title: "Transparent Technical Reporting",
        summary:
          "Clear, documented diagnostic logs, measurement records, and post-overhaul recommendations.",
        detail:
          "Chief Engineers and superintendents receive comprehensive technical handover documentation detailing root causes, clearances measured, and parts renewed.",
      },
      {
        number: "04",
        title: "Responsive Support Architecture",
        summary:
          "24/7 technical triage and expedited spare part coordination tailored for short port turnarounds.",
        detail:
          "Our engineering intake protocol quickly assesses vessel symptoms and mobilizes technical tooling and parts directly to the berth.",
      },
    ],
    seoTitle: "About ME Group | Marine Engineering & Technical Services",
    seoDescription:
      "Learn about ME Group: an integrated marine engineering company providing mechanical, electrical, automation, pneumatic, maintenance, and vessel support services.",
  },

  about: {
    kicker: "COMPANY / ABOUT",
    heroHeading: "BUILT ON PRACTICAL MARINE ENGINEERING EXCELLENCE.",
    heroSubheading:
      "Supporting commercial vessels across mechanical, electrical, automation, and pneumatic disciplines.",
    leadStatement:
      "ME Group was formed around a singular operational mandate: keeping vessels moving through dependable, multidisciplinary engineering expertise. We combine hands-on technical proficiency with deep diagnostic insight across shipboard power, propulsion, control, and fluid systems.",
    coreDisciplinesSummary:
      "Our core operational capabilities span seven distinct yet interconnected service areas: Mechanical Engineering, Electrical Power & Distribution, Automation & Control Systems, Pneumatics, Repair & Maintenance, Spare Parts Sourcing, and Vessel Support Services.",
    transparencyPhilosophy:
      "We believe that lasting maritime partnerships are built on technical transparency. We do not recommend unnecessary component renewals, and we never mask underlying faults with temporary fixes.",
    transparencyPoints: [
      {
        title: "Inspection Before Intervention",
        detail:
          "We measure clearances, test electrical insulation, and interrogate controller diagnostic logs before dismantling machinery.",
      },
      {
        title: "Documented Measurement Logs",
        detail:
          "Every bearing clearance, insulation resistance value, and calibration reading is recorded and handed over in formal service reports.",
      },
      {
        title: "Clear Technical Communication",
        detail:
          "Direct, jargon-free dialogue between our engineers and your on-board technical staff or superintendent.",
      },
      {
        title: "Genuine & Verified Components",
        detail:
          "Every replacement seal, valve, contactor, or mechanical component is verified against maker drawings and serial specifications.",
      },
    ],
    seoTitle: "About ME Group | Marine Engineering Group",
    seoDescription:
      "Discover ME Group's background, core engineering disciplines, technical transparency, and operational support philosophy for commercial shipping.",
  },

  approach: {
    kicker: "COMPANY / APPROACH",
    heroHeading: "A METHODICAL ENGINEERING LIFECYCLE.",
    heroSubheading:
      "How ME Group approaches complex vessel faults: from root-cause diagnosis to calibrated restoration and verified handover.",
    leadStatement:
      "At sea and in port, rushed repairs without proper diagnostic understanding lead directly to repeat failures. ME Group employs a structured engineering protocol that identifies root failure mechanisms before executing calibrated repairs and load testing.",
    reconciliationNote:
      "Our operational framework reconciles client maintenance needs through an established 5-stage lifecycle: Inspect & Identify → Diagnose → Repair & Intervene → Test & Verify → Commission & Support.",
    lifecycleStages: [
      {
        step: "01",
        stageName: "INSPECT & IDENTIFY",
        technicalAction:
          "Reviewing vessel logbooks, interviewing on-board engineers, and performing non-destructive visual, thermal, and acoustic assessments.",
        deliverable: "Baseline parameter log & preliminary fault profile",
      },
      {
        step: "02",
        stageName: "DIAGNOSE",
        technicalAction:
          "Isolating root failure modes across mechanical wear, electrical insulation breakdown, pneumatic pressure drop, or sensor loop faults.",
        deliverable: "Targeted technical scope & intervention plan",
      },
      {
        step: "03",
        stageName: "REPAIR & INTERVENE",
        technicalAction:
          "Executing precision mechanical teardown, component renewal, calibrated torque fastening, and alignment to maker tolerances.",
        deliverable: "Renewed components & verified clearances",
      },
      {
        step: "04",
        stageName: "TEST & VERIFY",
        deliverable: "Load trial record & Megger / trip verification report",
        technicalAction:
          "Conducting stepped load testing, insulation resistance re-verification, safety trip simulation, and thermal stability checks.",
      },
      {
        step: "05",
        stageName: "COMMISSION & SUPPORT",
        deliverable: "Comprehensive engineering service report & ongoing guidance",
        technicalAction:
          "Formal operational handover to the Chief Engineer, technical documentation compilation, and ongoing technical guidance.",
      },
    ],
    operationalPrinciples: [
      {
        title: "Root-Cause Elimination",
        text: "We resolve the underlying operational stress—such as misaligned couplings or voltage instability—rather than just replacing failed wear parts.",
      },
      {
        title: "Multi-Disciplinary Synthesis",
        text: "When an auxiliary generator trips, our engineers assess the prime-mover governor, the electrical AVR, the ACB trip coils, and the PMS auto-sync loop together.",
      },
      {
        title: "Port-Window Discipline",
        text: "We structure work shifts and tooling mobilization to fit tightly within vessel cargo operations and departure schedules.",
      },
    ],
    seoTitle: "Engineering Approach & Methodology | ME Group",
    seoDescription:
      "Explore ME Group's 5-stage marine engineering methodology: Inspect, Diagnose, Repair, Test, and Support for commercial marine systems.",
  },

  qualitySafety: {
    kicker: "COMPANY / QUALITY & SAFETY",
    heroHeading: "DISCIPLINED ENGINEERING & OPERATIONAL SAFETY.",
    heroSubheading:
      "Maintaining high standards in equipment verification, safe work execution, and marine reliability.",
    leadStatement:
      "Marine engineering takes place in high-risk, time-critical environments. ME Group emphasizes thorough technical inspection, safety-conscious work execution, and methodical verification to support vessel reliability.",
    conservativeStance:
      "We operate with professional technical discipline. We do not publish unverified compliance badges; instead, we focus on transparent inspection reporting, structured diagnostic practices, and safety-conscious execution onboard.",
    principles: [
      {
        code: "QS-01",
        title: "Safety-Conscious Technical Work",
        description:
          "Safety-conscious preparation and systematic verification prior to machinery intervention.",
        focusAreas: [
          "Electrical circuit de-energization and safety verification",
          "Pressure relief and line isolation on fluid and air systems",
          "Safe access procedures and risk-aware execution",
          "Coordination with vessel technical staff before work begins",
        ],
      },
      {
        code: "QS-02",
        title: "Technical Inspection & Diagnostics",
        description:
          "Systematic evaluation and condition checks across marine systems.",
        focusAreas: [
          "Machinery condition checks and visual inspection",
          "Thermal condition checks under operational load",
          "Insulation resistance testing across electrical circuits",
          "Sensor loop checks and monitoring system diagnostics",
        ],
      },
      {
        code: "QS-03",
        title: "Testing & Verification",
        description:
          "Functional checks and parameter validation prior to service handover.",
        focusAreas: [
          "Operational running checks and parameter observation",
          "Alarm and safety function verification",
          "Generator synchronization and load verification",
          "Post-assembly inspection and leak checks",
        ],
      },
      {
        code: "QS-04",
        title: "Professional Maintenance Practices",
        description:
          "Clean work execution and responsible practices during all maintenance activities.",
        focusAreas: [
          "Careful fluid handling during fuel, oil, and cooling line maintenance",
          "Orderly collection of consumables and maintenance materials",
          "Protection of pneumatic and electrical components from contamination",
          "Work area housekeeping and machinery care",
        ],
      },
    ],
    seoTitle: "Quality & Operational Safety Mindset | ME Group",
    seoDescription:
      "ME Group's approach to marine engineering quality and safety: safety-conscious technical work, inspection, diagnostics, and disciplined maintenance practices.",
  },
};
