import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import './offerpage.css'


const Offerpage = (props) => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [offers, setOffers] = useState([]);
    const [userData, setUserData] = useState([]);

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

    useEffect(() => {

        const fetchOffers = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/users/offer/${productId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOffers(data.offers);
                } else {
                    console.error("Failed to fetch offers");
                }
            }
            catch (error) {
                console.error("Error fetching offers :", error);
            }
        }
        fetchOffers();
    }, []);
    console.log(offers)

    const handleRejectOffer = async (offer) => {
        try {
            const offerId = offer._id;

            const response = await fetch(
                `http://localhost:8000/api/users/offer/reject/${productId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        offerId,
                        productId,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success("Offer Rejected");
                navigate(-1);
            } else {
                console.error("Failed to fetch offers");
                toast.error("Invalid Offer");
            }
        } catch (error) {
            console.error("Error fetching offers :", error);
        }
    };

    const acceptOffer = async (offer) => {
        try {
            var offer_id = offer._id;
            console.log(offer_id)
            const response = await fetch(
                `http://localhost:8000/api/users/offer/accept/${productId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        offer_id,
                        productId,
                        userData
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success("Offer Accepted");
                navigate(-1);
            } else {
                console.error("Failed to fetch offers");
                toast.error("Invalid Offer");
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

            <br />

            <div className="offers-container">
                <ul className="offers-list">
                    {offers.length ? (
                        offers.map((offer, index) => (
                            <li className="offer-item" key={index}>
                                <div className="offer-details">
                                    <span className="offer-username">User: {offer.username}</span>
                                    <br />
                                    <span className="offer-price">Price: ₹{offer.offerprice}</span>
                                </div>
                                <div className="action-buttons">
                                <button className="accept-button" onClick={() => acceptOffer(offer)}>Accept</button>
                                <button className="reject-button" onClick={() => handleRejectOffer(offer)}>Reject</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <h1>No offers found</h1>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Offerpage;
