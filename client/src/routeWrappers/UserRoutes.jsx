/*
React Component that contains all routes related to username 
and passwords.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import { Route,Routes } from "react-router";
import Login from "../routeComponents/User/Login";
import Register from "../routeComponents/User/Register";
import UpdatePassword from "../routeComponents/User/UpdatePassword";
import UpdateUsername from "../routeComponents/User/UpdateUsername";
import NotFound from "../routeComponents/Info/NotFound";

const UserRoutes = () => {
  return(
    <>
    <Routes>
  <Route path = 'login' element = {<Login/>}/>
  <Route path = 'register' element = {<Register/>}/>
  <Route path = 'updateUsername' element = {<UpdateUsername/>}/>
  <Route path = 'updatePassword' element = {<UpdatePassword/>}/> 
  <Route path = "*" element = {<NotFound />}/>
    </Routes>
    </>
  )
}

export default UserRoutes;