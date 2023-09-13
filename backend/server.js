const express = require('express');
const app = express();
const port = 9090;
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const jarouters = require('./src/JA/routers.js');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static("/index.html"))

app.use(express.static("frontend"))
app.use("/api/v1/JA",jarouters);



app.listen(port,() =>console.log(`this backend has started in the port ${port}`));