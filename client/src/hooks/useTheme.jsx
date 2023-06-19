/*
Custom React Hook that uses useContext and ThemeContext to shorten 
imports in components that need login information.

@author Lucas Liang
@version 1.0
@since 16 June 2023
*/


import { ThemeContext } from "../theme/ThemeContext";

import { useContext } from "react";

export const useTheme = () => {
    return (useContext(ThemeContext)); 
}