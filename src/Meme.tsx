import React from "react";
import { Template } from "./services/types";

interface Props {
  template: Template;
  onClick(): void;
}

export const Meme = ({ template, onClick }: Props) => {
  return (
    <img
      style={{ width: 200 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
  );
};
