const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email :  {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        require : true
    }
})

//before saving the user details into the DB , we hash the pwd 
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user",userSchema)

module.exports = User