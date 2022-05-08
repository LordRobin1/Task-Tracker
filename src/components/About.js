import { Link } from "react-router-dom"
import { FaArrowLeft } from 'react-icons/fa'

const About = () => {
  return (
    <div className='about'>
        <Link to='/' style={{ marginRight: '10px'}}>
          <FaArrowLeft className='icon'/>
        </Link>
        <h4>Version 1.0.0</h4>
    </div>
  )
}

export default About