import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import Review from "../models/review.js";


//@desc Auth user / Set token
// route POST api/users/auth
// access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
        });
        console.log("Login Succesfull");
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc Register a new user
// route POST api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phon, adr } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }
    const products = [];
    const user = await User.create({ name, email, password, phon, adr, products });
    if (user) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            phon: user.phon,
            adr: user.adr,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
//@desc Logout user
// route POST api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});


const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id);
    console.log(user)
    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            phon: user.phon,
            adr: user.adr,

        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

//@desc update user profile
// route PUT api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phon = req.body.phon || user.phon;
        user.adr = req.body.adr || user.adr
        
        if (user.password = req.body.password) {
            
            const updatedUser = await user.save();
            res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phon: updatedUser.phon,
            adr : updatedUser.adr,
        });
        }
        
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};

