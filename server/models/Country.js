const {Schema, model} = require("mongoose");

const Country = new Schema({
    name: {type: String},
    colleges: {type: Array},
    cities: [{
        name: {type: String},
        schools: {type: Array}
    }]
});

module.exports = model('Country', Country);