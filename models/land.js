const mongoose = require("mongoose")


const landSchema = new mongoose.Schema({
    pin : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required  : true
    },
    landmark : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    }

})

const Land = mongoose.model("land",landSchema)

module.exports = Land