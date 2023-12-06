const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  reviewDesc: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const ReviewModel = model("review", reviewSchema);

module.exports = {
  ReviewModel,
};
