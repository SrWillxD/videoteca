require('dotenv').config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const connectToDatabase = require("./database")
const cors = require("cors");
const app = express();

connectToDatabase();

const port = 3333;
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));