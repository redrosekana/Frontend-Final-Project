// import library
import React, { createContext } from "react";

// declare interface
export interface Context {
  isScopeProfile: boolean;
  setIsScopeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Store = createContext<Context | null>(null);
