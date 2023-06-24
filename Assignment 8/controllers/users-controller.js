const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUserByID = async (req, res, next) => {
  const userId = req.params.uid;
  const user = await User.findById(userId);

  if (!user) {
    //return res.status(404).json({message: 'Could not find a place for given user ID'});
    const error = new Error("Coult not find a user for the provided ID");
    error.code = 404;

    return next(error); //this will triggler ERROR handling middleware
  }

  //return the response with the place that matches UserID
  res.json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
  //STEP 2 at beginning we will call validation result as a function
  //pass the request to this
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //lets output errors to see more detail errors
    console.log(errors);
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const { firstName, lastName, email, address, password, userName, image } =
    req.body;

  //STEP 3 save the created place
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }

  //STEP 4 return the response
  res.status(201).json({ user: createdUser });
};
