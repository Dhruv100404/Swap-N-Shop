import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    name: String,
    email :String,
    subject: String,
    description :String,

    // reviewDate: {
    //     type: Date,
    //     default: Date.now,
    // },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
