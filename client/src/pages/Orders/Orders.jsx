import React from 'react';
import { Link } from 'react-router-dom';
import './Orders.scss';

const Orders = () => {

  const currentUser = {
    id: 1,
    username: 'John Doe',
    isSeller: true
  }

  return (
    <div className='orders'>
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  className="img"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Gig1</td>
              <td>88</td>
              <td>123</td>
              <td>
                <img className='message' src="./media/message.png" alt="message" />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="img"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Gig1</td>
              <td>88</td>
              <td>123</td>
              <td>
                <img className='message' src="./media/message.png" alt="message" />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="img"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Gig1</td>
              <td>88</td>
              <td>123</td>
              <td>
                <img className='message' src="./media/message.png" alt="message" />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="img"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Gig1</td>
              <td>88</td>
              <td>123</td>
              <td>
                <img className='message' src="./media/message.png" alt="message" />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="img"
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              </td>
              <td>Gig1</td>
              <td>88</td>
              <td>123</td>
              <td>
                <img className='message' src="./media/message.png" alt="message" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders