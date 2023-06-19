/*
Wraps child components with state and setter for login information
so that useLogin hook can be used in the children components.

@author Lucas Liang
@version 1.0
@since 16 June 2023
*/


import { LoginContext } from "./LoginContext";

import { useState } from "react";

export const LoginProvider = ({children}) => {
    const [username, setUsername] = useState('guest');
    return(
        <LoginContext.Provider value = {{username, setUsername}}>
            {children}
        </LoginContext.Provider>
    )
}
