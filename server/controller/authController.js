const User = require("../models/User");
const bcrypt = require("bcrypt");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    // res.send("from signup");
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      // return res.status(400).send("all email and pass are required");

      return res.send(error(400, "all filed are required"));
    }

    const olduser = await User.findOne({ email });
    if (olduser) {
      // return res.status(409).send("user is already register");
      return res.send(error(409, "user is already register "));
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    // return res.status(201).json({
    //   user,
    // });
    const newUser = await User.findById(user._id);
    return res.send(success(201, "user created successfully"));
  } catch (e) {
    // console.log(error);
    // 500 server side issue
    return res.send(error(500, e.message));
  }
};

const loginController = async (req, res) => {
  try {
    // res.send("from login");
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("all email and pass are required");

      return res.status(400).send("all field are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // return res.status(404).send("user is not register");

      return res.send(error(404, "user is not register"));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      // return res.status(403).send("incorrect password");

      return res.send(error(403, "user is already register"));
    }

    const accesstoken = generateaccestoken({
      _id: user._id,
    });

    const refreshtoken = generateRefreshtoken({
      _id: user._id,
    });

    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      secure: true,
      // secure will tell u it wil  run in https
    });

    // return res.json({ accestoken, refreshtoken });
    // return res.json({ accestoken });
    // return res.send(success(200, { accesstoken,refreshtoken}));

    return res.send(success(200, { accesstoken }));
  } catch (error) {
    console.log(error);
  }
};

// this api will check the refreshtoken validity and generate a new access stoken
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    // return res.status(401).send("refresh tokrn in cookies is required");

    return res.send(error(401, "Refresh token in cookie is required"));
  }

  const refreshtoken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decoded._id;
    const accesstoken = generateaccestoken({ _id });

    // return res.status(201).json({ accesstoken});
    return res.send(success(201, { accesstoken }));
  } catch (e) {
    console.log(e);
    // return res.status(401).send("invalid refresh token");

    return res.send(error(409, "invalid refresh token"));
  }
};

const logOutController = async (req, res) => {
  // just delete cookies from backend side line 78 to 89
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "user logged out"));
  } catch (e) {
    return res.send(500, e.message);
  }
};

// internal function
const generateaccestoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });

    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshtoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });

    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginController,
  signupController,
  refreshAccessTokenController,
  logOutController,
};

// jwt->  this is basically creating access token and whenever user login then it get acces token whenever it request to backend then it check acces is it authrouze or not  if acces token does not match with user token it throw error
