import './header.css';
import { Link } from 'react-router-dom';
function Header(){
    return(
        <header>
            <Link className='logo' to='/'>Spike Flix</Link>
            <Link className='liked' to='/liked'>My movies</Link>
        </header>
    )
}

export default Header;