import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../../utils';
import './Register.scss'

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { url } = await handleGenerateImageURL(image);
      const { data } = await axiosFetch.post('/auth/register', {...formInput, image: url });
      console.log(data);
      navigate('/login');
    }
    catch({response}) {
      console.log(response.data);
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

  const handleGenerateImageURL = async (image) => {
    const file = new FormData();
    file.append('file', image);
    file.append('upload_preset', 'Fiverr');

    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dtrlrppzk/image/upload', file);
    return data;
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
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="India"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
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
            name="desc"
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