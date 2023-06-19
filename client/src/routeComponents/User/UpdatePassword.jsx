/*
React Component that allows a user to update their password to their account.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import {useLogin} from '../../hooks/useLogin';

import {useNavigate} from 'react-router';

import './Login.css';

import { updatePassword } from '../../script';

const UpdatePassword = () => {
    const {username} = useLogin();
    let navigate = useNavigate();

    // make the database call to update associated password
    async function updatePass(event){
        event.preventDefault();
        if(username === 'guest'){
            alert('You must be logged in to update your password.');
        }
        const newPass = document.querySelector('#newPass').value;
        const newPass2 = document.querySelector('#newPass2').value;
        if(newPass !== newPass2){
            alert('Your passwords must match.');
        }
        else{
        const data = await updatePassword(username, newPass);
        if(data.updated === 'true'){
            alert('Password successfully updated!');
            navigate('/user/login');
        }
        else{
            alert('Password failed to be updated.');
        }
    }
    }

    return(
        <div className="login-wrapper">
          <div className = 'header'>
            <h1>Update your password here</h1>
          </div>
          <form onSubmit = {updatePass}>
            <div className = 'password'>
              <label>
                <p>New Password</p>
                <input type = 'text' id = 'newPass' required />
              </label>
            </div>
            <div className = 'password'>
              <label>
                <p>Please re-enter your new password</p>
                <input type = 'text' id = 'newPass2' required />
              </label>
            </div>
            <div className = 'submit'>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div> 
      );
    }


export default UpdatePassword;