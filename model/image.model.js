const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const ImageSchema = new Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

const Image = model('Image', ImageSchema);

module.exports = {
    Image
}
