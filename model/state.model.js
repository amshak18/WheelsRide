const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const StateSchema = new Schema({
    stateName: String
})

const State = model('State', StateSchema);

module.exports = {
    State
}
