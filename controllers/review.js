const { CtrlWrapper, HttpError } = require("../healpers");
const { ReviewModel } = require("../modules/Review");
const { UserModel } = require("../modules/User");

const createNewReview = async (req, res) => {
  const { userId } = req.params;
  console.log(req.body);
    const review = await ReviewModel.create({ ...req.body });
    
    if (!review) {
        throw HttpError(400, 'Something is wrong...')
    }

  await UserModel.findByIdAndUpdate(userId, {
    $push: { reviews: review._id },
  });

  res.json(review);
};

module.exports = {
  createNewReview: CtrlWrapper(createNewReview),
};
