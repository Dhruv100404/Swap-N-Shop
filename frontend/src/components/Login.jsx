import React, { useState } from "react";
import './Login.css';
import bg from "../assets/background.jpeg"
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

const Login =  (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    // const [userData, setUserData] = useState(null);

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/users/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                //setUserData(data);
                Cookies.set("userData", JSON.stringify(data), { expires: 7 });
                navigate("/Home");

            } else {
                console.error("Login failed");
                toast.error("Wrong Email or Password. Please try again");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="container">
        <ToastContainer />
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handlesubmit} className="sign-in-form">
                        
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                value={email} // Bind the value to the state
                                onChange={(e) => setEmail(e.target.value)} // Update the state
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password} // Bind the value to the state
                                onChange={(e) => setPassword(e.target.value)} // Update the state
                            />
                        </div>
                        <input type="submit" value="Login" className="btn btn-dark" />
                        {loginError && <div className="error-message">{loginError}</div>}
                    </form>
                </div>
            </div>


            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>New here ?</h3>
                        <p>
                            Turn Unwanted Items into Cash and Find Hidden Treasures!
                        </p>
                        <button class="btn btn-dark" id="sign-up-btn">
                            <Link to="/signUp" className="custom-link">Sign up</Link>
                        </button>

                    </div>
                    <img src={bg} alt="kfkads" />
                </div>
            </div>





        </div>
    </>
    );
};

export default Login;