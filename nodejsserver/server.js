const express = require('express');
const cors = require('cors');
const connBD = require('./db/connDb');
require('dotenv').config();
const customerRouter = require("./Routers/customerUser")

const PORT =  process.env.PORT || 5000;
const app = express();


app.use(cors());

app.use(express.json());
app.use(customerRouter);

connBD();

app.listen(PORT, () =>{console.log(`listening on http://localhost:${PORT}/ 🔥`);});