//STEP 1: need to import "validator result" from Express-Validator package
const { validationResult } = require('express-validator');

const { v4: uuidv4 } = require('uuid');

const DUMMY_PLACES = [
    {
    id: 'p1',
    title: 'Rowan Univerity',
    description: 'Best university in the nation!',
    location: {
        lat: 39.709973,
        lng: -75.1213819,
    },
    address: "201 Mullica Hill Rd, Glassboro, NJ 08028",
    creator: 'userId1'
    }
];

const getPlaces = (req, res, next) => {
    res.json({DUMMY_PLACES});
};


const getPlacesById = (req, res, next) => {

    const placeId = req.params.placeId; // {placeId: 'p1'}

    //we can get our place using Dummy places 
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    //STEP 1 modify for error handling below
    if(!place) {
        //return res.status(404).json({message: 'Could not find a place for given ID'});
        const error = new Error('Coult not find a place for the provided ID');
        error.code = 404; 
        throw error; //this will triggler ERROR handling middleware
    }

    res.json({place}); // equivelant => { place } => { place: place }
};

const getPlaceByUserID = (req, res, next) => {

    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });


    if(!place) {
  
        //return res.status(404).json({message: 'Could not find a place for given user ID'});
        const error = new Error('Coult not find a place for the provided ID');
        error.code = 404; 

        return next(error); //this will triggler ERROR handling middleware
    }

    
    //return the response with the place that matches UserID
    res.json({place});

};


const createPlace = (req, res, next) => {

    //STEP 2 at beginning we will call validation result as a function 
    //pass the request to this 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        //lets output errors to see more detail errors
        console.log(errors);
        return res.status(422).json( { message: 'Invalid inputs, please check post data'  });
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place: createdPlace});

}

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).json( { message: 'Invalid inputs, please check put data'  });
    }

    const placeId = req.params.placeId;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    const { title, description } = req.body;
    place.title = title;
    place.description = description;
    res.status(200).json({place});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if(!place) {
        const error = new Error('Coult not find a place for the provided ID');
        error.code = 404;
        throw error; 
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.json({message: 'Deleted place.'});

};




//Need to add this to our exports bundle
exports.createPlace = createPlace;


exports.getPlacesById = getPlacesById;
exports.getPlaceByUserID = getPlaceByUserID;
exports.getPlaces = getPlaces;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
