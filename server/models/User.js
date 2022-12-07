const {Schema, model} = require("mongoose");

const User = new Schema({
    city: {type: String},
    code: {type: String},
    type: {type: String},
    photo: {type: String},
    grade: {type: String},
    degree: {type: String},
    gender: {type: String},
    school: {type: String},
    country: {type: String},
    telegram: {type: String},
    firstName: {type: String},
    instagram: {type: String},
    secondName: {type: String},
    dateOfBirth: {type: String},
    affiliation: {type: String},
    phoneNumber: {type: String},
    volunteeringHours: {type: Number},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

module.exports = model('User', User);