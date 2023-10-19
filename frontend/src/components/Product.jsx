import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import s1 from '../assets/s1.png';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = (props) => {
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState(null);
    const [offers, setOffers] = useState([]);

    const navigate = useNavigate();


    
    useEffect(() => {
        async function fetchData() {
            try {
                const userDataFromCookie = Cookies.get('userData');

                if (userDataFromCookie) {
                    try {
                        const parsedUserData = JSON.parse(userDataFromCookie);
                        setUserData(parsedUserData);
                        console.log(parsedUserData);
                    } catch (error) {
                        console.error('Error parsing user data from cookies:', error);
                    }
                }

                if (userData) {
                    const id = userData._id;
                    console.log(id);

                    try {
                        const response = await fetch(`http://localhost:8000/api/users/profile/${id}`);

                        if (response.ok) {
                            const data = await response.json();
                            console.log('Fetched user data: ', data);
                            setUserData(data);
                            // Update your state or do any other necessary processing with the data.
                        } else {
                            console.error('Failed to fetch user data:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Fetch error:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData();
    }, []);

    const bargainhandler = (productId) => {
        navigate(`/Bargain/${productId}`, {});
    };

    const buyhandler = async (e) => {
        e.preventDefault();
        try {
            if (userData) {
                const { _id, name,email,phon } = userData;
                const issuedPrice = props.product.issuedPrice;

                const response = await fetch(`
                    http://localhost:8000/api/users/offer/${props.product._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid: _id, name,email,phon,issuedPrice }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setOffers(data.offers);
                    toast.success('Offer Sent Successfully', {
                        position: 'top-right',
                        autoClose: 3000, // Close the toast after 3 seconds
                    });
                } else {
                    console.error('Failed to fetch offers');
                }
            }
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    return (
        <>
            {props.product.sold ? (
                <></>
            ) : (
                <>
                <div className="product-card">
                    <img src={props.product.image} alt="Product Image" className="product-image" />
                    <div className="product-details">
                        <h2 className="product-title">{props.product.productName}</h2>
                        <p className="product-description">{props.product.productDescription}</p>
                        <br />
                        <p className="product-price">₹{props.product.issuedPrice}</p>

                        <button className="add-to-cart-button" onClick={() => bargainhandler(props.product._id)}>
                            Bargain
                        </button>
                        <br />
                        <br />
                        <button className="add-to-cart-button" onClick={buyhandler}>
                            Buy Now
                        </button>
                        </div>


                    <ToastContainer />
                    </div>
                </>
            )}
        </>
    );
};

export default Product;
