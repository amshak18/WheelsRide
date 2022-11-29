const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const LatLngSchema = new Schema({
    lat: Number,
    lng: Number
})

const LatLng = model('LatLng', LatLngSchema);

module.exports = {
    LatLng
}
