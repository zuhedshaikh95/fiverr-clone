import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = (props) => {
  const { data } = props;

  return (
    <Link to='/gigs?category=design'>
        <div className='cardContainer'>
            <img src={data.img} alt={data.title} />
            <span className='desc'>{data.desc}</span>
            <span className='title'>{data.title}</span>
        </div>
    </Link>
  )
}

export default Card