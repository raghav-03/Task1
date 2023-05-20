var mongoose = require("mongoose");

const imgSchema = new mongoose.Schema(
  {
    imgName: {
      type: String,
      required: true,
    },
    imgDetails: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Images = mongoose.model("Image", imgSchema);

module.exports = Images;
