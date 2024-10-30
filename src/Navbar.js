export default function Navbar() {
    return ( 
        <nav className="nav">
        <a href="/" className="site-title">Extinct Animal Tracker</a>
        <ul className="active">
            <li>
                <a href="/pricing">Pricing</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>

            
        </ul>

    </nav>
    );
}