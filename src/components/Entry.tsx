//Core
import { For } from "solid-js";
//Data
import { getDistortions } from "../data/distortions";
//Types
import type { EntryProps } from "../types";
//Style
import $ from "./Entry.module.scss";

export function Entry({ entry, onDelete, onEdit }: EntryProps) {
  return (
    <div class={$.entry}>
      <div>
        <h5>Initial Thought</h5>
        <p>{entry.thought}</p>
      </div>

      <div>
        <h5>Distortions</h5>
        <div>
          <For each={getDistortions(entry.distortions)}>
            {(e) => <button>{e}</button>}
          </For>
        </div>
      </div>

      <div>
        <h5>Rational Response</h5>
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
