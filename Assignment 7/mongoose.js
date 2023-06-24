const mongoose = require("mongoose");

const User = require("./models/user");
const dotenv = require("dotenv");

dotenv.config();

// add connection string to mongo atlas
const url = process.env.DB_URL;

console.log(url);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createUser = async (req, res, next) => {
  // add product to mongo
  const createdUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    userName: req.body.userName,
    passWord: req.body.passWord,
  });
  const result = await createdUser.save();
  res.json(result);
};

const getUsers = async (req, res, next) => {
  const users = await User.find().exec();
  res.json(users);
};

exports.createUser = createUser;
exports.getUsers = getUsers;
