const Image = require("../models/image");
const Fetures = require("../utlis/features");

exports.home = async (req, res) => {
  try {
    const perpageitem = 9;
    const totalimage = await Image.countDocuments();
    const image = new Fetures(Image.find(), req.query).search();
    let images = await image.query;
    let filteredimagecount = images.length;
    image.pagination(perpageitem);
    images = await image.query.clone();
    res.status(200).json({
      success: true,
      images,
      perpageitem,
      filteredimagecount,
    });
  } catch (e) {
    res.status(401).json(`Error ${e}`);
  }
};
exports.showoneimg = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    res.status(200).json({
      success: true,
      image,
    });
  } catch (e) {
    res.status(401).json(`Error ${e}`);
  }
};
exports.addimg = async (req, res) => {
  try {
    let newimage = await Image.create(req.body);
    res.status(200).json({
      success: true,
      newimage,
    });
  } catch (e) {
    console.log(e);
    res.status(401).json(`Error ${e}`);
  }
};

exports.editimg = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    image.imgDetails = req.body.imgDetails;
    image.imgURL = req.body.imgURL;
    image.imgName = req.body.imgName;
    image.save();
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(401).json(`Error ${e}`);
  }
};
exports.deleteimg = async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Image Deleted Successfully",
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
