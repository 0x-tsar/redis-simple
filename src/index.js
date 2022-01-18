require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Person = require("../models/Person");
//

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`connected to MONGODB!`);
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((e) => console.log(e));

app.post("/person", async (req, res) => {
  // const { name, age, approved } = req.body;
  console.log(req.body);

  // const { name, salary, approved } = req.body;
  res.status(200).json({ message: "ok" });
  // if (!name) {
  //   res.status(422).json({ error: "name is obligatory" });
  // }
  // const person = {
  //   name,
  //   salary,
  //   approved,
  // };
  // try {
  //   await Person.create(person);
  //   res.status(201).json({ message: "Person inserted to db sucessufuly" });
  //   // const Cat = mongoose.model("Cat", { name: String });
  //   // const kitty = new Cat({ name: "Zildjian" });
  //   // kitty.save().then(() => console.log("meow"));
  // } catch (error) {
  //   console.error(error);
  //   //not a good thing to send the error message to the api
  //   res.status(500).json({ error: error });
  // }
  // res.json({ message: "hello world from post" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "working! 🌱⛈" });
});

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   res.status(200).json(`working! -  ${id} 🌱⛈`);
// });

// app.listen(PORT, () => {
//   console.log(`listening to port ${PORT}`);
// });
