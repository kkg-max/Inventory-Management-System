
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>Stock<span>Flow</span></h2>
                <p>Inventory Management</p>
            </div>

            <nav className="sidebar-nav">
                <p className="nav-heading">MENU</p>

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>▦</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `nav-link ${isActive ? "active" : ""}`
                    }
                >
                    <span>📦</span>
                    Products
                </NavLink>

                <a href="#" className="nav-link">
                    <span>📊</span>
                    Inventory
                </a>

                <a href="#" className="nav-link">
                    <span>↔</span>
                    Transactions
                </a>

                <p className="nav-heading">GENERAL</p>

                <a href="#" className="nav-link">
                    <span>⚙</span>
                    Settings
                </a>
            </nav>

            <div className="sidebar-footer">
                <div className="user-avatar">K</div>
                <div>
                    <h4>Admin User</h4>
                    <p>Administrator</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
