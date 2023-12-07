const { Schema, model } = require("mongoose");

const recentlyViewedSchema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      timestamp: { type: Date, default: Date.now, required: true },
    },
  ],
});

const RecentlyViewedModel = model("recentlyViewed", recentlyViewedSchema);

module.exports = {
  RecentlyViewedModel,
};
