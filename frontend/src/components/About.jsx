import React from "react";
import {Link} from "react-router-dom"
import {
    FaGlobe,
    FaCertificate,
    FaPercentage,
    FaShieldAlt,
    FaCartArrowDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './about.css'
import bg from '../assets/50426.jpg'



const About = () => {
    const navigate = useNavigate();

    const profile = () => {
        navigate("/Profile");
    };
    const sell = () => {
        navigate("/Sell");
    }
    const home = () => {
        navigate("/Home");
    };
    const about = () => {
        navigate("/About")
    };
    const contact = () =>{
        navigate("/Contact")
    }
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

    const teamMembers = [
        {
            name: "Dhruv Thakkar",
            designation: "Developer",
            img: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team2-free-img.png",
        },
        {
            name: "Raj Tamakuwala",
            designation: "Developer",
            img: "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/team2-free-img.png",
        }
    ]
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
                            <a class="nav-link" href=""onClick={sell}>Sell</a>
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

            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container">
                    <div class="imgContainer">
                        <img class="blueDots" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw3.svg" />
                        <img class="mainImg" src={bg} />
                    </div>
                    <div class="responsive-container-block textSide">
                        <p class="text-blk heading">
                            About Us
                        </p>
                        <p class="text-blk subHeading">
                            Welcome to SwapNShop, your premier marketplace for buying and selling second-hand treasures.
                            Our platform is designed to bring buyers and sellers together, offering great deals and a sense of community.
                        </p>

                        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div class="cardImgContainer">
                                <FaPercentage className="text-7xl text-gray-700" />
                            </div>
                            <div class="cardText">
                                <p class="text-blk cardHeading">
                                Bargain Option
                                </p>
                                <p class="text-blk cardSubHeading">
                                At SwapNShop, we understand the importance of finding the best deal. Our "Bargain" feature allows buyers to 
                                negotiate prices with sellers, ensuring that you get the best value for your money.
                                </p>
                            </div>
                        </div>
                        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div class="cardImgContainer">
                                <FaCertificate className="text-7xl text-gray-700" />
                            </div>
                            <div class="cardText">
                                <p class="text-blk cardHeading">
                                User-Friendly Interface
                                </p>
                                <p class="text-blk cardSubHeading">
                                We've designed our website to be intuitive and easy to navigate. Whether you're a seasoned online 
                                shopper or new to buying second-hand items, you'll find SwapNShop a breeze to use.
                                </p>
                            </div>
                        </div>
                        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div class="cardImgContainer">
                                <FaGlobe className="text-7xl text-gray-700" />
                            </div>
                            <div class="cardText">
                                <p class="text-blk cardHeading">
                                    Community Reviews
                                </p>
                                <p class="text-blk cardSubHeading">
                                Read and leave reviews to build trust within the SwapNShop community. 
                                Share your experiences with sellers and buyers to help others make informed decisions.
                                </p>
                            </div>
                        </div>
                        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                            <div class="cardImgContainer">
                                <FaCartArrowDown className="text-7xl text-gray-700" />
                            </div>
                            <div class="cardText">
                                <p class="text-blk cardHeading">
                                    Product Categories
                                </p>
                                <p class="text-blk cardSubHeading">
                                Explore a wide range of product categories, from electronics and fashion to furniture 
                                and collectibles. You can easily filter and search for the items you're interested in.
                                </p>
                            </div>
                        </div>
                        
                            <button class="explore">
                            <Link to="/Home" className="link-button">Explore Our Services</Link>
                            </button>
                        
                    </div>
                </div>
            </div>

        </>
    );
};

export default About;