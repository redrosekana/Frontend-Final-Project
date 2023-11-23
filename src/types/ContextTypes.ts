import React from "react";

export interface ContextType {
  isScopeProfile: boolean;
  setIsScopeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}
