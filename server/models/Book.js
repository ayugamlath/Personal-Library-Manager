const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    googleBookId: { type: String, required: true },
    title: { type: String, required: true },
    authors: { type: [String], default: [] },
    thumbnail: { type: String },
    description: { type: String },
    personalReview: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Reading", "Completed", "Want to Read"],
      default: "Want to Read",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
