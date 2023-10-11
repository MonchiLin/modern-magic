import { createContext, useContext, useMemo, useState } from "react";

const THEMES = {
  light: {
    text: '#145f32',
    cardBGColor: "#ffb002",
  },
  dark: {
    text: '#ffffff',
    cardBGColor: "#145f32",
  }
}

const themeValue = {
  theme: THEMES.light,
  toggleTheme: () => null,
  mode: "light",
}

const ThemeContext = createContext(themeValue)

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = (props) => {
  const [mode, setMode] = useState("light")

  const theme = useMemo(() => {
    return mode === "light" ? THEMES.light : THEMES.dark
  }, [mode])

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  return <ThemeContext.Provider {...props} value={{theme, toggleTheme, mode}}/>
}
