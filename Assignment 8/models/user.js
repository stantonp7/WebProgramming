const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  userName: { type: String, required: true },
  passWord: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: String, required: false, ref: "Place" }],
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
