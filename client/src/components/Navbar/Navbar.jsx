import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { axiosFetch, getCurrentUser } from "../../utils";
import "./Navbar.scss";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    }
  }, []);

  const currentUser = getCurrentUser();

  const menuLinks = [
    { path: '/', name: 'Graphics & Design' },
    { path: '/', name: 'Video & Animation' },
    { path: '/', name: 'Writing & Translation' },
    { path: '/', name: 'AI Services' },
    { path: '/', name: 'Digital Marketing' },
    { path: '/', name: 'Music & Audio' },
    { path: '/', name: 'Programming & Tech' },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <GrFormPrevious />,
    nextArrow: <GrFormNext />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

  const handleLogout = async () => {
    try {
      await axiosFetch.post('/auth/logout');
      localStorage.removeItem('currentUser');
      navigate('/');
    }
    catch({response}) {
      console.log(response.data);
    }
  }
  
  return (
    <nav className={showMenu || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo"> 
          <Link to='/' className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span><Link to='/login' className="link">Sign in</Link></span>
          {!currentUser.isSeller && <span>Become a Seller</span>}
          {!currentUser.username && <button className={showMenu || pathname !== '/' ? 'join-active' : ''}><Link to='/register' className="link">Join</Link></button>}
          {currentUser.username && (
            <div className="user" onClick={() => setShowPanel(!showPanel)}>
              <img src={currentUser.image || '/media/noavatar.png'} />
              <span>{currentUser?.username}</span>
              {showPanel && (
                <div className="options">
                  {
                    currentUser?.isSeller && (
                      <>
                        <Link className="link" to='/my-gigs'>Gigs</Link>
                        <Link className="link" to='/organize'>Add New Gig</Link>
                      </>
                    )
                  }
                  <Link className="link" to='/orders'>Orders</Link>
                  <Link className="link" to='/messages'>Messages</Link>
                  <Link className="link" to='/' onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(showMenu || pathname !== '/') && <>
        <hr />
        <Slider className="menu" {...settings}>
          {
            menuLinks.map(({path, name}) => (
              <div key={name} className="menu-item">
                <Link className='link' to={path}>{name}</Link>
              </div>
            ))
          }
        </Slider>
      </>}
    </nav>
  );
};
 
export default Navbar;
