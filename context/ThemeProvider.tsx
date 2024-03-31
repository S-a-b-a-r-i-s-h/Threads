"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
    mode: string;
    setMode: (mode: string) => void;
    color: string;
    setColor: (color: string) => void;
}
  
const ThemeContext = createContext<ThemeContextType  | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState('');
    const [color, setColor] = useState('primary');

    const handleThemeChange = () => {
        if(
            localStorage.theme === 'dark' || 
            (!("theme" in localStorage) && 
            window.matchMedia("(prefers-color-scheme: dark)").matches)
          ) {
            setMode('dark');
            document.documentElement.classList.add('dark');
          } else {
            setMode('light');
            document.documentElement.classList.remove('dark');
          }
    }

    useEffect(() => {
        handleThemeChange();
    }, [mode])

    // const handleColorChange = () => {
    //     if(
    //         localStorage.color === 'dark' || 
    //         (!("theme" in localStorage) && 
    //         window.matchMedia("(prefers-color-scheme: dark)").matches)
    //       ) {
    //         setMode('dark');
    //         document.documentElement.classList.add('dark');
    //       } else {
    //         setMode('light');
    //         document.documentElement.classList.remove('dark');
    //       }
    // }

    // useEffect(() => {
    //     handleThemeChange();
    // }, [color])
    return (
        <ThemeContext.Provider value={{ mode, setMode,color,setColor }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
  
    if(context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider')
    }
  
    return context;
  }