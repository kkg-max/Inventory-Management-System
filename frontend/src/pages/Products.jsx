
import { useState, useEffect } from "react";
import "./Products.css";
import AddProduct from "../components/AddProduct";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddProduct, setShowAddProduct] = useState(false);


    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/products/allProducts"
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch products");
            }

            setProducts(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const filteredProducts = products.filter((product) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            product.productId.toLowerCase().includes(searchValue) ||
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue)
        );
    });

    return (
        <div className="products-content">
            <div className="products-heading">
                <div>
                    <h2>Products</h2>
                    <p>Manage and track all your products.</p>
                </div>

                <button
                    className="add-product-btn"
                    onClick={() => setShowAddProduct(true)}
                >
                    + Add Product
                </button>
            </div>

            <div className="products-toolbar">
                <input
                    type="text"
                    placeholder="Search by ID, name or category..."
                    className="product-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="empty-products">
                                    Loading products...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="6" className="empty-products">
                                    {error}
                                </td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-products">
                                    {products.length === 0
                                        ? "No products found."
                                        : "No matching products found."}
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.productId}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>—</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {showAddProduct && (
                <AddProduct
                    onClose={() => setShowAddProduct(false)}
                    onProductAdded={fetchProducts}
                />
            )}
        </div>
    );
}

export default Products;
