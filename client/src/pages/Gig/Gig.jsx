import React, { useEffect } from 'react';
import { Slider } from 'infinite-react-carousel';
import { useQuery } from '@tanstack/react-query';
import { axiosFetch } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import { Reviews } from '../../components';
import toast from 'react-hot-toast';
import './Gig.scss';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const Gig = () => {
  const { _id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
        axiosFetch.get(`/gigs/single/${_id}`)
        .then(({ data }) => {
          data.images.unshift(data.cover);
            return data;
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        })
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="gig">
      {
        isLoading
          ? '...loading'
          : error
            ? 'Something went wrong!'
            : <div className="container">
              <div className="left">
                <span className="breadcrumbs">Liverr Graphics & Design</span>
                <h1>{data?.title}</h1>
                <div className="user">
                  <img
                    className="pp"
                    src={data?.userID?.image || '/media/noavatar.png'}
                    alt=""
                  />
                  <span>{data?.userID.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {
                        new Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/media/star.png" key={i} />
                          ))}
                      <span>{(data.totalStars / data.starNumber).toFixed(1)}</span>
                    </div>
                  )
                  }
                </div>
                <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                  {
                    data.images.map((img) => (
                      <img key={img} src={img} alt='' />
                    ))
                    ||
                    <img
                      src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                  }
                </Slider>
                <div className="right-mobile">
                  <div className="price">
                    <h3>{data?.shortTitle}</h3>
                    <h2>{data?.price.toLocaleString('en-IN', {
                      maximumFractionDigits: 0,
                      style: 'currency',
                      currency: 'INR',
                    })}</h2>
                  </div>
                  <p>
                    {data?.shortDesc}
                  </p>
                  <div className="details">
                    <div className="item">
                      <img src="/img/clock.png" alt="" />
                      <span>{data.deliveryTime} days Delivery</span>
                    </div>
                    <div className="item">
                      <img src="/img/recycle.png" alt="" />
                      <span>{data.revisionNumber} Revisions</span>
                    </div>
                  </div>
                  <div className="features">
                    {
                      data?.features.map((feature) => (
                        <div key={feature} className="item">
                          <img src="/img/greencheck.png" alt="" />
                          <span>{feature}</span>
                        </div>
                      ))
                    }
                  </div>
                  <Link to={`/pay/${_id}`}>
                    <button>Continue</button>
                  </Link>
                </div>
                <h2>About This Gig</h2>
                <p>
                  {
                    data.description
                  }
                </p>
                <div className="seller">
                  <h2>About The Seller</h2>
                  <div className="user">
                    <img
                      src={data?.userID?.image || '/media/noavatar.png'}
                      alt=""
                    />
                    <div className="info">
                      <span>{data?.userID.username}</span>
                      <div className="stars">
                        <img src="/media/star.png" alt="" />
                        <img src="/media/star.png" alt="" />
                        <img src="/media/star.png" alt="" />
                        <img src="/media/star.png" alt="" />
                        <img src="/media/star.png" alt="" />
                        <span>5</span>
                      </div>
                      <button>Contact Me</button>
                    </div>
                  </div>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="desc">{data?.userID.country}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="desc">{MONTHS[new Date(data?.userID.createdAt).getMonth()] + ' ' + new Date(data?.userID.createdAt).getFullYear()}</span>
                      </div>
                      <div className="item">
                        <span className="title">Avg. response time</span>
                        <span className="desc">4 hours</span>
                      </div>
                      <div className="item">
                        <span className="title">Last delivery</span>
                        <span className="desc">1 day</span>
                      </div>
                      <div className="item">
                        <span className="title">Languages</span>
                        <span className="desc">English</span>
                      </div>
                    </div>
                    <hr />
                    <p>
                      {data.userID.description}
                    </p>
                  </div>
                </div>
                <Reviews gigID={_id} />
              </div>
              <div className="right">
                <div className="price">
                  <h3>{data?.shortTitle}</h3>
                  <h2>{data?.price.toLocaleString('en-IN', {
                    maximumFractionDigits: 0,
                    style: 'currency',
                    currency: 'INR',
                  })}</h2>
                </div>
                <p>
                  {data?.shortDesc}
                </p>
                <div className="details">
                  <div className="item">
                    <img src="/img/clock.png" alt="" />
                    <span>{data.deliveryTime} days Delivery</span>
                  </div>
                  <div className="item">
                    <img src="/img/recycle.png" alt="" />
                    <span>{data.revisionNumber} Revisions</span>
                  </div>
                </div>
                <div className="features">
                  {
                    data?.features.map((feature) => (
                      <div key={feature} className="item">
                        <img src="/img/greencheck.png" alt="" />
                        <span>{feature}</span>
                      </div>
                    ))
                  }
                </div>
                <Link to={`/pay/${_id}`}>
                  <button>Continue</button>
                </Link>
              </div>
            </div>
      }
    </div>
  )
}

export default Gig