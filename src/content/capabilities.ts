import type { Gated } from "./types";

export interface CapabilityCategory {
  id: string;
  code: string;
  title: string;
  summary: string;
  equipmentList: {
    name: string;
    primaryDiscipline: string;
    serviceRoute: string;
    scopeSummary: string;
    relatedDisciplines: string[];
  }[];
}

export interface CrossDisciplineScenario {
  id: string;
  title: string;
  observedSymptom: string;
  disciplinesInvolved: {
    name: string;
    code: string;
    role: string;
    route: string;
  }[];
  integratedResolution: string;
}

export interface CapabilityPageContent extends Gated {
  kicker: string;
  heroHeading: string;
  heroSubheading: string;
  leadStatement: string;
  categories: CapabilityCategory[];
  crossDisciplineScenarios: CrossDisciplineScenario[];
  seoTitle: string;
  seoDescription: string;
}

export const CAPABILITIES_CONTENT: CapabilityPageContent = {
  status: "confirmed",
  kicker: "TECHNICAL CAPABILITY MATRIX",
  heroHeading: "WHAT CAN ME GROUP WORK ON?",
  heroSubheading:
    "An integrated technical navigation layer across shipboard machinery, electrical distribution, automation controllers, pneumatic systems, and maritime communications.",
  leadStatement:
    "Marine equipment rarely operates in isolation. A single operational disturbance in a generator, radio console, pump, or air compressor often spans mechanical condition, electrical power, radio frequency loss, pneumatic actuation, and automated logic. ME Group approaches vessel engineering through this integrated cross-disciplinary perspective.",
  categories: [
    {
      id: "power-propulsion",
      code: "01",
      title: "Propulsion & Power Generation",
      summary:
        "Prime movers, diesel engines, and marine generators driving vessel mobility and electrical energy.",
      equipmentList: [
        {
          name: "Main Propulsion Diesel Engines",
          primaryDiscipline: "Mechanical",
          serviceRoute: "/services/mechanical",
          scopeSummary:
            "Mechanical inspection, cylinder head servicing, running clearances, fuel line integrity, and cooling troubleshooting.",
          relatedDisciplines: ["Automation", "Pneumatics"],
        },
        {
          name: "Auxiliary Diesel Engines",
          primaryDiscipline: "Mechanical",
          serviceRoute: "/services/mechanical",
          scopeSummary:
            "Engine overhaul, bearing clearance measurements, fuel injection pumps, governor linkage, and lube oil circuits.",
          relatedDisciplines: ["Electrical", "Automation"],
        },
        {
          name: "Marine Generators",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Stator/rotor insulation resistance testing, AVR tuning, exciter diode bridges, and bearing condition assessments.",
          relatedDisciplines: ["Mechanical", "Automation"],
        },
        {
          name: "Automatic Voltage Regulators (AVR)",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Voltage stability adjustments, excitation circuit fault-finding, and voltage build-up troubleshooting.",
          relatedDisciplines: ["Automation"],
        },
      ],
    },
    {
      id: "distribution-control",
      code: "02",
      title: "Electrical Distribution & Switchgear",
      summary:
        "Main switchboards, circuit breakers, earth fault monitoring, and electric motor starters.",
      equipmentList: [
        {
          name: "Main Switchboards & Distribution Panels",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Busbar connections, thermographic surveys under load, earth fault isolation, and interlock verification.",
          relatedDisciplines: ["Automation", "Safety"],
        },
        {
          name: "Air Circuit Breakers (ACB)",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Mechanism servicing, arc chute inspection, primary/secondary injection trip testing, and contact dressing.",
          relatedDisciplines: ["Automation"],
        },
        {
          name: "AC Induction & DC Motors",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Winding insulation resistance (Megger), bearing replacement, mechanical alignment, and terminal box overhauls.",
          relatedDisciplines: ["Mechanical"],
        },
        {
          name: "Motor Starter Panels (DOL / Star-Delta)",
          primaryDiscipline: "Electrical",
          serviceRoute: "/services/electrical",
          scopeSummary:
            "Contactor replacement, overload relay calibration, control transformer testing, and start/stop logic checks.",
          relatedDisciplines: ["Automation"],
        },
      ],
    },
    {
      id: "automation-instrumentation",
      code: "03",
      title: "Automation, PLCs & Instrumentation",
      summary:
        "Marine controllers, monitoring channels, synchronization loops, and safety detection.",
      equipmentList: [
        {
          name: "Marine Programmable Logic Controllers (PLC)",
          primaryDiscipline: "Automation",
          serviceRoute: "/services/automation",
          scopeSummary:
            "Hardware diagnostic buffer interrogation, I/O module testing, 4-20mA loop verification, and power supply health.",
          relatedDisciplines: ["Electrical", "Pneumatics"],
        },
        {
          name: "Alarm & Monitoring Systems (AMS)",
          primaryDiscipline: "Automation",
          serviceRoute: "/services/automation",
          scopeSummary:
            "Channel testing, sensor fault tracing, exhaust temperature averaging checks, and bilge alarm loops.",
          relatedDisciplines: ["Mechanical", "Safety"],
        },
        {
          name: "Power Management Systems (PMS)",
          primaryDiscipline: "Automation",
          serviceRoute: "/services/automation",
          scopeSummary:
            "Auto-synchronization troubleshooting, load sharing calibration, and non-essential load trip testing.",
          relatedDisciplines: ["Electrical"],
        },
        {
          name: "Pressure, Temperature & Level Sensors",
          primaryDiscipline: "Automation",
          serviceRoute: "/services/automation",
          scopeSummary:
            "PT100 RTD resistance verification, 4-20mA pressure transmitter calibration, and hydrostatic tank level checks.",
          relatedDisciplines: ["Mechanical", "Pneumatics"],
        },
      ],
    },
    {
      id: "pumps-fluid-systems",
      code: "04",
      title: "Pumps, Fluid Lines & Pneumatics",
      summary:
        "Fluid transfer, engine cooling lines, high-pressure starting air, and pneumatic control actuators.",
      equipmentList: [
        {
          name: "Marine Centrifugal & Screw Pumps",
          primaryDiscipline: "Mechanical",
          serviceRoute: "/services/mechanical",
          scopeSummary:
            "Mechanical seal renewal, impeller wear ring clearance checks, casing inspection, and shaft alignment.",
          relatedDisciplines: ["Electrical"],
        },
        {
          name: "Fuel Oil & Cooling Water Lines",
          primaryDiscipline: "Mechanical",
          serviceRoute: "/services/mechanical",
          scopeSummary:
            "Duplex filter maintenance, thermostatic mixing valve overhauls, high-pressure fuel pipe inspection.",
          relatedDisciplines: ["Automation"],
        },
        {
          name: "Starting Air Compressors",
          primaryDiscipline: "Pneumatics",
          serviceRoute: "/services/pneumatic",
          scopeSummary:
            "Suction/discharge valve plate replacement, cylinder head overhauls, intercooler cleaning, and relief valve checks.",
          relatedDisciplines: ["Mechanical", "Electrical"],
        },
        {
          name: "Pneumatic Cylinders & Solenoid Valves",
          primaryDiscipline: "Pneumatics",
          serviceRoute: "/services/pneumatic",
          scopeSummary:
            "Seal kit rebuilds, quick-closing valve actuator testing, solenoid coil checks, and air line leakage audits.",
          relatedDisciplines: ["Automation"],
        },
      ],
    },
    {
      id: "navigation-communication",
      code: "05",
      title: "Bridge Navigation & Maritime Communications",
      summary:
        "GMDSS radio consoles, satellite terminals, reserve power systems, and emergency bridge electronics.",
      equipmentList: [
        {
          name: "GMDSS Consoles & Multi-Band Radio Stations",
          primaryDiscipline: "Radio & Bridge",
          serviceRoute: "/services/radio-equipment",
          scopeSummary:
            "MF/HF and VHF DSC transceivers, duplicate emergency power supply changeover, dummy load RF power checks, and audio clarity testing.",
          relatedDisciplines: ["Electrical", "Automation"],
        },
        {
          name: "Inmarsat-C & Maritime Satellite Terminals",
          primaryDiscipline: "Radio & Bridge",
          serviceRoute: "/services/radio-equipment",
          scopeSummary:
            "Antenna radome coaxial cable loss checks, GPS receiver position data acquisition, distress button verification, and PV test execution.",
          relatedDisciplines: ["Electrical"],
        },
        {
          name: "GMDSS Reserve Battery Banks & Smart Chargers",
          primaryDiscipline: "Radio & Bridge",
          serviceRoute: "/services/radio-equipment",
          scopeSummary:
            "Load testing under Class-mandated discharge duration, automatic AC mains failure changeover, and internal resistance diagnostics.",
          relatedDisciplines: ["Electrical"],
        },
        {
          name: "Emergency Beacons & Bridge Equipment (EPIRB / SART / NAVTEX)",
          primaryDiscipline: "Radio & Bridge",
          serviceRoute: "/services/radio-equipment",
          scopeSummary:
            "Hydrostatic release unit expiration verification, 406MHz transmission decoding, radar SART response check, and Class survey preparation.",
          relatedDisciplines: ["Safety", "Automation"],
        },
      ],
    },
  ],
  crossDisciplineScenarios: [
    {
      id: "generator-trip",
      title: "Generator Trip & Synchronization Failure",
      observedSymptom:
        "Auxiliary generator fails to take load during parallel connection or trips unexpectedly on under-voltage / reverse power.",
      disciplinesInvolved: [
        {
          name: "Mechanical",
          code: "01",
          role: "Inspect fuel rack movement, governor speed response, and fuel line pressure stability.",
          route: "/services/mechanical",
        },
        {
          name: "Electrical",
          code: "02",
          role: "Test AVR excitation, rotating rectifier diodes, and breaker ACB trip coils.",
          route: "/services/electrical",
        },
        {
          name: "Automation",
          code: "03",
          role: "Verify PMS phase angle matching, synchro-check relay signals, and load-sharing bias.",
          route: "/services/automation",
        },
      ],
      integratedResolution:
        "ME Group provides cross-discipline engineers capable of evaluating the prime-mover governor, the generator excitation circuit, and the PMS synchronization loop simultaneously, isolating the true failure point.",
    },
    {
      id: "compressor-slow-charge",
      title: "Marine Air Compressor Charging Degradation",
      observedSymptom:
        "Air receiver charging time doubles; compressor trips on motor thermal overload or relief valve lifts.",
      disciplinesInvolved: [
        {
          name: "Pneumatics",
          code: "04",
          role: "Inspect valve plates for carbon buildup, check unloader valve seats, and test air dryer dewpoint.",
          route: "/services/pneumatic",
        },
        {
          name: "Mechanical",
          code: "01",
          role: "Measure cylinder liner wear, check piston ring gap clearances, and inspect drive coupling.",
          route: "/services/mechanical",
        },
        {
          name: "Electrical",
          code: "02",
          role: "Measure electric drive motor current per phase, inspect starter contactor contacts, and check Megger.",
          route: "/services/electrical",
        },
      ],
      integratedResolution:
        "Our team tackles the pneumatic valve assembly, mechanical ring clearances, and motor starter current draw in one unified intervention.",
    },
    {
      id: "cooling-overheat",
      title: "Engine Jacket Water Over-Temperature Alarm",
      observedSymptom:
        "Propulsion engine slows down due to high cooling water temperature alarm; actual temperature fluctuating.",
      disciplinesInvolved: [
        {
          name: "Mechanical",
          code: "01",
          role: "Check seawater pump impeller wear rings, inspect cooling line thermostatic mixing valve element.",
          route: "/services/mechanical",
        },
        {
          name: "Automation",
          code: "03",
          role: "Calibrate PT100 temperature sensor, test transmitter 4-20mA loop, verify AMS alarm trip point.",
          route: "/services/automation",
        },
      ],
      integratedResolution:
        "By verifying both the physical cooling flow and the instrumentation sensor loop, we ensure false alarms are distinguished from genuine heat-exchange restrictions.",
    },
    {
      id: "gmdss-power-ams-fault",
      title: "GMDSS Station Power Loss & Bridge AMS Communication Interlock",
      observedSymptom:
        "Bridge GMDSS console loses AC mains supply without automatic transfer to reserve batteries, triggering intermittent communication alarms on the wheelhouse Alarm & Monitoring System (AMS).",
      disciplinesInvolved: [
        {
          name: "Radio & Bridge",
          code: "08",
          role: "Inspect GMDSS radio console power input, test DC-DC converters, and measure RF transceiver output power under battery backup.",
          route: "/services/radio-equipment",
        },
        {
          name: "Electrical",
          code: "02",
          role: "Trace emergency switchboard (ESB) feeder breaker, inspect automatic transfer switch (ATS) contacts, and test battery charger float/boost voltages.",
          route: "/services/electrical",
        },
        {
          name: "Automation",
          code: "03",
          role: "Interrogate wheelhouse AMS diagnostic buffer, verify digital alarm contact telemetry loop, and eliminate grounding noise on bridge serial data bus.",
          route: "/services/automation",
        },
      ],
      integratedResolution:
        "ME Group deploys specialists who understand the critical interplay between emergency switchboards, automated alarm monitoring loops, and sensitive bridge communication hardware, ensuring regulatory compliance and uninterrupted navigation safety.",
    },
  ],
  seoTitle: "Marine Capabilities & Equipment Matrix | ME Group",
  seoDescription:
    "Explore ME Group's confirmed technical capabilities across marine main engines, diesel generators, switchboards, PLCs, pumps, pneumatic compressors, and GMDSS bridge radio communications.",
};
