import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../../utils';
import { useRecoilState } from 'recoil';
import { userState } from '../../../atoms';
import './Login.scss';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    for(let key in formInput) {
      if(formInput[key] === '') {
        toast.error('Please fill all input fields: ' + key);
        return;
      }
    }

    setLoading(true);
    try {
      const { data } = await axiosFetch.post('/auth/login', formInput);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃"
      });
      navigate('/');
    }
    catch ({ response: { data } }) {
      setError(data.message);
      toast.error(data.message, {
        duration: 3000,
      });
    }
    finally {
      setLoading(false);
      setError(null);
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
        <button disabled={loading} type='submit'>{ loading ? 'Loading' : 'Login' }</button>
        <span>{error && error}</span>
      </form>
    </div>
  )
}

export default Login