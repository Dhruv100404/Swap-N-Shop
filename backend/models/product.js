import mongoose from "mongoose";
// import User from "./user";

const transactionSchema = new mongoose.Schema({
    productName: String,
    productType: String,
    issuedPrice: Number,
    //finalPrice: Number,
    issuedDate: Date,
    image : String,
    productDescription: String,
    offers: {
        type: [
            {
                user: mongoose.Schema.Types.ObjectId,
                offerprice: Number,
                username: String,
                useremail:String,
                userphone : String,
            },
        ],
    },
    sold: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    //sellDate: Date,
});
const Product = mongoose.model("Product", transactionSchema);
// userSchema.plugin(passportLocalMongoose);
export default Product;
