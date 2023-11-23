import { createContext } from "react";

// types
import { ContextType } from "../types/ContextTypes";

export const Store = createContext<ContextType | null>(null);
