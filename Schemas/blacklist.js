const mongoose = require('mongoose');

const Schema = new mongooose.Schema({
    id: String
});

module.exports = mongoose.model('blacklist', Schema)