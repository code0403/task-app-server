const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: String,
    description : String,
    userID : String
})

const TaskModel = mongoose.model("task", taskSchema)

module.exports = {TaskModel}