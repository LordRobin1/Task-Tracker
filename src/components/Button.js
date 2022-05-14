import PropTypes from 'prop-types'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

const Button = ({text, onClick, classname, showAdd}) => {
  return (
    <button
      className={`${classname}`}
      onClick={onClick}
    >
      {showAdd ?
        <FaMinusCircle style={{ color: 'grey', marginRight: '7.5px', paddingTop: '2px', scale: '1.4'}}/>
        :
        <FaPlusCircle style={{ color: 'grey', marginRight: '7.5px', paddingTop: '2px', scale: '1.4'}}/>
      }
      {text}
    </button>
  )
}

Button.defaultProps = {
    color: 'black',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button