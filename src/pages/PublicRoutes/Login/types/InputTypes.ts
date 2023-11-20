import React from "react";

export interface TextInputProps {
  type: string;
  placeholder?: string;
  value: string;
  onInput: (ev: React.FormEvent<HTMLInputElement>) => void;
}
