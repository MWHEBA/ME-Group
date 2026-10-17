/** Content status — see docs/CONTENT_MODEL.md §1. */
export type ContentStatus =
  "confirmed" | "needs-confirmation" | "development-sample";

export interface Gated {
  status: ContentStatus;
  note?: string;
}

export type MediaSlotId =
  | "vessel-exterior"
  | "engine-room"
  | "engineer-at-work"
  | "generator"
  | "switchboard"
  | "control-panel-plc"
  | "pneumatic-equipment"
  | "pump-machinery"
  | "technical-inspection"
  | "spare-parts"
  | "bridge-radio-equipment";

/** Temporary media must be "development-media" and is never ME Group work. */
export type MediaProvenance = "development-media" | "me-group-confirmed";

export interface MediaSlot {
  id: MediaSlotId;
  label: string;
  /** CSS aspect-ratio, e.g. "16 / 9". */
  aspect: string;
  provenance: MediaProvenance;
  /** Path under /public. Empty until media is supplied. */
  src?: string;
  alt: string;
  credit?: string;
}
