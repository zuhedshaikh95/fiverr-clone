import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import './Register.scss'

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: '',
    description: '',
    isSeller: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let key in formInput) {
      if (formInput[key] === '') {
        toast.error('Please fill all input field: ' + key);
        return;
      }
      else if (key === 'phone' && formInput[key].length < 9) {
        toast.error('Enter valid phone number!');
        return;
      }
    }

    setLoading(true);
    try {
      const { url } = await generateImageURL(image);
      const { data } = await axiosFetch.post('/auth/register', { ...formInput, image: url });
      toast.success('Registration successful!');
      setLoading(false);
      navigate('/login');
    }
    catch ({ response }) {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormInput({
      ...formInput,
      [name]: inputValue
    });
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(event) => setImage(event.target.files[0])} />
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
        </div>
        <div className="right">
          <p>Already have an account? <Link to='/login'>Signin</Link></p>
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" name='isSeller' onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 1234 567 890"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  )
}

export default Register