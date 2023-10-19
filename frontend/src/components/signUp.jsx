import React, { useState } from "react";
import './Login.css'
import bg from "../assets/background.jpeg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";


export const Login = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phon, setPhon] = useState("");
    const [adr, setAdr] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

        
        try {
            const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            
            body: JSON.stringify({ name, email, password, phon, adr }),
});

            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                Cookies.set("userData", JSON.stringify(data), { expires: 7 });
                navigate("/Home", { state: data });
            } else {
                console.error("SignUp failed");
                toast.error("Email Already Exists Please try other email");
                
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="container">
            <ToastContainer />
            {/* Use className instead of class */}
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        {" "}
                        {/* Use onSubmit */}
                        <h2 className="title">Sign Up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} // Update the state
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="email"
                                placeholder="abc@gmail.com"
                                name="email"
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
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="number"
                                placeholder="Phone No."
                                value={phon} // Bind the value to the state
                                onChange={(e) => setPhon(e.target.value)} // Update the state
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="text"
                                placeholder="Address : state City Pincode"
                                value={adr} // Bind the value to the state
                                onChange={(e) => setAdr(e.target.value)} // Update the state
                            />
                        </div>
                        <input type="submit" value="Signup" className="btn btn-dark" />
                    </form>
                </div>
            </div>
            {/* Rest of the component */}
            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>New here ?</h3>
                        <p>Turn Unwanted Items into Cash and Find Hidden Treasures!</p>
                        <button class="btn btn-dark" id="sign-up-btn">
                            <Link to="/" className="custom-link">Login</Link>
                        </button>
                    </div>
                    <img src={bg} alt="dfsasdf" />
                </div>
            </div>
        </div>
    );
};

export default Login;