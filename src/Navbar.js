import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Extinct Animal Tracker</a>
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
