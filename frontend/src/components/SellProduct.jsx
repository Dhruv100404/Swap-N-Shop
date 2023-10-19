import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './profile.css'
import Axios from 'axios';


const SellProduct = () => {
    const [productDescription, setproductDescription] = useState("");
    const [productName, setproductName] = useState("");
    const [productType, setproductType] = useState("");
    const [issuedPrice, setissuedPrice] = useState("");
    // const [productId, setproductId] = useState("");
    const [issuedDate, setissueDate] = useState("");
    const navigate = useNavigate();
    const [productData, setproductData] = useState(null);
    const userData = Cookies.get("userData");
    const [userdata, setUserdata] = useState([]);
    const [image, setimage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedUserData = JSON.parse(userData);
        setUserdata(parsedUserData);
        const id = parsedUserData._id;

        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productType', productType);
        formData.append('issuedPrice', issuedPrice);
        formData.append('issuedDate', issuedDate);
        formData.append('productDescription', productDescription);
        formData.append('id', id);
        formData.append('image', image); // Add the image file

        try {
            const response = await Axios.post('http://localhost:8000/api/users/sell', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setproductData(data);
                navigate('/Home');
            } else {
                console.error('API request failed:', response.statusText);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const handleFileChange = (e) => {
        // Set the selected file in the state
        setimage(e.target.files[0]);
    };

    const sell = () => {
        navigate("/Sell")
    };

    const contact = () => {
        navigate("/Contact")
    }

    const profile = () => {
        navigate("/Profile");
    };

    const home = () => {
        navigate("/Home");
    };
    const about = () => {
        navigate("/About")
    };
    const currentDate = new Date().toISOString().split('T')[0];
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



    return (
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
                            <a class="nav-link" href="" onClick={contact} >Contact</a>
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
            <header>
                <div class="heading">Welcome to SwapNShop</div>
                <p>Find great deals on pre-owned items!</p>
            </header>
            <div class="profile-container">
                <form onSubmit={handleSubmit} className="product-form">
                    <div class="field-container">
                        <div>
                            <label htmlFor="Name">Product Name</label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                name="productName"
                                value={productName}
                                onChange={(e) => setproductName(e.target.value)} // Update the state
                            />
                        </div>
                    </div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="Type">Product Type</label>
                            <input
                                type="text"
                                placeholder="Product Type"
                                name="productType"
                                value={productType}
                                onChange={(e) => setproductType(e.target.value)} // Update the state
                            />
                        </div></div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="Price">Issued Price</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                name="issuedPrice"
                                value={issuedPrice} // Bind the value to the state
                                onChange={(e) => setissuedPrice(e.target.value)} // Update the state
                            />
                        </div></div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="Date">Issued Date</label>
                            <input
                                type="Date"
                                placeholder="Issued Date"
                                value={issuedDate}
                                min={currentDate} // Bind the value to the state
                                onChange={(e) => setissueDate(e.target.value)} // Update the state
                            />
                        </div></div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="image">Product Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </div></div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="Description">Description</label>
                            <input
                                type="text"
                                placeholder="Description"
                                value={productDescription} // Bind the value to the state
                                onChange={(e) => setproductDescription(e.target.value)} // Update the state
                            />
                        </div></div>
                    <input type="submit" value="Sell" className="btn btn-dark" />
                </form>
            </div>
        </>
    );
};

export default SellProduct;