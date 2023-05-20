const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { notFound } = require("./middlewares/errorhandler");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cors());
dotenv.config();
app.use(cookieParser()); // need to parse the cookies

app.use(express.json({ limit: "50mb" })); // to accept json data from frontend
app.use(express.urlencoded({ limit: "50mb" }));
const mongodb = require("./config/db.js");
mongodb();

// app.get("/", (req, res) => res.send("hey"));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/image", require("./routes/imageRoute"));
app.use(express.static(path.join(__dirname, "../client/build")));

if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
} else {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.use(notFound); // to handle 404 error

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 3601, () =>
  console.log(`Sever Running on port ${process.env.PORT || 3601}`)
);
