import React from 'react';
import { Featured, Slide, TrustedBy } from '../../components';
import { Card } from '../../components';
import { cards } from '../../data';

const Home = () => {
  return (
    <div>
      <Featured />
      <TrustedBy />
      <Slide>
        {
          cards.map((card) => (
            <Card key={card.id} data={card} />
          ))
        }
      </Slide>
    </div>
  )
}

export default Home