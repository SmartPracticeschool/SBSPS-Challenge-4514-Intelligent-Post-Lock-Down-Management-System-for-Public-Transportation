const jwt = require("jsonwebtoken");
const util = require("util");
const crypto = require("crypto");

const User = require("../models/userModel");
const asyncCatch = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const sendMail = require("../utils/email");

exports.signupUser = asyncCatch(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    mobile: req.body.mobile * 1,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
    expiresIn: 86400 * 1000,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      name: user.name,
    },
  });
});

exports.loginUser = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("provide valid email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 404));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
    expiresIn: 86400 * 1000,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      name: user.name,
    },
  });
});

exports.sendProtect = asyncCatch(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("user is not logged in!"));
  }

  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_PRIVATE_KEY
  );
  console.log(decoded);
  const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
  if (!freshUser) {
    return next(new AppError("User does not exist!"));
  }
  if (freshUser.isPasswordChanged(freshUser.passwordCreatedAt, decoded.iat)) {
    return next(new AppError("User has changed the password!"));
  }
  req.user = freshUser;
  next();
});
