import { Link } from "react-router-dom"
// import { FaArrowLeft } from 'react-icons/fa'

const About = () => {
  return (
    <div className='about'>
        <Link to='/' style={{ marginRight: '15px', textDecoration: 'none'}}>
          {/* <FaArrowLeft className='icon'/> */}
          <div className='icon' style={{ scale: '1.5' }}>⬅</div>
        </Link>
        <h3>Version 0.1.4</h3>
    </div>
  )
}

export default About