import type { Distortion } from "../types";

export const distortions: Distortion[] = [
  { label: "All-or-Nothing Thinking" },
  { label: "Overgeneralization" },
  { label: "Mental Filter" },
  { label: "Disqualifying the Positive" },
  { label: "Jumping to Conclusions" },
  { label: "Magnification / Catastrophizing" },
  { label: "Emotional Reasoning" },
  { label: "Should Statements" },
  { label: "Labeling and Mislabeling" },
  { label: "Personalization and Blame" },
];

export function getDistortions(selection: number[]): string[] {
  return distortions.filter((_, i) => selection[i] === 1).map((d) => d.label);
}
