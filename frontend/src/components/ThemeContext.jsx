import React, { useEffect } from "react";

export const ThemeContext = React.createContext({});

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = React.useState((
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) ? 'dark' : 'light');

  useEffect(() => {

    if(theme === 'dark')
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.contains('dark') && document.documentElement.classList.remove('dark');

    localStorage.theme = theme;
      
  },[theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}