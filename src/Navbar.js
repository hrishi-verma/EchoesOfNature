export default function Navbar() {
    return ( 
        <nav className="nav">
        <a href="/" className="site-title">Site Name</a>
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