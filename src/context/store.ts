// import library
import { createContext } from "react";

// declare interface
export interface Context {
  displayName: string;
  username: string;
  email: string;
  provider: string;
}

export const Store = createContext<Context | null>(null);
