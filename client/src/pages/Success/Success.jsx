import React, { useEffect } from 'react';
import './Success.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../utils';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  useEffect(() => {
    (async () => {
      try {
        await axiosFetch.patch('/orders', { payment_intent });
        setTimeout(navigate('/orders'), 5000);
      }
      catch ({ response }) {
        console.log(response);
      }
    })();
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className='pay-message'>Payment successful. You are being redirected to the orders page. Please do not close the page</div>
  )
}

export default Success