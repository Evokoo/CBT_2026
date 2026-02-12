import { For } from "solid-js";
import { distortions } from "../data/distortions";
import type { DistortionButtonsProps } from "../types";

export function DistortionButtons({
  selection,
  setSelection,
}: DistortionButtonsProps) {
  function toggleSelection(index: number) {
    setSelection((prev) => {
      const copy = [...prev];
      copy[index] = copy[index] === 0 ? 1 : 0;
      return copy;
    });
  }

  return (
    <div id="DistortionBlock">
      <For each={distortions}>
        {(e, i) => (
          <button
            classList={{ selected: selection()[i()] === 1 }}
            onClick={() => toggleSelection(i())}
          >
            {e.label}
          </button>
        )}
      </For>
    </div>
  );
}
