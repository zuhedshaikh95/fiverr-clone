import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../../utils';
import './Login.scss';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosFetch.post('/auth/login', formInput);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      navigate('/');
    }
    catch({response}) {
      setError(response.data.message);
    }
  }

  return (
    <div className='login'>
      <form action="" onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input name='username' placeholder='johndoe' onChange={handleFormInput} />

        <label htmlFor="">Password</label>
        <input name='password' type='password' placeholder='password' onChange={handleFormInput} />
        <button type='submit'>Login</button>
        <span>{error && error}</span>
      </form>
    </div>
  )
}

export default Login