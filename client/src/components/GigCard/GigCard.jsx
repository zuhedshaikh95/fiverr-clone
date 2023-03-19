import React from 'react';
import { Link } from 'react-router-dom';
import './GigCard.scss';

const GigCard = (props) => {
    const { data } = props;

  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={data.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={data.pp} alt="" />
            <span>{data.username}</span>
          </div>
          <p>{data.desc}</p>
          <div className="star">
            <img src="./media/star.png" alt="" />
            <span>{data.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./media/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {data.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GigCard