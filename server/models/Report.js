const {Schema, model} = require("mongoose");

const Report = new Schema({
    bags: {type: Number},
    addInfo: {type: String},
    attended: {type: Array},
    distance: {type: Number},
    eventID: {type: String, unique: true}
});

module.exports = model('Report', Report);