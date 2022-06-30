import express from "express"
const router = express.Router()

router.route("/").get((req,res)=> res.send("first route"))

export default router