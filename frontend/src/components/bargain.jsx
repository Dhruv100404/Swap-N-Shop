import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Bargain.css"; // Import your external CSS file
import u1 from "../assets/user.jpeg";
import background from '../assets/background.jpeg';
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bargain = () => {
    const { productId } = useParams();
    console.log(productId)
    const [userData, setUserData] = useState([]);
    const [products, setProducts] = useState([]);
    const [Offers,setOffers] = useState([]);
    const [offerprice, setOfferprice] = useState(0);
    const navigate = useNavigate();

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

    const contact = () => {
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
        console.log("HIII")
        const fetchData  = async () => {
            console.log("HI")
            try {
                const response = await fetch(`http://localhost:8000/api/users/product/${productId}`);
                //console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.product);
                    //console.log(products)
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchData();
    },[]);
    console.log(products)


    useEffect(() => {
        async function fetchData() {
            try {
                const userDataFromCookie = Cookies.get("userData");

                if (userDataFromCookie) {
                    try {
                        var parsedUserData = JSON.parse(userDataFromCookie);
                        setUserData(parsedUserData);
                        console.log(parsedUserData);
                        console.log(userData);
                    } catch (error) {
                        console.error("Error parsing user data from cookies:", error);
                    }
                }

                const id = parsedUserData._id;
                console.log(id);

                //const token = Cookies.get('userData');
                const response = await fetch(`http://localhost:8000/api/users/profile/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched user data: ", data);
                    setUserData(data)
                    // Update your state or do any other necessary processing with the data.
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchData();
    }, []);

    const userid = userData._id
    const name = userData.name
    const email = userData.email
    const phone = userData.phon
    
    const handleOfferClick = async (e) => {
        e.preventDefault();    
        
        try {
            const issuedPrice = offerprice;
            const response = await fetch(
                `http://localhost:8000/api/users/offer/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({userid,name,email,phone,issuedPrice}),
            });
            
            

            if (response.ok) {
                const data = await response.json();
                setOffers(data.offers);
                toast.success('Offer Sent Succesfully', {
                    position: "top-right",
                    autoClose: 3000, // Close the toast after 3 seconds
                });

            } else {
                console.error("Failed to fetch offers");
            }
        } catch (error) {
            console.error("Error fetching offers :", error);
        }
    };

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

        <div className="container3">
            <div className="product-container">
                <div className="product-image">
                    <img
                        src={background}
                        alt=""
                    />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{products.productName}</h1>
                    <div className="product-price">₹ {products.issuedPrice}</div>
                    <p className="product-description">{products.productDescription}</p>
                    <div className="offer-container">
                        <label className="offer-label" htmlFor="offer-price">
                            Your Offer : ₹ {offerprice}
                        </label>
                        <div className="offer-slider">
                            <button
                                className="btn text-black ml-2 p-2"
                                onClick={() => setOfferprice(offerprice - 1)}
                                disabled={offerprice <= 1}
                            >
                                <BiMinus size={24} />
                            </button>
                            <input
                                id="offer-price"
                                type="range"
                                onChange={(e) => setOfferprice(parseInt(e.target.value))}
                                min={1}
                                max={products.issuedPrice}
                                step={1}
                                value={offerprice}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <button
                                className="btn text-black ml-2 p-2"
                                onClick={() => setOfferprice(offerprice + 1)}
                                disabled={offerprice >= products.issuedPrice}
                            >
                                <BiPlus size={24} />
                            </button>
                        </div>
                    </div>
                    <button className="bg-black text-white py-2 px-4 rounded-md mt-4" onClick={handleOfferClick}>
                        Make an Offer
                    </button>
                    <ToastContainer />
                </div>
            </div>
        </div>
        </>
    );
};

export default Bargain;
