import type { TextareaProps } from "../types";
import $ from "./Textarea.module.scss";
import Icon from "./Icon";

export function Textarea(props: TextareaProps) {
  return (
    <div class={$.container}>
      <div class={$.topRow}>
        <h5>{props.title}</h5>
        <Icon symbol="help" class={$.icon} />
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
