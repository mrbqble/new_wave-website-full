const {Schema, model} = require("mongoose");

const University = new Schema({
    name: {type: String}
});

module.exports = model('University', University);