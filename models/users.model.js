const mongoose = require("mongoose");

const UserShchema = mongoose.Schema({

    name : String,
    role: String,
    email: String,
    password : String,
},{
    versionKey: false
})

const UserModel = mongoose.model("user", UserShchema)

module.exports = { UserModel };