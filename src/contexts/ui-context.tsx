import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface UIContextType {
  screenWidth: number
}

const defaultState: UIContextType = {
  screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
}

const UIContext = createContext<UIContextType>(defaultState)

export const useUI = () => useContext(UIContext)

interface UIProviderProps {
  children: ReactNode
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(
    defaultState.screenWidth,
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth)
      }, 150)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <UIContext.Provider value={{ screenWidth }}>{children}</UIContext.Provider>
  )
}
