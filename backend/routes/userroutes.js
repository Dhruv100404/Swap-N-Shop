import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,

} from "../controller/userController.js";
import { protect } from '../middleware/authMiddleware.js';
import { registerProduct,getAllProduct,getProductById,getUserProduct,userReview,sendOffer,getoffer,acceptOffer
    ,rejectOffer,getMarkSold } from "../controller/productController.js";

const router = express.Router();
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/review", userReview);
router.post("/logout", logoutUser);
router.get("/profile/:id",getUserProfile)
router.put("/profile/:id",updateUserProfile);
router.post("/sell", upload.single("image"), registerProduct);
router.get("/allproduct",getAllProduct);
router.get("/userproducts/:id",getUserProduct);
router.get("/product/:id", getProductById);
router.post("/offer/accept/:id", acceptOffer);
router.post("/offer/reject/:id", rejectOffer);
router.get("/marksold/:id", getMarkSold);
router.post("/offer/:id", sendOffer);
router.get("/offer/:id", getoffer);



export default router
