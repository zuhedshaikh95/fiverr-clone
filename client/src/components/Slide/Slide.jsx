import React from 'react';
import Slider from 'infinite-react-carousel';

import './Slide.scss';

const Slide = (props) => {
  const { slidesToShow, children } = props;

  return (
    <div className='slide'>
        <div className="container">
            <Slider slidesToShow={slidesToShow}>
              {children}
            </Slider>
        </div>
    </div>
  )
}

export default Slide;