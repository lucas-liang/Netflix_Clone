/*
React Component that allows a user to update their username to their account.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import {useLogin} from '../../hooks/useLogin';

import {useNavigate} from 'react-router';

import './Login.css';

import { updateUsername } from '../../script';

const UpdateUsername = () => {
    const {username} = useLogin();
    let navigate = useNavigate();

    async function updateName(event){
        event.preventDefault();
        if(username === 'guest'){
            alert('You must be logged in to update your username.');
        }
        const name = document.querySelector('#user').value;
        if(username !== name){
            alert('You cannot alter a username other than yours.');
        }
        else{
        const newName = document.querySelector('#newUser').value;
        const data = await updateUsername(name, newName);
        if(data.updated === 'true'){
            alert('Username successfully updated!');
            navigate('/user/login');
        }
        else{
            alert('Username is not available');
        }
    }
    }

    return(
        <div className="login-wrapper">
          <div className = 'header'>
            <h1>Update your username here</h1>
          </div>
          <form onSubmit = {updateName}>
            <div className = 'username'>
              <label>
                <p>Old Username</p>
                <input type="text"  id = 'user' required />
              </label>
              </div>
            <div className = 'password'>
              <label>
                <p>New Username</p>
                <input type = 'text' id = 'newUser' required />
              </label>
            </div>
            <div className = 'submit'>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div> 
      );
    }


export default UpdateUsername;