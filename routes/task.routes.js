const express = require("express");
const taskRouter = express.Router();
const jwt = require("jsonwebtoken");
const { TaskModel } = require("../models/task.model");
const { authRoleMiddleware } = require("../middlewares/admin.auth");
const dotenv = require('dotenv')
dotenv.config()


taskRouter.get("/", async (req, res) => {

    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    try {
      if(decoded){
        const tasks = await TaskModel.find({"userID":decoded.userID})
        res.status(200).send(tasks)
      }
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg": error.message}) 
    }
})

taskRouter.get("/:taskID", async (req, res) => {

  const {taskID} = req.params
  const token = req.headers.authorization
  const decoded = jwt.verify(token, process.env.SECRET_KEY)

  try {
    if(decoded){
      const tasks = await TaskModel.find({_id:taskID})
      res.status(200).send(tasks)
    }
  } catch (error) {
      console.log(error);
      res.status(400).send({"msg": error.message}) 
  }
})


taskRouter.post("/add" ,async (req, res) => {
    try {
     const task = new TaskModel(req.body)
     await task.save()
     res.status(200).send({"msg": "New Task Has Been Added"})
    } catch (error) {
      console.log(error);
      res.status(400).send({"msg": error.message})
    } 
 })



 taskRouter.patch("/update/:taskID" ,  async (req, res) => {

  const {taskID} = req.params
  const payload = req.body
  const token =  req.headers.authorization
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  const req_id = decoded.userID
  const task = await TaskModel.find({_id:taskID})
  const userID_in_task = task[0].userID

  try {
    if(req_id  === userID_in_task){
      const task =  await TaskModel.findByIdAndUpdate({_id:taskID}, payload)
      res.status(200).send({"msg" : `Task with id:${taskID} has been updated`})
    } else {
      res.status(403).send({"msg": "You are not authorized to update this task"})
    }
  } catch (error) {
    res.status(400).send({"msg": error.message})
  }  
})



taskRouter.delete("/delete/:taskID" ,async (req, res) => {

  const {taskID} = req.params
  const token =  req.headers.authorization
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  const req_id = decoded.userID
  const task = await TaskModel.find({_id:taskID})
  const userID_in_task = task[0].userID

  try {

    if(req_id  === userID_in_task){
      const taskDeleted = await TaskModel.findByIdAndDelete({_id:taskID})
      res.status(200).send({"msg" : `Task with id:${taskID} has been deleted`})
    } else {
      res.status(403).send({"msg": "You are not authorized to delete this note"})
    }
    
  } catch (error) {
    res.status(400).send({"msg": error.message})
  }
    
})

module.exports = { taskRouter }; 