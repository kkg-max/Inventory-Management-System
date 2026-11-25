
import "./Dashboard.css";

function Dashboard() {
    const statistics = [
        {
            title: "Total Products",
            value: "—",
            description: "Products registered"
        },
        {
            title: "Total Quantity",
            value: "—",
            description: "Units in inventory"
        },
        {
            title: "Low Stock",
            value: "—",
            description: "Products needing attention"
        },
        {
            title: "Categories",
            value: "—",
            description: "Product categories"
        }
    ];

    return (
        <div className="dashboard-content">
            <div className="dashboard-heading">
                <div>
                    <h2>Overview</h2>
                    <p>Here's an overview of your inventory.</p>
                </div>

                <button className="add-product-btn">
                    + Add Product
                </button>
            </div>

            <div className="stats-grid">
                {statistics.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <p className="stat-title">{item.title}</p>
                        <h2 className="stat-value">{item.value}</h2>
                        <p className="stat-description">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="dashboard-placeholder">
                <h3>Recent Products</h3>
                <p>Your recently added products will appear here.</p>
            </div>
        </div>
    );
}

export default Dashboard;
