import {
  FaRegularCircleQuestion,
  FaRegularEdit,
  FaSolidRemove,
} from "solid-icons/fa";

type IconProps = {
  symbol: "help" | "edit" | "delete";
  class: string;
  onClick?: () => void;
};

export default function Icon(props: IconProps) {
  const className = props.class;

  switch (props.symbol) {
    case "help":
      return (
        <FaRegularCircleQuestion class={className} onClick={props.onClick} />
      );
    case "edit":
      return <FaRegularEdit class={className} onClick={props.onClick} />;
    case "delete":
      return <FaSolidRemove class={className} onClick={props.onClick} />;
    default:
      return null;
  }
}
