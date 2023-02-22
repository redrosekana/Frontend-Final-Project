// import library
import React from "react"
import { createContext } from "react"

// declare interface
export interface DisplayNameContextProps {
    displayName: string
    setDisplayName: React.Dispatch<React.SetStateAction<string>>
}

export const Store = createContext<DisplayNameContextProps | null>(null)