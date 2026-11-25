
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

import "./App.css";

function App() {
    return (
        <div className="app-container">
            <Sidebar />

            <main className="main-content">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
