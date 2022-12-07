const {Schema, model} = require("mongoose");

const Event = new Schema({
    date: {type: String},
    text: {type: String},
    type: {type: String},
    city: {type: String},
    title: {type: String},
    image: {type: String},
    format: {type: String},
    status: {type: String},
    number: {type: Number},
    places: {type: Number},
    partners: {type: Array},
    attended: {type: Array},
    endTime: {type: String},
    mapLink: {type: String},
    addInfo: {type: String},
    duration: {type: String},
    location: {type: String},
    startTime: {type: String},
    organizators: {type: Array},
});

module.exports = model('Event', Event);