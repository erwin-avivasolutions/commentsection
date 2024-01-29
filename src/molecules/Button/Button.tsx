import { clsx } from "clsx";
import "./Button.scss";

type ButtonProps = {
  text: string;
  type: "primary" | "secondary" | "tertiary";
  onClick: () => void;
};

export function Button({ text, type, onClick }: ButtonProps) {
  const buttonClass = clsx("button", type);

  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}
