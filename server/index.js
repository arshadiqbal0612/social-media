const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authrouter = require("./routers/authrouter");
const postRouter = require("./routers/postRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

// this is cloudnary intial process
// Configuration
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(express.json({limit: "10mb"}));
app.use(morgan("common"));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/auth", authrouter);
app.use("/posts", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("ok from server");
});

const PORT = process.env.PORT || 40001;

dbConnect();
app.listen(PORT, () => {
  console.log(`listening on port :${PORT}`);
});
