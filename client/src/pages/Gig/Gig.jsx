import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosFetch, getCountryFlag } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import { Loader, NextArrow, PrevArrow, Reviews } from '../../components';
import './Gig.scss';

import { CarouselProvider, Slider, Slide, ImageWithZoom, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

  const country = getCountryFlag(data?.userID.country);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="gig">
      {
        isLoading
          ? <div className='loader'> <Loader /> </div>
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
                
                <CarouselProvider
                  naturalSlideHeight={100}
                  naturalSlideWidth={125}
                  totalSlides={data?.images.length}
                  infinite
                  className='slider'
                >
                  <Slider >
                    {
                      data.images.map((img) => (
                        <Slide key={img}>
                          <Image key={img} src={img} alt='' />
                        </Slide>
                      ))
                    }
                  </Slider>

                    <ButtonBack>
                      <PrevArrow />
                    </ButtonBack>

                    <ButtonNext>
                      <NextArrow />
                    </ButtonNext>

                </CarouselProvider>

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
                        <span className="desc">{data?.userID.country}
                          <span className='flag'>
                          <img src={country.normal} alt="" />
                          </span>
                        </span>
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