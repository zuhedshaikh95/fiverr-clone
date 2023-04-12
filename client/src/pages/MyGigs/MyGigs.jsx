import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyGigs.scss';

const MyGigs = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='myGigs'>
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          <Link to='/organize' className='link'>
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
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
                <img className='delete' src="./media/delete.png" alt="delete" />
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
                <img className='delete' src="./media/delete.png" alt="delete" />
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
                <img className='delete' src="./media/delete.png" alt="delete" />
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
                <img className='delete' src="./media/delete.png" alt="delete" />
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
                <img className='delete' src="./media/delete.png" alt="delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyGigs