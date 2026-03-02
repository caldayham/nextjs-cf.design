'use client'
import { createContext, useContext } from 'react'

interface ShellContextValue {
  openInquiry: () => void
}

export const ShellContext = createContext<ShellContextValue>({
  openInquiry: () => {},
})

export const useShell = () => useContext(ShellContext)
