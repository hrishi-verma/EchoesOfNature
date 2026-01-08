import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Extinct Animal Tracker</Link>
            <ul className="active">
                <li>
                    <Link to="/" >Home Page</Link>
                </li>
                <li>
                    <Link to="/about" >About</Link>
                </li>
            </ul>
        </nav>
    );
}
