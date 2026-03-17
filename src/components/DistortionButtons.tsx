import { For } from "solid-js";
import { distortions } from "../data/distortions";
import type { DistortionButtonsProps } from "../types";
import $ from "./DistortionButtons.module.scss";

export function DistortionButtons({
  selection,
  setSelection,
}: DistortionButtonsProps) {
  function toggleSelection(index: number) {
    console.log(index);

    setSelection((prev) => {
      const copy = [...prev];
      copy[index] = copy[index] === 0 ? 1 : 0;
      return copy;
    });
  }

  return (
    <div class={$.distortions}>
      <div>
        <span class={$.title}>Distortions</span>
        <span class={$.icon}>Icon</span>
      </div>
      <div>
        <For each={distortions}>
          {(e, i) => (
            <button
              classList={{ [$.selected]: selection()[i()] === 1 }}
              onClick={() => toggleSelection(i())}
            >
              {e.label}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
