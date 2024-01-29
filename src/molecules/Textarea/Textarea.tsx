import React, { Dispatch, SetStateAction } from "react";
import "./Textarea.scss";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Textarea({ value, onChange }: TextareaProps) {
  return (
    <textarea
      className="textarea"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      }}
    ></textarea>
  );
}
