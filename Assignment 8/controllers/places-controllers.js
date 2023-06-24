//STEP 1: need to import "validator result" from Express-Validator package
const { validationResult } = require("express-validator");
const Place = require("../models/place");

const getPlacesById = async (req, res, next) => {
  const placeId = req.params.placeId; // {placeId: 'p1'}
  let place;
  //we can get our place using Dummy places
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }

  //STEP 1 modify for error handling below
  if (!place) {
    //return res.status(404).json({message: 'Could not find a place for given ID'});
    const error = new Error("Coult not find a place for the provided ID");
    error.code = 404;
    throw error; //this will triggler ERROR handling middleware
  }

  //res.json({ place }); // equivelant => { place } => { place: place }
  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

const getPlaceByUserID = async (req, res, next) => {
  const userId = req.params.uid;
  const place = await Place.find({ creator: userId });

  if (!place) {
    //return res.status(404).json({message: 'Could not find a place for given user ID'});
    const error = new Error("Coult not find a place for the provided ID");
    error.code = 404;

    return next(error); //this will triggler ERROR handling middleware
  }

  //return the response with the place that matches UserID
  res.json({ places: place.map((place) => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
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

  const { title, description, location, address, creator } = req.body;

  const createdPlace = new Place({
    title,
    description,
    location: location,
    address,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Rowan_University_logo.svg/1200px-Rowan_University_logo.svg.png",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Could not save place to database" });
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const { title, description, address, location } = req.body;
  const placeId = req.params.placeId;

  let place;
  try {
    place = await Place.findById(placeId);

    place.title = title;
    place.description = description;
    place.address = address;
    place.location = location;

    await place.save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    await Place.findByIdAndDelete(placeId);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ message: "Place deleted" });
};

//Need to add this to our exports bundle
exports.createPlace = createPlace;
exports.getPlacesById = getPlacesById;
exports.getPlaceByUserID = getPlaceByUserID;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
