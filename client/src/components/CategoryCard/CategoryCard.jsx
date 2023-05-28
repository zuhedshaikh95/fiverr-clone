import { Link } from 'react-router-dom';
import './CategoryCard.scss';

const Card = (props) => {
  const { data } = props;

  return (
    <Link to={`/gigs?category=${data.slug}`}>
        <div className='cardContainer'>
            <img src={data.img} alt={data.title} />
            <span className='desc'>{data.desc}</span>
            <span className='title'>{data.title}</span>
        </div>
    </Link>
  )
}

export default Card