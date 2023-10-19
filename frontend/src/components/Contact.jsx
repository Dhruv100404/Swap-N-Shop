import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./contact.css";
import Cookies from "js-cookie";
import bg from '../assets/undraw-contact.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(email);

        emailjs
            .sendForm("gmail", "template_afqdagf", e.target, "HpMd262Vjfdyc0K1e")
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
    


    try {
        const response = await fetch("http://localhost:8000/api/users/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ name, email, subject, description }),
        });

        console.log(response);
        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            navigate("/Home");
        } else {
            console.error("Review Failed");
        }
    }catch (error) {
        console.log(error);
    }
};


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



return (
    <>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <a class="navbar-brand" href="/Home">
                SWAPNSHOP
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
                aria-expanded="false" aria-label="Toggle navigation">
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
                        <a class="nav-link" href="" onClick={contact}>Contact</a>
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


        <div class="content1">
            <div class="row justify-content-center">
                <div class="col-md-10">


                    <div class="row justify-content-center">
                        <div class="col-md-6">

                            <h3 class="heading mb-4">Let's talk about everything!</h3>
                            <p>Get in touch with us at SwapnShop for any questions, inquiries, or assistance</p>

                            <p><img src={bg} alt="Image" class="img-fluid" /></p>
                        </div>
                        <div class="col-md-6">
                            <div class="box">
                                <form class="mb-15" method="post" onSubmit={handleSubmit}>
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" name="name" id="name" placeholder="Your name"
                                                value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" name="email" id="email" placeholder="Email"
                                                value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"
                                                value={subject} onChange={(e) => setSubject(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" name="description" id="description" placeholder="Write your message"
                                                value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="submit" value="Send Message" name="message" class="btn btn-dark" />
                                            <span class="submitting"></span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </>
);


};

export default Contact;