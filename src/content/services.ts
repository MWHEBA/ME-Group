import type { Gated } from "./types";

export type ServiceCategoryId = "engineering-systems" | "repair-maintenance" | "vessel-support";

export interface ServiceScopeItem {
  title: string;
  description: string;
  items: string[];
}

export interface RelatedDisciplineLink {
  slug: string;
  title: string;
  systemCode: string;
  reason: string;
}

export interface EquipmentItem {
  name: string;
  category: string;
  notes?: string;
}

export interface ProblemScenario {
  symptom: string;
  systemInvolved: string;
  action: string;
}

export interface ServiceDetail extends Gated {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  categoryId: ServiceCategoryId;
  categoryTitle: string;
  kicker: string;
  heroHeading: string;
  heroSubheading: string;
  leadParagraph: string;
  disciplinePhilosophy: string;
  scopeCategories: ServiceScopeItem[];
  equipmentHandled: EquipmentItem[];
  processSteps: { step: string; title: string; detail: string }[];
  relatedDisciplines: RelatedDisciplineLink[];
  problemScenarios: ProblemScenario[];
  ctaText: string;
  ctaParam: string; // e.g., 'mechanical', 'electrical', 'automation', 'pneumatic'
  ctaTarget: string; // e.g. '/contact/technical-support' or '/contact/spare-parts'
  imagePath: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ServiceGroup extends Gated {
  slug: string;
  categoryId: ServiceCategoryId;
  title: string;
  code: string;
  summary: string;
  services: {
    slug: string;
    title: string;
    shortTitle: string;
    summary: string;
    number: string;
    href: string;
    status: "confirmed" | "needs-confirmation" | "client-to-confirm";
  }[];
}

/**
 * Service Taxonomy Groups (A, B, C)
 * Sourced strictly from confirmed documentation (docs/PROJECT_BRIEF.md §5).
 */
export const serviceTaxonomyGroups: ServiceGroup[] = [
  {
    slug: "engineering-systems",
    categoryId: "engineering-systems",
    title: "Engineering Systems",
    code: "GROUP A",
    summary:
      "Core shipboard physical, electrical, and control disciplines supporting continuous marine machinery operation.",
    status: "confirmed",
    services: [
      {
        slug: "mechanical",
        title: "Mechanical Engineering & Machinery",
        shortTitle: "Mechanical",
        summary:
          "Main engines, auxiliary engines, marine pumps, fuel and cooling circuits, mechanical compressors, and vibration assessment.",
        number: "01",
        href: "/services/mechanical",
        status: "confirmed",
      },
      {
        slug: "electrical",
        title: "Electrical Power & Distribution",
        shortTitle: "Electrical",
        summary:
          "Marine generators, AVR units, main switchboards, breakers, earth fault diagnostics, Megger testing, and AC/DC electric motors.",
        number: "02",
        href: "/services/electrical",
        status: "confirmed",
      },
      {
        slug: "automation",
        title: "Automation & Control Systems",
        shortTitle: "Automation",
        summary:
          "Marine PLCs, Alarm Monitoring Systems (AMS), Power Management Systems (PMS), sensor loops, and fire & gas alarm systems.",
        number: "03",
        href: "/services/automation",
        status: "confirmed",
      },
      {
        slug: "pneumatic",
        title: "Pneumatic Systems & Control",
        shortTitle: "Pneumatic",
        summary:
          "Air compressors, pneumatic cylinders, seal kits, solenoid valves, control valves, air dryers, and leak detection.",
        number: "04",
        href: "/services/pneumatic",
        status: "confirmed",
      },
    ],
  },
  {
    slug: "repair-maintenance",
    categoryId: "repair-maintenance",
    title: "Repair & Maintenance",
    code: "GROUP B",
    summary:
      "Structured technical intervention covering technical inspection, preventive maintenance, corrective repairs, and 24/7 rapid response.",
    status: "confirmed",
    services: [
      {
        slug: "repair-maintenance",
        title: "Repair & Maintenance Services",
        shortTitle: "Repair & Maintenance",
        summary:
          "Systematic diagnostics, preventive maintenance schedules, emergency corrective repairs, testing, and commissioning.",
        number: "05",
        href: "/services/repair-maintenance",
        status: "confirmed",
      },
    ],
  },
  {
    slug: "vessel-support",
    categoryId: "vessel-support",
    title: "Vessel Support & Supplies",
    code: "GROUP C",
    summary:
      "Integrated technical logistics supporting vessel operations with marine spare parts, consumables, tools, and certified provisioning.",
    status: "confirmed",
    services: [
      {
        slug: "spare-parts",
        title: "Marine Spare Parts",
        shortTitle: "Spare Parts",
        summary:
          "Rapid spare part sourcing and verification by part number or machinery nameplate across mechanical, electrical, and pneumatic gear.",
        number: "06",
        href: "/services/spare-parts",
        status: "confirmed",
      },
      {
        slug: "vessel-support",
        title: "Vessel Technical Supplies & Provisioning",
        shortTitle: "Vessel Support",
        summary:
          "Technical supplies, engine-room consumables, fresh/frozen food provisions, potable drinking water, and medical supplies.",
        number: "07",
        href: "/services/vessel-support",
        status: "confirmed",
      },
    ],
  },
];

/**
 * Detailed Confirmed Service Records
 */
export const SERVICES_DETAIL: Record<string, ServiceDetail> = {
  mechanical: {
    slug: "mechanical",
    number: "01",
    title: "Mechanical Engineering & Machinery Services",
    shortTitle: "Mechanical Engineering",
    categoryId: "engineering-systems",
    categoryTitle: "Engineering Systems",
    kicker: "DISCIPLINE / 01",
    heroHeading: "MAIN ENGINES, AUXILIARY MACHINERY & FLUID SYSTEMS",
    heroSubheading:
      "Rigorous mechanical engineering, machinery overhaul, pump overhauls, and fluid circuit troubleshooting for commercial vessels.",
    leadParagraph:
      "ME Group provides hands-on marine mechanical support across propulsion prime movers, auxiliary diesel generators, marine pumping assemblies, and critical fluid circuits. Our engineers approach machinery with structured diagnostic rigor to restore operating parameters and safeguard vessel uptime.",
    disciplinePhilosophy:
      "Marine mechanical reliability depends on precision assembly, clear alignment with operational clearances, and methodical fluid line integrity. We focus on diagnosing underlying wear patterns and thermal stresses rather than treating surface symptoms.",
    scopeCategories: [
      {
        title: "Main & Auxiliary Engine Mechanical Scope",
        description:
          "Hands-on mechanical inspection, component renewal, and operational troubleshooting on main and auxiliary machinery.",
        items: [
          "Main propulsion engine mechanical inspection and routine component servicing",
          "Auxiliary diesel engines and generator prime-mover mechanical overhaul",
          "Cylinder head assembly, valves, rocker arms, and pushrod inspection",
          "Piston crown, piston rings, and liner condition assessment",
          "Connecting rod and main bearing clearance measurements",
          "Engine timing gear and camshaft drive mechanical inspections",
        ],
      },
      {
        title: "Marine Pumps & Pumping Systems",
        description:
          "Mechanical overhaul, seal renewal, and performance restoration across engine-room and deck pumping units.",
        items: [
          "Seawater and freshwater cooling pumps (centrifugal & positive displacement)",
          "Fuel oil transfer, booster, and circulating pumps",
          "Lubricating oil circulating and priming pumps",
          "Ballast, bilge, and fire emergency pumping assemblies",
          "Mechanical seal replacements and gland packing adjustments",
          "Impeller wear ring clearance verification and shaft condition checks",
        ],
      },
      {
        title: "Fuel & Cooling Line Systems",
        description:
          "Fluid line integrity, pressure containment, and temperature control troubleshooting.",
        items: [
          "Heavy fuel oil (HFO) and marine gas oil (MGO) supply line inspection",
          "Fuel filtration units, duplex filter manifolds, and differential pressure checks",
          "Engine jacket water and central cooling circuit pipework troubleshooting",
          "Cooling line thermostatic valve mechanical inspection and seat checks",
          "High-pressure fuel piping mechanical securing and leak containment",
        ],
      },
      {
        title: "Compressors & Mechanical Drives",
        description:
          "Mechanical assemblies, drive couplings, and reciprocating mechanisms.",
        items: [
          "Air compressor mechanical head, piston ring, and valve plate overhauls",
          "Flexible drive couplings and drive belt tension alignment",
          "Mechanical vibration assessment on rotating pump and fan assemblies",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Main Propulsion Engines", category: "Machinery" },
      { name: "Auxiliary Diesel Engines", category: "Power Generation" },
      { name: "Centrifugal & Gear Pumps", category: "Fluid Handling" },
      { name: "Fuel Transfer & Booster Pumps", category: "Fuel Systems" },
      { name: "Cooling Water Circulating Pumps", category: "Cooling Systems" },
      { name: "Reciprocating Air Compressors", category: "Compressed Air" },
      { name: "Duplex Fuel & Lube Oil Filters", category: "Filtration" },
      { name: "Thermostatic Mixing Valves", category: "Temperature Control" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Condition & Parameter Assessment",
        detail:
          "Reviewing logbook operating temperatures, pressures, and vibration characteristics before mechanical intervention.",
      },
      {
        step: "02",
        title: "Disassembly & Precision Measurement",
        detail:
          "Systematic mechanical teardown, measuring running clearances, wear profiles, and dimensional tolerances against maker specifications.",
      },
      {
        step: "03",
        title: "Component Renewal & Calibrated Assembly",
        detail:
          "Installing genuine or verified replacement parts, torquing fasteners to specified values, and renewing all sealing interfaces.",
      },
      {
        step: "04",
        title: "Operational Load & Sea-Trial Verification",
        detail:
          "Running machinery under stepped load conditions, verifying thermal stabilization, fluid pressures, and leak-free operation.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "electrical",
        title: "Electrical Power & Distribution",
        systemCode: "02",
        reason:
          "Auxiliary engines drive electrical generators; pump performance relies directly on motor health.",
      },
      {
        slug: "automation",
        title: "Automation & Control Systems",
        systemCode: "03",
        reason:
          "Engine safety shutdowns, temperature transmitters, and pressure trips interface directly with mechanical systems.",
      },
      {
        slug: "pneumatic",
        title: "Pneumatic Systems & Control",
        systemCode: "04",
        reason:
          "Starting air distribution, air compressors, and control actuators govern engine starting and maneuvering.",
      },
    ],
    problemScenarios: [
      {
        symptom: "High cooling water temperature under engine load",
        systemInvolved: "Cooling Lines / Sea Water Pump",
        action: "Inspect pump impeller, clear line restrictions, verify thermostatic valve operation.",
      },
      {
        symptom: "Fuel transfer pump cavitation and low delivery pressure",
        systemInvolved: "Fuel Systems / Mechanical Seals",
        action: "Inspect suction filters, overhaul pump mechanical seals, verify line venting.",
      },
      {
        symptom: "Abnormal engine knocking or bearing temperature rise",
        systemInvolved: "Main / Auxiliary Engine",
        action: "Perform crankcase inspection, measure bearing clearances, verify lube oil delivery.",
      },
    ],
    ctaText: "REQUEST MECHANICAL SUPPORT",
    ctaParam: "mechanical",
    ctaTarget: "/contact/technical-support",
    imagePath: "/images/dev/engine-room.svg",
    imageAlt: "Marine mechanical engineering and propulsion engine room illustration",
    seoTitle: "Marine Mechanical Engineering & Machinery Services | ME Group",
    seoDescription:
      "Expert marine mechanical engineering services for main engines, auxiliary diesel engines, pumps, fuel lines, and cooling systems on commercial vessels.",
    status: "confirmed",
  },

  electrical: {
    slug: "electrical",
    number: "02",
    title: "Marine Electrical Power & Distribution",
    shortTitle: "Electrical Power",
    categoryId: "engineering-systems",
    categoryTitle: "Engineering Systems",
    kicker: "DISCIPLINE / 02",
    heroHeading: "GENERATORS, MAIN SWITCHBOARDS & POWER DISTRIBUTION",
    heroSubheading:
      "Shipboard electrical generation, automatic voltage regulation, breaker testing, earth fault diagnostics, and electric motor overhauls.",
    leadParagraph:
      "Vessel safety and operational continuity depend on uncompromised electrical integrity. ME Group provides comprehensive marine electrical engineering, addressing generator faults, switchboard protection, insulation degradation, and electric drive reliability across all shipboard power networks.",
    disciplinePhilosophy:
      "Marine electrical systems operate in demanding, high-humidity environments. We prioritize rigorous insulation resistance monitoring, thermal surveying, and protection device verification to prevent blackouts and electrical failures at sea.",
    scopeCategories: [
      {
        title: "Marine Generators & Voltage Regulation",
        description:
          "Generator diagnostics, AVR troubleshooting, and excitation circuit maintenance.",
        items: [
          "Marine generator stator and rotor insulation inspection",
          "Automatic Voltage Regulator (AVR) setup, adjustment, and stability tuning",
          "Exciter diode and rotating rectifier bridge testing",
          "Generator bearing temperature monitoring and lubrication inspection",
          "Generator space heater verification and moisture prevention",
        ],
      },
      {
        title: "Main Switchboards & Circuit Breakers",
        description:
          "Switchboard integrity, circuit breaker servicing, and busbar inspections.",
        items: [
          "Main switchboards and distribution panels inspection",
          "Circuit breakers and protection testing",
          "Overcurrent, short-circuit, and reverse-power protection trip testing",
          "Switchboard busbar connection torquing and thermal condition checks",
          "Safety interlocks, undervoltage release, and shunt trip verification",
        ],
      },
      {
        title: "Insulation, Earth Faults & Diagnostics",
        description:
          "Locating persistent earth faults, insulation testing, and non-destructive thermal surveys.",
        items: [
          "Earth fault location on AC and DC marine distribution networks",
          "Insulation resistance testing (Megger) on feeder cables and switchgear",
          "Infrared thermography surveys on loaded switchboard panels and breaker contacts",
          "Phase balance verification and voltage regulation under varying load",
        ],
      },
      {
        title: "AC / DC Electric Motors & Starter Panels",
        description:
          "Overhauls, rewinding coordination, bearing renewal, and motor starter panel troubleshooting.",
        items: [
          "Direct-On-Line (DOL), Star-Delta, and Soft-Starter panel maintenance",
          "Contactor contact renewal, overload relay calibration, and timer checks",
          "Electric motor bearing replacement and mechanical run-out inspection",
          "Stator winding Megger testing and dry-out procedures",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Marine Generators", category: "Power Generation" },
      { name: "Automatic Voltage Regulators (AVR)", category: "Voltage Control" },
      { name: "Main Switchboards", category: "Power Distribution" },
      { name: "Circuit Breakers", category: "Protection Devices" },
      { name: "Distribution & Starter Panels", category: "Protection Devices" },
      { name: "AC Induction & DC Motors", category: "Electric Drives" },
      { name: "Motor Starter Panels (DOL / Star-Delta)", category: "Motor Control" },
      { name: "Earth Fault Monitoring Units", category: "Diagnostics" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Safety De-energization & Technical Isolation",
        detail:
          "Ensuring proper circuit de-energization, voltage verification, and safe working conditions prior to electrical intervention.",
      },
      {
        step: "02",
        title: "Thermographic & Insulation Inspection",
        detail:
          "Conducting thermography and insulation resistance testing to identify high-resistance joints, degradation, or earth faults.",
      },
      {
        step: "03",
        title: "Switchgear & Component Servicing",
        detail:
          "Servicing switchgear contacts, contactors, AVR components, and motor starter panels.",
      },
      {
        step: "04",
        title: "Protection Testing & Synchronization Checks",
        detail:
          "Conducting trip testing, voltage regulation checks, and generator synchronization verification.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "mechanical",
        title: "Mechanical Engineering",
        systemCode: "01",
        reason:
          "Diesel engines provide mechanical prime-mover torque to generators; motor shafts drive mechanical pumps.",
      },
      {
        slug: "automation",
        title: "Automation & Control Systems",
        systemCode: "03",
        reason:
          "Power Management Systems (PMS) manage automatic generator start/stop, synchronization, and load sharing.",
      },
    ],
    problemScenarios: [
      {
        symptom: "Main switchboard earth fault alarm triggered with intermittent ground",
        systemInvolved: "Power Distribution Network",
        action: "Methodical feeder isolation, branch Megger testing, and localized wiring remediation.",
      },
      {
        symptom: "Generator voltage hunting or collapsing upon motor start",
        systemInvolved: "Generator / AVR Unit",
        action: "Inspect AVR stability settings, test rotating diode rectifiers, verify excitation winding integrity.",
      },
      {
        symptom: "Pump motor starter trips on thermal overload during normal operation",
        systemInvolved: "Starter Panel / Electric Motor",
        action: "Measure operating current per phase, inspect contactor wear, verify motor bearing condition.",
      },
    ],
    ctaText: "REQUEST ELECTRICAL SUPPORT",
    ctaParam: "electrical",
    ctaTarget: "/contact/technical-support",
    imagePath: "/images/dev/switchboard.svg",
    imageAlt: "Marine main switchboard and electrical power distribution illustration",
    seoTitle: "Marine Electrical Engineering, Generators & Switchboards | ME Group",
    seoDescription:
      "Comprehensive marine electrical services including marine generators, AVR troubleshooting, main switchboards, breaker testing, and earth fault diagnostics.",
    status: "confirmed",
  },

  automation: {
    slug: "automation",
    number: "03",
    title: "Automation, Control & Monitoring Systems",
    shortTitle: "Automation & Control",
    categoryId: "engineering-systems",
    categoryTitle: "Engineering Systems",
    kicker: "DISCIPLINE / 03",
    heroHeading: "MARINE PLCs, ALARM MONITORING & POWER MANAGEMENT",
    heroSubheading:
      "Inspection, diagnostics, calibration, and troubleshooting for shipboard PLCs, AMS, PMS, and critical sensor networks.",
    leadParagraph:
      "Modern vessel operation relies on tightly integrated automation and monitoring loops. ME Group delivers field-level automation engineering, troubleshooting Programmable Logic Controllers (PLCs), Alarm and Monitoring Systems (AMS), Power Management Systems (PMS), and instrumentation loops to maintain safe automated watchkeeping.",
    disciplinePhilosophy:
      "Automation troubleshooting requires deep signal-path clarity: distinguishing between physical sensor failure, loop wiring noise, controller logic errors, and downstream actuator faults. We resolve the root cause across the complete control chain.",
    scopeCategories: [
      {
        title: "Marine PLC Systems & Control Panels",
        description:
          "Hardware diagnostics, I/O module testing, and control cabinet integrity.",
        items: [
          "Marine PLC rack power supply, CPU status, and communication module inspection",
          "Digital and analogue I/O channel testing (4-20mA, 0-10V, PT100/RTD)",
          "Control cabinet wiring inspection, terminal tightening, and shielding verification",
          "Safety shutdown loop testing and emergency stop circuit verification",
        ],
      },
      {
        title: "Alarm & Monitoring Systems (AMS)",
        description:
          "Engine-room alarm monitoring, centralized workstation displays, and remote annunciators.",
        items: [
          "Engine-room Alarm Monitoring System (AMS) channel diagnostics and fault clearing",
          "Exhaust gas temperature deviation monitoring and alarm threshold verification",
          "Bilge high-level alarm loop testing and sensor inspection",
          "Main bearing temperature alarm and oil mist detector interface checks",
        ],
      },
      {
        title: "Power Management Systems (PMS) & Synchronization",
        description:
          "Automated generator control, auto-synchronization, and load management.",
        items: [
          "Auto-synchronizing unit testing and phase angle matching checks",
          "Automatic load-dependent start/stop sequence troubleshooting",
          "Non-essential load trip (preferential trip) system verification",
          "Symmetric and asymmetric load sharing controller calibration",
        ],
      },
      {
        title: "Instrumentation & Marine Sensors",
        description:
          "Sensors, transmitters, switches, and safety detection arrays.",
        items: [
          "Temperature sensors (PT100, thermocouples) testing and loop resistance checks",
          "Pressure transmitters (fuel, oil, starting air, cooling water) zero/span checks",
          "Tank level transmitters (radar, hydrostatic, ultrasonic) signal verification",
          "Engine-room fire alarm detection loops and flammable/toxic gas detectors",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Programmable Logic Controllers (PLC)", category: "Control Hardware" },
      { name: "Alarm & Monitoring Systems (AMS)", category: "Monitoring" },
      { name: "Power Management Systems (PMS)", category: "Power Control" },
      { name: "Auto-Synchronization Units", category: "Generator Control" },
      { name: "PT100 RTDs & Thermocouples", category: "Temperature Sensors" },
      { name: "4-20mA Pressure Transmitters", category: "Pressure Sensors" },
      { name: "Hydrostatic Tank Level Transmitters", category: "Level Sensors" },
      { name: "Marine Fire & Gas Detection Panels", category: "Safety Systems" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Signal Path & Fault Trace",
        detail:
          "Checking diagnostic buffer logs on PLCs/AMS panels and tracing signal loops from field transmitter to controller I/O.",
      },
      {
        step: "02",
        title: "Hardware & Sensor Testing",
        detail:
          "Testing sensor outputs, signal loops, and transmitter responses across temperature and pressure measurement points.",
      },
      {
        step: "03",
        title: "Logic & Interface Verification",
        detail:
          "Verifying trip setpoints, alarm delays, interlock states, and communication bus integrity (Modbus/CAN/serial).",
      },
      {
        step: "04",
        title: "Full Loop Simulation & Handover",
        detail:
          "Simulating operational fault states to confirm correct alarm annunciation, automated corrective action, and safe shutdown.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "electrical",
        title: "Electrical Power & Distribution",
        systemCode: "02",
        reason:
          "PMS logic directly controls switchboard breaker trips, bus-tie closings, and generator excitation commands.",
      },
      {
        slug: "pneumatic",
        title: "Pneumatic Systems & Control",
        systemCode: "04",
        reason:
          "Automation outputs drive solenoid valves and positioners on pneumatic safety and control manifolds.",
      },
      {
        slug: "mechanical",
        title: "Mechanical Engineering",
        systemCode: "01",
        reason:
          "Sensors protect prime movers, detecting high jacket water temperature, low lube oil pressure, and abnormal RPM.",
      },
    ],
    problemScenarios: [
      {
        symptom: "False exhaust temperature deviation alarm locking out automation",
        systemInvolved: "AMS / Thermocouple Array",
        action: "Measure loop millivolt values, test sensor junction boxes, replace degraded thermocouple element.",
      },
      {
        symptom: "Generators fail to auto-synchronize during parallel connection attempt",
        systemInvolved: "PMS / Synchro-coupler",
        action: "Verify voltage/frequency matching signals, test speed governor actuator signal from PMS.",
      },
      {
        symptom: "Engine-room fire alarm loop reports open-circuit fault in zone",
        systemInvolved: "Fire Detection Panel",
        action: "Locate broken wiring in loop, verify end-of-line resistor values, test individual detector bases.",
      },
    ],
    ctaText: "REQUEST AUTOMATION SUPPORT",
    ctaParam: "automation",
    ctaTarget: "/contact/technical-support",
    imagePath: "/images/dev/plc-automation.svg",
    imageAlt: "Marine PLC automation and control cabinet illustration",
    seoTitle: "Marine Automation, PLC, AMS & PMS Services | ME Group",
    seoDescription:
      "Specialized marine automation services for shipboard PLCs, Alarm Monitoring Systems (AMS), Power Management Systems (PMS), and sensor loop diagnostics.",
    status: "confirmed",
  },

  pneumatic: {
    slug: "pneumatic",
    number: "04",
    title: "Marine Pneumatic Systems & Control",
    shortTitle: "Pneumatic Systems",
    categoryId: "engineering-systems",
    categoryTitle: "Engineering Systems",
    kicker: "DISCIPLINE / 04",
    heroHeading: "AIR COMPRESSORS, ACTUATION & CONTROL VALVES",
    heroSubheading:
      "Compressor overhauls, pneumatic cylinder rebuilding, seal kits, solenoid valves, air drying units, and system leak detection.",
    leadParagraph:
      "Pneumatics provide critical force and precision for main engine starting, valve remote control, automation actuators, and quick-closing safety valves. ME Group provides comprehensive pneumatic engineering to ensure clean, dry, pressurized air delivery and responsive mechanical actuation.",
    disciplinePhilosophy:
      "Air quality and seal integrity are the lifeblood of marine pneumatics. Moisture contamination and micro-leaks cause sticking valves, compressor head failures, and sluggish engine maneuvering. We eliminate air loss and restore valve actuation precision.",
    scopeCategories: [
      {
        title: "Marine Air Compressors & Charging",
        description:
          "Air compressors, charging circuits, and pneumatic equipment servicing.",
        items: [
          "Compressor valve plate inspection, cleaning, and replacement",
          "Compressor cylinder head, piston ring, and piston pin renewal",
          "Intercooler and aftercooler cleaning and pressure testing",
          "Automatic unloader valves, moisture drain traps, and non-return valve servicing",
          "Safety relief valve mechanical inspection and pressure testing",
        ],
      },
      {
        title: "Pneumatic Actuators & Cylinders",
        description:
          "Overhaul, seal replacement, and linear/rotary actuator maintenance.",
        items: [
          "Pneumatic cylinder teardown, barrel honing check, and piston rod polishing",
          "Complete seal kit replacement (Viton, NBR, polyurethane seals)",
          "Air damper and cushion valve mechanical adjustments",
          "Quick-closing fuel shut-off cylinder and emergency trip actuator servicing",
        ],
      },
      {
        title: "Control Valves & Solenoid Manifolds",
        description:
          "Directional control valves, pilot valves, and electro-pneumatic manifolds.",
        items: [
          "3/2-way, 5/2-way, and 5/3-way solenoid valve spool cleaning and coil testing",
          "Electro-pneumatic positioners and proportional air valve calibration",
          "Engine maneuvering air control blocks and pilot air valve servicing",
          "Pneumatic pressure regulating valves (PRV) and relief valves",
        ],
      },
      {
        title: "Air Treatment & Leakage Detection",
        description:
          "Ensuring dry, lubricated air and eliminating compressed air losses.",
        items: [
          "Refrigerated and desiccant air dryer servicing and refrigerant cycle checks",
          "Filter-Regulator-Lubricator (FRL) unit overhauls and coalescing element renewal",
          "Acoustic and bubble leakage surveys on main starting and control air headers",
          "Condensate auto-drain system overhauls and timer verification",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Marine Air Compressors", category: "Air Generation" },
      { name: "Control Air Compressors", category: "Air Generation" },
      { name: "Pneumatic Actuators & Cylinders", category: "Actuation" },
      { name: "Solenoid Directional Valves", category: "Control Valves" },
      { name: "Electro-Pneumatic Positioners", category: "Modulating Valves" },
      { name: "Refrigerated / Desiccant Air Dryers", category: "Air Treatment" },
      { name: "FRL Filter-Regulator Units", category: "Air Conditioning" },
      { name: "Non-Return & Relief Valves", category: "Safety Valves" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Pressure & Air Quality Audit",
        detail:
          "Measuring compressor charging time, interstage pressures, dew point, and air line oil/water contamination levels.",
      },
      {
        step: "02",
        title: "Leakage & Pressure Drop Isolation",
        detail:
          "Performing sectional isolation on air headers and utilizing ultrasonic leak detection to pinpoint air loss.",
      },
      {
        step: "03",
        title: "Component Overhaul & Seal Renewal",
        detail:
          "Lapping valve plates, installing genuine seal kits, honing cylinder barrels, and renewing solenoid coils.",
      },
      {
        step: "04",
        title: "Operational Actuation & Pressure Holding Test",
        detail:
          "Testing safety valve lifts, verifying cylinder stroking times, and conducting 24-hour pressure holding tests.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "mechanical",
        title: "Mechanical Engineering",
        systemCode: "01",
        reason:
          "Starting air directly turns engine flywheels; pneumatic governor actuators control fuel rack position.",
      },
      {
        slug: "automation",
        title: "Automation & Control Systems",
        systemCode: "03",
        reason:
          "PLC digital outputs fire solenoid coils to initiate pneumatic valve sequences and emergency trips.",
      },
    ],
    problemScenarios: [
      {
        symptom: "Air compressor takes excessively long to charge receivers",
        systemInvolved: "Air Compressor / Valve Plates",
        action: "Overhaul suction/discharge valve plates, renew piston rings, clean intercoolers.",
      },
      {
        symptom: "Quick-closing valve cylinder fails to trip during safety drill",
        systemInvolved: "Pneumatic Cylinder / Seal Kit",
        action: "Teardown cylinder, renew hardened seals, verify pilot air line venting and free movement.",
      },
      {
        symptom: "Moisture detected in pneumatic control lines affecting valve positioners",
        systemInvolved: "Air Dryer / FRL Unit",
        action: "Service refrigerated dryer, overhaul auto-drain traps, renew coalescing filter cartridges.",
      },
    ],
    ctaText: "REQUEST PNEUMATIC SUPPORT",
    ctaParam: "pneumatic",
    ctaTarget: "/contact/technical-support",
    imagePath: "/images/dev/compressor.svg",
    imageAlt: "Marine air compressor and pneumatic control system illustration",
    seoTitle: "Marine Pneumatics, Air Compressors & Control Valves | ME Group",
    seoDescription:
      "Reliable marine pneumatic engineering: air compressor overhauls, pneumatic cylinders, seal kits, solenoid valves, air dryers, and leak detection.",
    status: "confirmed",
  },

  "repair-maintenance": {
    slug: "repair-maintenance",
    number: "05",
    title: "Marine Repair & Maintenance Services",
    shortTitle: "Repair & Maintenance",
    categoryId: "repair-maintenance",
    categoryTitle: "Repair & Maintenance",
    kicker: "DISCIPLINE / 05",
    heroHeading: "STRUCTURED INTERVENTION, PREVENTIVE PROGRAMS & RAPID RESPONSE",
    heroSubheading:
      "A systematic engineering methodology designed to reduce unexpected breakdowns, restore machinery reliability, and maintain vessel operational readiness.",
    leadParagraph:
      "Shipboard equipment demands a balance of structured preventive upkeep and swift, disciplined corrective action when faults emerge. ME Group organizes repair and maintenance around a clear 5-stage engineering lifecycle: Identify, Intervene, Restore, Verify, and Support.",
    disciplinePhilosophy:
      "We believe maintenance is not merely fixing what breaks; it is understanding degradation mechanisms, measuring exact operational tolerances, and proving post-repair performance through rigorous testing before vessel departure.",
    scopeCategories: [
      {
        title: "Preventive Maintenance Programs",
        description:
          "Scheduled proactive servicing to prevent catastrophic machinery breakdowns.",
        items: [
          "Periodic machinery clearance measurements (crankshaft deflections, bearing clearances)",
          "Switchboard thermal imaging surveys under generator load",
          "Megger insulation testing across motor feeders and distribution panels",
          "Pneumatic air dryer and filter element scheduled changeouts",
          "Lubrication, filter renewals, and pump mechanical seal maintenance",
        ],
      },
      {
        title: "Corrective Intervention & Fault Response",
        description:
          "Targeted troubleshooting and emergency repairs when systems suffer operational failure.",
        items: [
          "Rapid fault isolation on seized or vibrating pumps and motors",
          "Emergency earth fault tracing and circuit breaker troubleshooting",
          "PLC communication blackout and sensor loop recovery",
          "Air compressor discharge failure and valve rebuilding under port turnaround pressure",
        ],
      },
      {
        title: "Inspection, Diagnostics & Condition Assessment",
        description:
          "Detailed non-destructive testing and operational condition reporting.",
        items: [
          "Technical diagnostic inspections before scheduled port calls",
          "Machinery condition surveys for superintendents and technical managers",
          "Vibration and acoustic analysis on high-speed rotating equipment",
          "Electrical power quality, voltage stability, and insulation resistance reports",
        ],
      },
      {
        title: "Testing, Commissioning & Handover",
        description:
          "Verifying full operational capability under realistic marine conditions.",
        items: [
          "Post-overhaul running-in checks and stepped load tests",
          "Safety trip and emergency shutdown simulation",
          "Generator auto-synchronization and load transfer trials",
          "Comprehensive engineering service report and technical recommendations",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Propulsion & Auxiliary Diesel Engines", category: "Mechanical" },
      { name: "Main Switchboards & Panels", category: "Electrical" },
      { name: "Marine Generators & Motors", category: "Electrical" },
      { name: "Centrifugal & Screw Pumps", category: "Pumps" },
      { name: "Marine Air Compressors", category: "Pneumatics" },
      { name: "Programmable Logic Controllers (PLC)", category: "Automation" },
      { name: "Alarm Monitoring Systems (AMS)", category: "Automation" },
      { name: "Pneumatic Control Manifolds", category: "Pneumatics" },
    ],
    processSteps: [
      {
        step: "01",
        title: "IDENTIFY",
        detail:
          "Structured diagnostic analysis: reviewing logbooks, measuring baseline electrical/thermal parameters, and isolating the root physical failure mode.",
      },
      {
        step: "02",
        title: "INTERVENE",
        detail:
          "Formulating a disciplined repair plan, implementing strict safety isolation, and deploying specialized tooling to access critical components.",
      },
      {
        step: "03",
        title: "RESTORE",
        detail:
          "Precision machining check, genuine parts replacement, calibrated torque fastening, and restoring alignments to maker tolerances.",
      },
      {
        step: "04",
        title: "VERIFY",
        detail:
          "Dynamic operational testing: load testing, thermal checks, Megger re-verification, and safety trip simulation under full watch conditions.",
      },
      {
        step: "05",
        title: "SUPPORT",
        detail:
          "Delivering comprehensive technical sign-off reports, operational recommendations, and ongoing technical guidance for shipboard engineers.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "mechanical",
        title: "Mechanical Engineering",
        systemCode: "01",
        reason: "Core physical machinery overhauls and running clearances.",
      },
      {
        slug: "electrical",
        title: "Electrical Power & Distribution",
        systemCode: "02",
        reason: "Switchboard safety, breaker protection, and motor rewinds.",
      },
      {
        slug: "automation",
        title: "Automation & Control Systems",
        systemCode: "03",
        reason: "Sensor calibration and automated trip loop testing.",
      },
      {
        slug: "pneumatic",
        title: "Pneumatic Systems & Control",
        systemCode: "04",
        reason: "Compressor overhauls and starting air valve refurbishment.",
      },
    ],
    problemScenarios: [
      {
        symptom: "Unplanned generator shutdown during port maneuvers",
        systemInvolved: "Electrical / Mechanical / Protection",
        action: "Deploy rapid support team: check breaker trip status, AVR excitation, and fuel delivery circuits.",
      },
      {
        symptom: "Progressive drop in seawater cooling pump delivery pressure",
        systemInvolved: "Mechanical / Pump Wear Ring",
        action: "Schedule port intervention: open pump casing, measure wear clearances, replace worn impellers and seals.",
      },
    ],
    ctaText: "REQUEST TECHNICAL SUPPORT",
    ctaParam: "mechanical",
    ctaTarget: "/contact/technical-support",
    imagePath: "/images/dev/inspection.svg",
    imageAlt: "Marine technical inspection, diagnostics and repair illustration",
    seoTitle: "Marine Repair & Maintenance Services | Preventive & Corrective | ME Group",
    seoDescription:
      "Structured marine repair and maintenance services: technical inspection, preventive upkeep, corrective emergency repairs, testing, and commissioning.",
    status: "confirmed",
  },

  "vessel-support": {
    slug: "vessel-support",
    number: "06",
    title: "Vessel Technical Supplies & Provisioning",
    shortTitle: "Vessel Support",
    categoryId: "vessel-support",
    categoryTitle: "Vessel Support",
    kicker: "DISCIPLINE / 06",
    heroHeading: "TECHNICAL SUPPLIES, PROVISIONING & VESSEL LOGISTICS",
    heroSubheading:
      "Engineering-led operational support delivering critical engine-room consumables, specialized tools, potable water, and certified provisions.",
    leadParagraph:
      "While engineering remains ME Group's primary foundation, smooth vessel operations require seamless technical logistics during port stays. Our vessel support division supplies certified provisions, potable water, technical consumables, and engine-room tools so crews can maintain operational readiness without delays.",
    disciplinePhilosophy:
      "Vessel support is delivered with an engineer's attention to quality and specification. From food hygiene standards to exact lubricant and gasket grades, we deliver verified supplies directly onboard.",
    scopeCategories: [
      {
        title: "Technical Supplies & Consumables",
        description:
          "Essential engine-room and deck maintenance consumables.",
        items: [
          "High-temperature gasket materials, packing sheets, and O-ring assortments",
          "Specialized marine lubricants, greases, threadlockers, and sealants",
          "Electrical cables, terminal lugs, insulating varnishes, and heat-shrink tubing",
          "Pneumatic fittings, polyurethane tubing, and quick-connect couplings",
          "Engine-room filter elements, oil absorbents, and cleaning solvents",
        ],
      },
      {
        title: "Engine-Room Tools & Equipment",
        description:
          "Specialized workshop tools and measurement instrumentation.",
        items: [
          "Precision measuring tools (micrometers, vernier calipers, dial gauges)",
          "Electrical multimeters, clamp meters, and Megger insulation testers",
          "Heavy-duty pneumatic impact wrenches and torque multipliers",
          "Valve lapping kits, pipe benders, and tube flaring tooling",
        ],
      },
      {
        title: "Vessel Provisioning & Food Supplies",
        description:
          "High-grade fresh, chilled, and frozen food supplies for crew catering.",
        items: [
          "Fresh fruits, crisp vegetables, and seasonal greens sourced under strict quality controls",
          "Frozen beef, poultry, and fish stored in continuous cold-chain conditions",
          "Dry provisions, grains, flour, canned goods, and galley staples",
          "Dietary-compliant international food provisions",
        ],
      },
      {
        title: "Drinking Water & Medical Needs",
        description:
          "Essential welfare supplies and safety readiness onboard.",
        items: [
          "Certified potable drinking water delivery via barge or dedicated road tanker",
          "Bottled mineral drinking water in pallets",
          "Vessel medicine chest replenishments and first aid kits compliant with marine regulations",
          "Sanitizing supplies and emergency hygiene packs",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Technical Consumables & Gaskets", category: "Engine Room" },
      { name: "Specialized Lubricants & Sealants", category: "Chemicals" },
      { name: "Diagnostic Multimeters & Meters", category: "Instrumentation" },
      { name: "Fresh & Frozen Provisions", category: "Catering" },
      { name: "Certified Potable Drinking Water", category: "Bunkering" },
      { name: "Medical Chest & First Aid Kits", category: "Safety Supplies" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Requisition & Specification Match",
        detail:
          "Reviewing vessel requisition lists against marine specifications, verifying quantities, grades, and delivery deadlines.",
      },
      {
        step: "02",
        title: "Procurement & Quality Verification",
        detail:
          "Sourcing verified technical consumables and fresh foodstuffs under certified cold-chain and storage conditions.",
      },
      {
        step: "03",
        title: "Consolidated Delivery & Customs Clearance",
        detail:
          "Coordinating with local port authorities, organizing secure barge/truck transport, and clearing delivery documentation.",
      },
      {
        step: "04",
        title: "Onboard Receipt & Handover",
        detail:
          "Direct deck/engine-room delivery, signing delivery receipts with Chief Cook and Chief Engineer.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "spare-parts",
        title: "Marine Spare Parts",
        systemCode: "07",
        reason: "Technical supplies complement spare part delivery for complete overhaul packages.",
      },
      {
        slug: "repair-maintenance",
        title: "Repair & Maintenance",
        systemCode: "05",
        reason: "Engine-room tools and consumables support on-board maintenance interventions.",
      },
    ],
    problemScenarios: [
      {
        symptom: "Vessel requires immediate drinking water bunkering and dry provisions before departure",
        systemInvolved: "Vessel Logistics / Provisioning",
        action: "Mobilize approved water tanker and refrigerated delivery truck to berth within port window.",
      },
      {
        symptom: "Chief Engineer urgently needs specialized high-temp exhaust gasket sheets and torque multipliers",
        systemInvolved: "Technical Supplies / Workshop Tools",
        action: "Pick and dispatch specified materials directly to the vessel gangway.",
      },
    ],
    ctaText: "REQUEST VESSEL SUPPORT",
    ctaParam: "",
    ctaTarget: "/contact",
    imagePath: "/images/dev/vessel-exterior.svg",
    imageAlt: "Marine vessel technical support and supply logistics illustration",
    seoTitle: "Vessel Technical Supplies, Consumables & Provisioning | ME Group",
    seoDescription:
      "Integrated marine vessel support: technical supplies, engine-room consumables, specialized workshop tools, potable water, and certified food provisioning.",
    status: "confirmed",
  },

  "spare-parts": {
    slug: "spare-parts",
    number: "07",
    title: "Marine Spare Parts & Technical Equipment",
    shortTitle: "Spare Parts",
    categoryId: "vessel-support",
    categoryTitle: "Vessel Support",
    kicker: "DISCIPLINE / 07",
    heroHeading: "KNOW THE PART? SEND THE NUMBER. DON'T KNOW THE PART? SEND THE NAMEPLATE.",
    heroSubheading:
      "Rapid identification, technical verification, and expedited delivery of marine machinery, electrical, and pneumatic spare parts.",
    leadParagraph:
      "Machinery breakdowns require rapid, accurate spare part identification. ME Group bridges the technical gap between part numbers, maker drawings, and delivery logistics. Whether you have the exact part number or only a photo of the equipment nameplate, our technical team identifies the exact component specification.",
    disciplinePhilosophy:
      "Sending the wrong part wastes critical port turnaround time. We cross-reference engine serial numbers, maker drawings, and equipment nameplates to verify fitment, material specification, and compatibility before dispatch.",
    scopeCategories: [
      {
        title: "Engine & Mechanical Spares",
        description:
          "Components for propulsion main engines, auxiliary gensets, and marine pumps.",
        items: [
          "Piston rings, cylinder liners, valves, valve guides, and valve seats",
          "Connecting rod bearings, main bearings, and thrust washers",
          "Fuel injection pumps, injectors, nozzles, and high-pressure fuel pipes",
          "Centrifugal pump impellers, shafts, wear rings, and mechanical seals",
          "Duplex filter elements, oil/water separator filter cartridges",
        ],
      },
      {
        title: "Electrical & Switchboard Spares",
        description:
          "Protection gear, generator controllers, and motor starter spares.",
        items: [
          "Automatic Voltage Regulators (AVR) and rotating diode assemblies",
          "Circuit breaker auxiliary contacts, shunt trips, and undervoltage coils",
          "Marine contactors, thermal overloads, timers, and selector switches",
          "Generator excitation transformers, current transformers, and meters",
        ],
      },
      {
        title: "Pneumatic & Automation Spares",
        description:
          "Solenoids, valves, sensors, and compressor rebuilding components.",
        items: [
          "Air compressor valve plates, piston rings, gaskets, and unloader assemblies",
          "Solenoid valves, pneumatic coils, and valve repair kits",
          "Cylinder seal kits (Viton, NBR) and linear actuator rebuild components",
          "PT100 temperature sensors, 4-20mA pressure transmitters, and level switches",
        ],
      },
      {
        title: "Intake Workflow: 6 Essential Parameters",
        description:
          "Our structured spare parts identification and dispatch protocol.",
        items: [
          "1. Part Description / System Involved",
          "2. Part Number (if known) or Clear Equipment Nameplate Photo",
          "3. Equipment Maker, Model & Serial Number",
          "4. Required Quantity & Criticality Level",
          "5. Target Delivery Port & Vessel Berthing Schedule",
          "6. Required Onboard Delivery Date",
        ],
      },
    ],
    equipmentHandled: [
      { name: "Main Engine Overhaul Spares", category: "Mechanical" },
      { name: "Auxiliary Generator Spares", category: "Power" },
      { name: "Marine Pump Seals & Impellers", category: "Fluid Handling" },
      { name: "AVR Modules & Diodes", category: "Electrical" },
      { name: "Circuit Breaker Accessories", category: "Switchgear" },
      { name: "Compressor Valve Plates", category: "Pneumatics" },
      { name: "Pneumatic Solenoid Valves", category: "Pneumatics" },
      { name: "Pressure & Temp Transmitters", category: "Automation" },
    ],
    processSteps: [
      {
        step: "01",
        title: "Intake & Nameplate Identification",
        detail:
          "Receiving part number, drawing reference, or nameplate photograph and identifying manufacturer and serial build.",
      },
      {
        step: "02",
        title: "Technical Fitment Verification",
        detail:
          "Checking dimensional drawings, material grades, and electrical ratings to ensure 100% compatibility.",
      },
      {
        step: "03",
        title: "Sourcing & Quality Inspection",
        detail:
          "Inspecting parts for surface finish, packaging integrity, and accompanying maker certificates.",
      },
      {
        step: "04",
        title: "Expedited Port Delivery",
        detail:
          "Coordinating customs documentation and delivering parts directly to the ship's agent or vessel deck.",
      },
    ],
    relatedDisciplines: [
      {
        slug: "mechanical",
        title: "Mechanical Engineering",
        systemCode: "01",
        reason: "Engine and pump spares require mechanical verification.",
      },
      {
        slug: "electrical",
        title: "Electrical Power & Distribution",
        systemCode: "02",
        reason: "AVRs and switchgear components require electrical rating confirmation.",
      },
      {
        slug: "pneumatic",
        title: "Pneumatic Systems & Control",
        systemCode: "04",
        reason: "Compressor valves and pneumatic seal kits require pressure rating matching.",
      },
    ],
    problemScenarios: [
      {
        symptom: "Vessel has worn auxiliary engine fuel pump but parts book is missing",
        systemInvolved: "Fuel System / Auxiliary Engine",
        action: "Send nameplate photo; our technical team matches the exact maker build code and dispatches pump unit.",
      },
      {
        symptom: "Air compressor valve plate damaged during vessel operation",
        systemInvolved: "Compressed Air / Valve Assembly",
        action: "Submit compressor model and serial; replacement valve plates and gasket set dispatched for immediate overhaul.",
      },
    ],
    ctaText: "REQUEST SPARE PARTS",
    ctaParam: "",
    ctaTarget: "/contact/spare-parts",
    imagePath: "/images/dev/spare-parts.svg",
    imageAlt: "Marine spare parts, nameplate matching and technical delivery illustration",
    seoTitle: "Marine Spare Parts | Fast Nameplate Matching & Delivery | ME Group",
    seoDescription:
      "Fast marine spare parts sourcing. Send your part number or equipment nameplate photo for main engines, pumps, switchboards, compressors, and automation gear.",
    status: "confirmed",
  },
};

/**
 * Service Slug Helpers
 */
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DETAIL[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICES_DETAIL);
}

export function getAllServices(): ServiceDetail[] {
  return Object.values(SERVICES_DETAIL);
}

export function getServicesByCategory(categoryId: ServiceCategoryId): ServiceDetail[] {
  return Object.values(SERVICES_DETAIL).filter((s) => s.categoryId === categoryId);
}

export const serviceGroups = serviceTaxonomyGroups;

export function serviceHref(
  groupOrSlug: ServiceGroup | string,
  service?: { slug: string; href?: string }
): string {
  if (service?.href) return service.href;
  if (typeof groupOrSlug === "string") {
    return `/services/${groupOrSlug}`;
  }
  if (service?.slug) {
    return `/services/${service.slug}`;
  }
  return `/services/${groupOrSlug.slug}`;
}
