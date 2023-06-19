/*
React Component that allows a user to login to the app.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/


import {useNavigate} from 'react-router';
import './Login.css'
import { checkCredentials, deleteUser} from '../../script';
import {useLogin} from '../../hooks/useLogin';

const Login = () => {

  let navigate = useNavigate();
  const {username, setUsername} = useLogin();

  function navRegister(event){
      navigate('/user/register');
  }

  // check database for username and password combination
  async function verifyUser(event){
    event.preventDefault();
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    const data = await checkCredentials(username, password);
    if(data.login === 'successful'){
      setUsername(username);
      alert(`Welcome ${username}!`);
      navigate('/');
    }
    else{
      alert('Username or password invalid');
    }
  }

  // find username and delete the associated account
  async function deleteAccount(event){
    event.preventDefault();
    if (username === 'guest'){
      alert('You are not signed in so your account cannot be deleted.');
    }
    else{
      const response = await deleteUser(username);
      if (response.deleted === 'true'){
        alert('Account successfully deleted');
      }
      else{
        alert('Failed to delete account');
      }
    }
  }

  function navUsername(event){
      navigate('/user/updateUsername');
  }

  function navPassword(event){
    navigate('/user/updatePassword');
  }

    return(
      <div className="login-wrapper">
        <div className = 'header'>
          <h1>Please Log In</h1>
        </div>
        <form onSubmit = {verifyUser}>
          <div className = 'username'>
            <label>
              <p>Username</p>
              <input type="text"  id = 'user' required />
            </label>
            </div>
          <div className = 'password'>
            <label>
              <p>Password</p>
              <input type="password" id = 'pass' required />
            </label>
          </div>
          <div className = 'submit'>
            <button type="submit">Submit</button>
          </div>
        </form>
          <p> Don't have an account?</p>
          <button onClick = {navRegister}>Register</button>
          <p> Looking to delete your account?</p>
          <button onClick = {deleteAccount}>Delete</button>
          <p> Looking to update your username?</p>
          <button onClick = {navUsername}>Update Username</button>
          <p> Need to update your username?</p>
          <button onClick = {navPassword}>Update Password</button>
      </div> 
    );
  }

export default Login;