import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='footer'>
        <p>Copyright &copy; 2022</p>
        <Link to='./about'>
          <span>About</span>
        </Link>
    </footer>
  )
}

export default Footer