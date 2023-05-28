import { Link } from 'react-router-dom';
import './ProjectCard.scss';

const ProjectCard = (props) => {
  const { data } = props;

  return (
    <Link className='link' to='/'>
        <div className='projectContainer'>
            <img src={data.img} alt={data.title} />
            <div className="info">
              <img src={data.pp} alt={data.title} />
              <div className="text">
                <h2>{data.cat}</h2>
                <span>{data.username}</span>
              </div>
            </div>
        </div>
    </Link>
  )
}

export default ProjectCard