import type { TextareaProps } from "../types";
import $ from "./Textarea.module.scss";

export function Textarea(props: TextareaProps) {
  return (
    <div class={$.container}>
      <div class={$.topRow}>
        <h5>{props.title}</h5>
        <span class={$.icon}>Icon</span>
      </div>
      <textarea
        class={$.textarea}
        placeholder={props.placeholder}
        value={props.value()}
        onInput={(e) => props.onInputFn(e.target.value)}
        rows={8}
      />
    </div>
  );
}
