require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Person = require("../models/Person");
//
const Redis = require("redis");

const redis = Redis.createClient();

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
  const { name, salary, approved } = req.body;

  if (!name && !salary && !approved) {
    res.status(422).json({ error: "All the fields are obligatory!" });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const p = await Person.create(person);
    res.status(201).json({ person });
    // res.status(201).json({ message: "Person inserted to db sucessufuly" });
  } catch (error) {
    console.error(error);
    //not a good thing to send the error message to the api
    res.status(500).json({ error: error });
  }
  // res.json({ message: "hello world from post" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "working! 🌱⛈" });
});

app.get("/all", async (req, res) => {
  if (req.method === "post") {
    console.log(req.body);
    res.json({ message: "post!" });
  }

  const data = await Person.find({});
  res.json({ data });
});

app.get("/filter", async (req, res) => {
  const data = await (
    await Person.find({})
  ).filter((item) => parseInt(item.salary) > 3000);

  if (Object.keys(data).length > 0) {
    res.status(200).json(data);
  }

  res.status(404).json({ message: "no data found" });
});

// app.get("/:id", async (req, res) => {
//   // const id = req.params.id;
//   // const data = await Person.findOne(id);
//   // const data = (await Person.find({})).filter((e) => e.name == "john doe 3");
//   const data = (await Person.find({})).filter((e) => e.salary === 3000);
//   // const data = await Person.findById(id);
//   console.log(Object.keys(data).length);
//   if (Object.keys(data).length === 0) {
//     res.json("no results found in the database");
//   }
//   res.json({ data });
// });

// app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   res.status(200).json(`working! -  ${id} 🌱⛈`);
// });

// app.listen(PORT, () => {
//   console.log(`listening to port ${PORT}`);
// });
