
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-title">
                <h2>Dashboard</h2>
                <p>Welcome back! Here's what's happening with your inventory.</p>
            </div>

            <div className="navbar-actions">
                <button className="notification-btn">♧</button>

                <div className="navbar-date">
                    {new Date().toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    })}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
