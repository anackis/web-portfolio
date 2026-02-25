import { createContext, useContext, useState, ReactNode, useMemo } from "react"

interface SectionContextType {
  section: number
  setSection: React.Dispatch<React.SetStateAction<number>>
}

const defaultSectionContext: SectionContextType = {
  section: 0,
  setSection: () => {},
}

const SectionContext = createContext<SectionContextType>(defaultSectionContext)

export const useSection = () => useContext(SectionContext)

interface SectionProviderProps {
  children: ReactNode
}

export const SectionProvider = ({ children }: SectionProviderProps) => {
  const [section, setSection] = useState<number>(0)

  const value = useMemo(() => ({ section, setSection }), [section])

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  )
}
