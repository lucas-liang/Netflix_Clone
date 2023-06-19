/*
Custom React Hook that uses useContext and LoginContext to shorten 
imports in components that need login information.

@author Lucas Liang
@version 1.0
@since 16 June 2023
*/

import { LoginContext } from "../login/LoginContext";

import { useContext } from "react";

export const useLogin = () => {
    return (useContext(LoginContext)); 
}