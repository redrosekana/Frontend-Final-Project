import React from "react";

export interface CheckListTypes {
  title: string;
  icon: string | React.ReactNode;
  checked: boolean;
  onClick: () => void;
  checkTooltip: string;
}
