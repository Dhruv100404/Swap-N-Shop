import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css'

const Profile = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);

    const sell = () => {
        navigate("/Sell")
    };

    const contact = () =>{
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
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


    const handleSubmit = async (event) => {
        event.preventDefault();

        const id = userData._id;
        console.log(id);
        //const token = Cookies.get('userData')
        // Send the updated user data to the server here using a PUT request
        await fetch(`http://localhost:8000/api/users/profile/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

                // Add any headers needed for authentication (e.g., JWT token)
            },

            body: JSON.stringify(userData),

        })

            .then((response) => response.json())
            .then((data) => {
                console.log("Updated user data: ", data);
                toast.success('User profile updated successfully!', {
                    position: "top-right",
                    autoClose: 3000, // Close the toast after 3 seconds
                });
                // Optionally, you can show a success message to the user
            })
            .catch((error) => {
                console.error("Error updating user data: ", error);
                toast.error('Error updating user profile. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                // Handle errors and show an error message to the user
            });
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
                            <a class="nav-link" href="" onClick={contact}>
                                Contact
                            </a>
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
                <div class="heading2">Profile</div>
                <form onSubmit={handleSubmit}>
                    <div class="field-container">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="johndoe@example.com"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="phon">Phone Number</label>
                            <input
                                type="text"
                                id="phon"
                                name="phon"
                                placeholder="123-456-7890"
                                value={userData.phon}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div class="field-container">
                        <div>
                            <label htmlFor="adr">Address</label>
                            <input
                                type="text"
                                id="adr"
                                name="adr"
                                placeholder="123 Main St, City"
                                value={userData.adr}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/userproduct")}
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                    >
                        My Products
                    </button>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;
