import toast from 'react-hot-toast';
import { useEffect, useReducer, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { gigReducer, initialState } from '../../reducers/gigReducer';
import { cards } from '../../data';
import { axiosFetch, generateImageURL } from '../../utils';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';
import './Add.scss';

const Add = () => {
  const user = useRecoilValue(userState);
  const [state, dispatch] = useReducer(gigReducer, initialState);
  const [coverImage, setCoverImage] = useState(null);
  const [gigImages, setGigImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const mutation = useMutation({
    mutationFn: (gig) =>
      axiosFetch.post('/gigs', gig)
      .then(({data}) => {
        return data;
      })
      .catch(({response}) => {
        toast.error(response.data.message);
      })
    ,
    onSuccess: () => 
      queryClient.invalidateQueries(['my-gigs'])
  })

  const handleFormCange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name, value }
    })
  }

  const handleFormFeature = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_FEATURE',
      payload: event.target[0].value
    })
    event.target.reset();
  }

  const handleImageUploads = async () => {
    try {
      setUploading(true);
      const cover = await generateImageURL(coverImage);
      const images = await Promise.all(
        [...gigImages].map(async (img) => await generateImageURL(img))
      )
      dispatch({
        type: 'ADD_IMAGES',
        payload: { cover: cover.url, images: images.map((img) => img.url) }
      })
      setUploading(false);
      setDisabled(true);
    }
    catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = {...state, userID: user._id}
    for(let key in form) {
      if(form[key] === '' || form[key].length === 0) {
        toast.error('Please fill input field: ' + key);
        return;
      }
    }
    toast.success("Congratulations! You're on the market!")
    mutation.mutate(form);
    setTimeout(() => {
      navigate('/my-gigs');
    }, 2000);
  }

  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input name='title' type="text" placeholder="e.g. I will do something I'm really good at" onChange={handleFormCange} />

            <label htmlFor="">Category</label>
            <select name="category" onChange={handleFormCange}>
              <option value=''>Category</option>
              {
                cards.map((item) => (
                  <option key={item.id} value={item.slug}>{item.slug[0].toUpperCase() + item.slug.slice(1)}</option>
                ))
              }
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input type="file" accept='image/*' onChange={(event) => setCoverImage(event.target.files[0])} />
                <br />
                <label htmlFor="">Upload Images</label>
                <input type="file" accept='image/*' multiple onChange={(event) => setGigImages(event.target.files)} />
              </div>
              <button disabled={!!disabled} onClick={handleImageUploads}>{uploading ? 'uploading' : disabled ? 'Uploaded' : 'upload'}</button>
            </div>

            <label htmlFor="">Description</label>
            <textarea name='description' cols="30" rows="16" placeholder='Brief descriptions to introduce your service to customers' onChange={handleFormCange}></textarea>
            <button onClick={handleFormSubmit}>Create</button>
          </div>

          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" name='shortTitle' placeholder='e.g. One-page web design' onChange={handleFormCange} />

            <label htmlFor="">Short Description</label>
            <textarea name='shortDesc' cols="30" rows="10" placeholder='Short description of your service' onChange={handleFormCange}></textarea>

            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name='deliveryTime' min='1' onChange={handleFormCange} />

            <label htmlFor="">Revision Number</label>
            <input type="number" name='revisionNumber' min='1' onChange={handleFormCange} />

            <label htmlFor="">Add Feature</label>
            <form className='add' onSubmit={handleFormFeature}>
              <input type="text" placeholder='e.g. page design' onChange={handleFormCange} />
              <button type='submit'>Add</button>
            </form>
            <div className="addedFeatures">
              {
                state.features?.map((feature) => (
                  <div key={feature} className="item">
                    <button onClick={() => dispatch({ type: 'REMOVE_FEATURE', payload: feature })}>{feature}
                      <span>X</span>
                    </button>
                  </div>
                ))
              }
            </div>
            <label htmlFor="">Price</label>
            <input name='price' type="number" min='1' onChange={handleFormCange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add