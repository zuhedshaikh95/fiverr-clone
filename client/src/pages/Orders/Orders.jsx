import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { axiosFetch } from '../../utils';
import './Orders.scss';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      axiosFetch.get(`/orders`)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        })
  });

  const handleContact = async (order) => {
    const sellerID = order.sellerID;
    const buyerID = order.buyerID;
    const conversationID = sellerID + buyerID;

    try {
      const { data } = await axiosFetch.get(`/conversations/single/${conversationID}`);
      navigate(`/message/${data.conversation}`);
    }
    catch ({ response }) {
      if (response.status === 404) {
        try {
          const { data } = await axiosFetch.post('/conversations', {
            to: currentUser.isSeller ? buyerID: sellerID
          })
          navigate(`/message/${data.conversation}`);
        }
        catch ({ response }) {
          console.log(response.data);
        }
      }
    }
  }

  return (
    <div className='orders'>
      {
        isLoading
          ? '...loading'
          : error
            ? 'Something went wrong!'
            : <div className="container">
              <div className="title">
                <h1>Orders</h1>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <img
                            className="img"
                            src={order.image}
                            alt=""
                          />
                        </td>
                        <td>{order.title}</td>
                        <td>{order.price}</td>
                        <td>
                          <img className='message' src="./media/message.png" alt="message" onClick={() => handleContact(order)} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
      }
    </div>
  )
}

export default Orders