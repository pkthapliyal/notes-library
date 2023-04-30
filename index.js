const express = require('express');
var cors = require('cors')

require('dotenv').config();
const PORT = process.env.PORT;
const { connection } = require('./db');

const app = express();
app.use(cors())


//  Router ;
const { userRoute } = require("./routes/User.route")
const { noteRoute } = require("./routes/Note.route")


app.use(express.json());

app.use("/users", userRoute);
app.use("/notes", noteRoute);


app.get("/", (req, res) => {
    res.send({ "messege": "Homepage" })

})


//  Database connection
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server is listening at", PORT)

    } catch (error) {
        console.log(error)
    }
})



