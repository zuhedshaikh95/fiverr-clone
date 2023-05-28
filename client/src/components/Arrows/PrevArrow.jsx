import { GrFormPrevious } from 'react-icons/gr';
import './Arrows.scss';

const PrevArrow = (props) => {
    const { onClick } = props;
  
    return (
      <GrFormPrevious className='prev' onClick={onClick} />
    )
}

export default PrevArrow;