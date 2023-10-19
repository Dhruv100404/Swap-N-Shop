import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import Cookies from "js-cookie";
import Product from "./Product";
import Fuse from "fuse.js";


const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [fuse, setFuse] = useState(null);

    useEffect(() => {
        const userDataFromCookie = Cookies.get("userData");
        if (userDataFromCookie) {
            try {
                const parsedUserData = JSON.parse(userDataFromCookie);
                setUserData(parsedUserData);
            } catch (error) {
                console.error("Error parsing user data from cookies:", error);
            }
        }
    }, [navigate, setUserData]);

    const profile = () => {
        navigate("/Profile");
    };

    const home = () => {
        navigate("/Home");
    };
    const about = () => {
        navigate("/About");
    };
    const sell = () => {
        navigate("/Sell");
    };

    const contact = () =>{
        navigate("/Contact")
    }

    const logoutHandler = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/users/logout", {
                method: "POST",
                credentials: "same-origin",
            });

            if (response.ok) {
                window.location.href = "/";
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/users/allproduct"
                );
                if (response.ok) {
                    const data = await response.json();

                    setProducts(data.allProduct);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const options = {
                keys: ["productName"],
                threshold: 0.4,
            };

            const t = new Fuse(products, options);
            setFuse(t);
        }
    }, [products]);

    useEffect(() => {
        const filterProducts = () => {
            if (!fuse) return;
            const results = fuse.search(searchInput);
            const filtered = results.map(({ item }) => item);
            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [searchInput, fuse]);

    return (
        <>
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    SWAPNSHOP
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="d-flex navbar-nav h-100 w-100 text-md-center">
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={home}>
                                Home
                            </a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={sell}>
                                Sell
                            </a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={about}>
                                About
                            </a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={contact}>
                                Contact
                            </a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={profile}>
                                Profile
                            </a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={logoutHandler}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {userData && (
                <div className="user-info">
                    <h2>Welcome, {userData.name}!</h2>
                    {/* Add more information as needed */}
                </div>
            )}

            <section className="py-50">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        filteredProducts();
                    }}>

                    <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                        <input
                            className="text-base text-gray-400 flex-grow outline-none px-2"
                            type="text"
                            placeholder="Enter item's name or category"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </form>

            </section>

            <div className="con">
                {(searchInput ? filteredProducts : products).map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </div>
        </>
    );
};

export default Home;