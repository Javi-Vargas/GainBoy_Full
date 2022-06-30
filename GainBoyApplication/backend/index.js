//Connect Database and Server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

//acessing data
MongoClient.connect(
    process.env.GAINBOY_DB_URI,
    { //settings
        poolSize: 50, //50 users at a time
        wtimeout: 2500, //2500 ms request times out
        useNewUrlParse: true
    })

    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })

    .then(async client  => 
        {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
