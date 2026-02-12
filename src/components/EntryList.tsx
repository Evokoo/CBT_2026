//Core
import { For } from "solid-js";
//Data
import { getDistortions } from "../data/distortions";
//Types
import type { EntryListProps } from "../types";
//Style
import $ from "./EntryList.module.scss";

export function EntryList({ entry, onDelete, onEdit }: EntryListProps) {
  return (
    <div class={$.entry}>
      <div>
        <span class={$.title}>Initial Thought</span>
        <p>{entry.thought}</p>
      </div>

      <div>
        <span class={$.title}>Distortions</span>
        <div>
          <For each={getDistortions(entry.distortions)}>
            {(e) => <span>{e}</span>}
          </For>
        </div>
      </div>

      <div>
        <span class={$.title}>Rational Response</span>
        <p>{entry.response}</p>
      </div>

      <div>
        <div>
          <button onClick={() => onEdit(entry.id)}>Edit Entry</button>
          <button onClick={() => onDelete(entry.id)}>Delete Entry</button>
        </div>
        <div>
          <span>Created: {entry.created.toLocaleString()}</span>
          <span>
            {+entry.edited !== +entry.created
              ? `Last Edit: ${entry.edited.toLocaleString()}`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
