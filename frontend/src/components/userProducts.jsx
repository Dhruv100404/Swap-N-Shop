import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import Cookies from "js-cookie";
import Product from "./Product";
import './Product.css'; // Import the external CSS file
import s1 from '../assets/s1.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserProducts = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    const handleMarkSold = async (id) => {
        const response = await fetch(
            `http:/localhost:8000/api/users/marksold/${id}`
        );
        if (response.ok) {
            toast.success("Product Sold");
            navigate(-1);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userDataFromCookie = Cookies.get("userData");

                if (userDataFromCookie) {
                    try {
                        var parsedUserData = JSON.parse(userDataFromCookie);
                        setUserData(parsedUserData);
                        console.log(parsedUserData);
                        //console.log(userData);
                    } catch (error) {
                        console.error("Error parsing user data from cookies:", error);
                    }
                }

                const id = parsedUserData._id;
                const response = await fetch(`http://localhost:8000/api/users/userproducts/${id}`
                );
                if (response.ok) {
                    const data = await response.json();

                    setProducts(data.userproduct);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    const sell = () => {
        navigate("/Sell")
    };

    const profile = () => {
        navigate("/Profile");
    };

    const offerhandler = (productId) => {
        navigate(`/Offers/${productId}`);
    };

    const home = () => {
        navigate("/Home");
    };
    const about = () => {
        navigate("/About")
    };

    const logoutHandler = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
                credentials: 'same-origin',
            });
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return(
    <>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <a class="navbar-brand" href="#">SWAPNSHOP</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="d-flex navbar-nav h-100 w-100 text-md-center">
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={home}>Home</a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={sell}>Sell</a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={about}>About</a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="#" >Contact</a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={profile}>Profile</a>
                        </li>
                        <li class="nav-item flex-fill">
                            <a class="nav-link" href="" onClick={logoutHandler}>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <ToastContainer />

        <div className="con">
        {(products.length === 0) ? (
            <div className="no-products-message">No products found</div>
        ) : (
    products.map((product) => (
        <div className={`product-card ${product.sold ? 'sold-out' : ''}`}>
            <img src={product.image} alt="Product Image" className="product-image" />
            <div className="product-details">
                <h2 className="product-title">{product.productName}</h2>
                <p className='product-details'>{product.productDescription}</p>
                <br />
                {product.sold ? (
                    <p className="sold-out-label">Sold Out</p>
                ) : (
                    <>
                        <button className="add-to-cart-button" onClick={() => offerhandler(product._id)}>View Offers</button>
                        <br />
                        <br />
                        <button
                            type="button"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2 mr-2 mb-2 dark:bg-gray-800 dark:hover-bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={() => handleMarkSold(product._id)}
                        >
                            Mark as sold
                        </button>
                    </>
                )}
            </div>
        </div>
    ))
)}

            </div>
            </>
    );
};

export default UserProducts;    