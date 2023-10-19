import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import User from "../models/user.js";
import Review from "../models/review.js";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";

var smtpConfig = {
    service: "gmail",
    // use SSL
    auth: { user: "21ceuos020@ddu.ac.in", pass: "Dhruv@104" },
};
const transporter = nodemailer.createTransport(smtpConfig);

cloudinary.config({
    cloud_name: 'dj1kwoboy',
    api_key: '986482898545523',
    api_secret: '2Kx19jxf5kTTQM65SCMwlx0W6Jc'
});

const registerProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        productType,
        issuedPrice,
        issuedDate,
        productDescription,
    } = req.body;
    const id = req.body.id;
    let image = "uploads/" + req.file.filename;
    console.log(image)

    cloudinary.v2.uploader.upload(
        image,

        async function (error, result) {
            if (error) {
                console.log(error);
            } else {
                image = result.secure_url;
                console.log(result);
            }
            const product = await Product.create({
                productName,
                productType,
                issuedPrice,
                issuedDate,
                image,
                productDescription,
            });
            User.findById(id).then((user) => {
                if (user !== null) {
                    user.products.push(product._id);
                    user.save();
                }
            });
            if (product) {
                return res.status(200).json({
                    id: product._id,
                    productName: product.productName,
                    productType: product.productType,
                    issuedPrice: product.issuedPrice,
                    issuedDate: product.issuedDate,
                    image: product.image,
                    productDescription: product.productDescription,
                });
            } else {
                res.status(400);
                throw new Error("Invalid product data");
            }
        }
    );
    console.log("Hii")
});

const getProductById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ product: product });
});

const getUserProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    const userproductsid = user.products;
    const allproduct = await Product.find();

    const userproducts = await Product.find()
        .where("_id")
        .in(userproductsid)
        .exec();

    res.status(200).json({ userproduct: userproducts });
});

const getAllProduct = asyncHandler(async (req, res, next) => {
    const allProduct = await Product.find();
    res.status(200).json({ allProduct: allProduct });
});

const userReview = asyncHandler(async (req, res) => {
    const { name, email, subject, description } = req.body;

    const review = await Review.create({ name, email, subject, description });
    if (review) {
        return res.status(200).json({
            name: review.name,
            email: review.email,
            subject: review.subject,
            description: review.description,
        });
    } else {
        res.status(400);
        throw new Error("Invalid product data");
    }
});

const sendOffer = asyncHandler(async (req, res, next) => {
    const productid = req.params.id;
    const product = await Product.findById(productid);
    const { userid, issuedPrice,email, name,phone } = req.body;
    product.offers.push({
        user: userid,
        offerprice: issuedPrice,
        username: name,
        useremail:email,
        userphone:phone
    });

    product.save();
    res.status(200).json({
        message: "success",
        offers: product.offers,
    });
});

const getoffer = asyncHandler(async (req, res, next) => {
    const productid = req.params.id;
    const product = await Product.findById(productid);
    const { offers } = product;
    res.status(200).json({
        offers: offers,
    });
});

const rejectOffer = asyncHandler(async (req, res) => {
    const offerId = req.body.offerId;
    const productId = req.body.productId;

    try {
        const product = await Product.findById(productId);
        product.offers = product.offers.filter(
            (offer) => offer._id.toString() !== offerId.toString()
        );

        await product.save();

        res.status(200).json({ message: "Offer rejected successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const acceptOffer = asyncHandler(async (req, res, next) => {
    const productid = req.body.productId;
    const product = await Product.findById(productid);
    const offer_id = req.body.offer_id;
    const correctoffer = product.offers.find((offer) => offer._id == offer_id);

    console.log(correctoffer);
    if (correctoffer) {
        product.sold = true;
        product.offers = [];
        product.offers.push(correctoffer);
        product.price = correctoffer.offerprice;
        product.save();

        const mailOptions = {
            from: "21ceuos020@ddu.ac.in",
            to: req.body.userData.email,
            subject: "Offer Details",
            html: `
                <html>
                <body>
                    <h3>Your Product has been sold at the price of your choice</h3>
                    <h1>Hello ${req.body.userData.name},</h1>
                    <p>Here are the details of the deal:</p>
                    <ul>
                        <li>User Name: ${correctoffer.username}</li>
                        <li>User Phone Number ${correctoffer.userphone}</li>
                        <li>Offer Price: ₹${correctoffer.offerprice}</li>
                    </ul>
                    <h3>You can use these details for further communication.</h3><br />
                    <p>Thank you for using SwapNShop. Have a nice day.</p>
                    </body>
                </html>
                `,
        };
        await transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully");
            }
        });

        const mailOptions1 = {
            from: "21ceuos020@ddu.ac.in",
            to: correctoffer.useremail,
            subject: "Offer Details",
            html: `
                <html>
                <body>
                    <h1>Hello ${correctoffer.username},</h1>
                    <h3>The User Has accepted the offer of yours at your requested price</h3>
                    <p>Here are the details of the deal:</p>
                    <ul>
                        <li>User Name: ${req.body.userData.name}</li>
                        <li>User Phone Number : ${req.body.userData.phon}</li>
                        <li>Offer Price: ₹${correctoffer.offerprice}</li>
                    </ul>
                    <h3>You can use these details for further communication.</h3><br />
                    <p>Thank you for using SwapNShop. Have a nice day.</p>
                    </body>
                </html>
                `,
        };
        await transporter.sendMail(mailOptions1, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("The email was sent successfully");
            }
        });

        return res.status(200).json({
            message: "offer accepted",
        });
    } else {
        return res.status(400).json({
            message: "no offer found",
        });
    }
});

const getMarkSold = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.sold = true;
    product.save();
    return res.status(200).json({
        message: "Marked As Sold",
    });
});

export {
    registerProduct,
    getMarkSold,
    getProductById,
    getUserProduct,
    getAllProduct,
    userReview,
    sendOffer,
    getoffer,
    acceptOffer,
    rejectOffer,
};
