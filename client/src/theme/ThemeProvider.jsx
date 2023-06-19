/*
React component that wraps child components with state and setter for theme information
so that useTheme hook can be used in the child components.

@author Lucas Liang
@version 1.0
@since 16 June 2023
*/

import { ThemeContext } from "./ThemeContext";

import { useState, useEffect} from "react";

import { loadTheme } from "./loadTheme";


export const ThemeProvider = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
        loadTheme(isDarkMode);
    };
    useEffect(() => {
        loadTheme(isDarkMode);
      }, [isDarkMode]);

    return(
        <ThemeContext.Provider value = {{isDarkMode, toggleDarkMode}}>
            { children }
        </ThemeContext.Provider>
    )   
} 
