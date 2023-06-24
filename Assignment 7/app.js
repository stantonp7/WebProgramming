const express = require("express");
const bodyParser = require("body-parser");
const mongooseDBAccessLayer = require("./mongoose");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.post("/users", mongooseDBAccessLayer.createUser);
app.get("/users", mongooseDBAccessLayer.getUsers);

app.listen(3000);
