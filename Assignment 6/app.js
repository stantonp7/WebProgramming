const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express(); 

//STEP 1 add a new MiddleWare that parses the data
//routes are read top to bottom
//first parse the body then reach the routes
//NOTE: bodyParser.JSON will parse any JSON data and desearlize into JavaScript
//then it will call NEXT and fall into the next middleware which is "/api/places" 
app.use(bodyParser.json());


app.use('/api/places', placesRoutes); 


app.use((error, req, res,next) => {

        if(res.headerSent) {
            return next(error);
        }
        res.status(error.code || 500);  
        res.json( { message: error.message || 'An unknown error occured'  });

});

app.listen(3001);