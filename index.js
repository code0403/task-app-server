const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/user.routes")
const { auth } = require("./middlewares/user.auth")
const { taskRouter } = require("./routes/task.routes")



const app  = express()
app.use(express.json())

app.use(cors())

app.use("/users", UserRouter)

app.use(auth)  // Middleware
app.use("/tasks", taskRouter)


app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log(`Connected to MongoDb`)
    } catch (error) {
       console.log(error)
       console.log(`Cannot Connect to MongoDb`) 
    }

    console.log(`Server is running at`, process.env.PORT)
})