import React, { useState } from 'react';
import { GigCard } from '../../components';
import { gigs } from '../../data';
import './Gigs.scss';

const Gigs = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [sortBy, setSortBy] = useState('sales');

  const handleSortBy = (type) => {
    setSortBy(type);
    setOpenMenu(false);
  }

  return (
    <div className='gigs'>
      <div className="container">
        <span className="breadcrumbs">FIVERR GRAPHICS & DESIGN</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with Fiverr's AI artists</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy'>Sort By</span>
            <span className='sortType'>{sortBy === 'sales' ? 'Best Selling' : 'Newest'}</span>
            <img src="./media/down.png" alt="" onClick={() => setOpenMenu(!openMenu)} />
            {
              openMenu && (<div className="rightMenu">
                {
                  sortBy === 'sales' ? <span onClick={() => handleSortBy('createdAt')}>Newest</span>
                    : <span onClick={() => handleSortBy('sales')}>Best Selling </span>
                }
              </div>)
            }
          </div>
        </div>

        <div className="cards">
          {
            gigs.map((gig) => (
              <GigCard key={gig.id} data={gig} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Gigs