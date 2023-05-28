import { Link } from 'react-router-dom';
import './GigCard.scss';

const GigCard = (props) => {
    const { data } = props;

  return (
    <Link to={`/gig/${data._id}`} className="link">
      <div className="gigCard">
        <img src={data.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={data.userID.image || './media/noavatar.png'} alt="" />
            <span>{data.userID.username}</span>
          </div>
          <p>{data.title}</p>
          <div className="star">
            <img src="./media/star.png" alt="" />
            <span>{Math.round(data.totalStars / data.starNumber) || 0}</span>
            <span className='totalStars'>({data.starNumber})</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./media/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              {data.price.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'INR',
              })}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GigCard