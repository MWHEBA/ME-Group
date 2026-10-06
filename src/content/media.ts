import type { MediaSlot, MediaSlotId } from "./types";

/**
 * Development media slots. Architecture only — no assets are supplied yet.
 * Every temporary item is "development-media" and must never be presented as
 * ME Group's actual work. Replace with "me-group-confirmed" media when supplied.
 */
const slot = (id: MediaSlotId, label: string, aspect = "4 / 3"): MediaSlot => ({
  id,
  label,
  aspect,
  provenance: "development-media",
  alt: "",
});

export const mediaSlots: Record<MediaSlotId, MediaSlot> = {
  "vessel-exterior": slot("vessel-exterior", "Vessel exterior", "16 / 9"),
  "engine-room": slot("engine-room", "Engine room", "16 / 9"),
  "engineer-at-work": slot("engineer-at-work", "Marine engineer working"),
  generator: slot("generator", "Generator"),
  switchboard: slot("switchboard", "Switchboard"),
  "control-panel-plc": slot("control-panel-plc", "Control panel / PLC"),
  "pneumatic-equipment": slot("pneumatic-equipment", "Pneumatic equipment"),
  "pump-machinery": slot("pump-machinery", "Pump / machinery"),
  "technical-inspection": slot("technical-inspection", "Technical inspection"),
  "spare-parts": slot("spare-parts", "Spare parts"),
};

export const isDevelopmentMedia = (m: MediaSlot) =>
  m.provenance === "development-media";
