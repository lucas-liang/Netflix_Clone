/*
React Component that allows a guest to create an account for the app.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import {useNavigate} from 'react-router';
import './Login.css'
import {addUser, checkUsername} from '../../script.js'
const Register = () => {
    
       
      let navigate = useNavigate();

      
      function checkMatchPasswords(){
        const pass = document.getElementById('pass').value;
        const otherPass = document.getElementById('otherPass').value;
        if(pass === otherPass){
          return true;
        }
        return false;
      }

      // check if username is available, if so add to the database
      async function tryAdd(username, password){
        const data = await checkUsername(username);
        if(data.available === 'true'){
          await addUser(username, password);
          navigate('/user/login');
        }
        else{
          alert('Username not available');
          return;
        }
      }

      // see if this username and password can be added to the database
      function checkRegister(event){
        event.preventDefault();
        const username = document.getElementById('user').value;
        if(username === 'guest'){
          alert('guest is a reserved username, try again');
        }
        if(!checkMatchPasswords()){
          alert('Passwords do not match, try again');
          return;
        }
        else{
          const password = document.getElementById('pass').value;
          tryAdd(username, password);
        }
      }
      
        return(
          <div className="login-wrapper">
            <div className = 'header'>
              <h1>Please Register</h1>
            </div>
            <form onSubmit = {checkRegister}>
              <div className = 'username'>
                <label>
                  <p>Username</p>
                  <input type="text" id = 'user' required/>
                </label>
                </div>
              <div className = 'password'>
                <label>
                  <p>Password</p>
                  <input type="password" id = 'pass' required/>
                </label>
              </div>
              <div className = 'password'>
                <label>
                  <p>Please Re-enter your Password</p>
                  <input type="password" id = 'otherPass' required/>
                </label>
              </div>
              <div className = 'submit'>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div> 
        );
      }
    
    export default Register;