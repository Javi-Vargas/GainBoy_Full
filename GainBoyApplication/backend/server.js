//configuring express server and specify routes
import express from "express"
import cors from "cors"
import workout from "./api/workouts.route.js"

//make our express app
const app = express()
//apply middleware
app.use(cors())
app.use(express.json())

//go to the initial url -> workout page n
app.use("/api/v1/workouts",workout) //inital url
//go to unknown/undefined route -> 404 page
app.use("*", (req, res)=> res.status(404).json({error: "not found"}))

export default app