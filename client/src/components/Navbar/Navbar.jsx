import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setShowMenu(true) : setShowMenu(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    }
  }, []);

  const currentUser = {
    id: 1,
    username: 'Zuhed',
    isSeller: true
  }

  const menuLinks = [
    { path: '/', name: 'Graphics & Design' },
    { path: '/', name: 'Video & Animation' },
    { path: '/', name: 'Writing & Translation' },
    { path: '/', name: 'AI Services' },
    { path: '/', name: 'Digital Marketing' },
    { path: '/', name: 'Music & Audio' },
    { path: '/', name: 'Programming & Tech' },
    { path: '/', name: 'Business' },
    { path: '/', name: 'Lifestyle' },
  ];
  
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
          <span>Sign in</span>
          {currentUser.isSeller && <span>Become a Seller</span>}
          {!currentUser.username && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={() => setShowPanel(!showPanel)}>
              <img src="https://pps.whatsapp.net/v/t61.24694-24/323127423_193998219977054_9044585490817061228_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdSMTgNgIsdQCn6ith4BISu4_KjZ5MZw_MQYvZwIa08MWg&oe=641ECCF7" alt="" />
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
                  <Link className="link" to='/'>Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(showMenu || pathname !== '/') && <>
        <hr />
        <div className="menu">
          {
            menuLinks.map(({path, name}) => (
              <Link className='link' to={path}>{name}</Link>
            ))
          }
        </div>
      </>}
    </nav>
  );
};
 
export default Navbar;
