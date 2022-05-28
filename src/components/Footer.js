import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='footer'>
        <p style={{fontSize: '2vh',
        marginBottom: '1.25vh'}}>Copyright &copy; 2022</p>
        <Link to='./about'>About</Link>
    </footer>
  )
}

export default Footer