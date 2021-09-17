const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config");
const fileUpload = require("express-fileupload");

const app = express();

const con = mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
// mongoose.connect;

app.use(express.static("static"));

app.use(express.json());

app.use(fileUpload());

const restaurantsRouter = require("./routers/restaurants");
app.use("/restaurants", restaurantsRouter);

const ngoRouter = require("./routers/ngos");
app.use("/ngos", ngoRouter);

const foodRouter = require("./routers/foods");
app.use("/foods", foodRouter);

const requestRouter = require("./routers/requests");
app.use("/requests", requestRouter);

app.listen(9000, () => {
  console.log("running on server");
});
