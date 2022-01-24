require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const axios = require("axios");
const Person = require("../models/Person");
//
const Redis = require("redis");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.get(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

const redis = Redis.createClient();

app.get("/", async (req, res) => {
  if (!redis.isOpen) {
    await redis.connect();
  }
  const profiles = await redis.get("profiles");
  if (!profiles) {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos/"
    );
    const dataRedis = await redis.setEx("profiles", 5, JSON.stringify(data));
    return res.status(200).json(dataRedis);
  } else {
    const data = await redis.get("profiles");
    const dataFormated = JSON.parse(data);
    return res.status(200).json(dataFormated);
  }
});

app.listen(PORT, () => console.log(`server listening`));

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log(`connected to MONGODB!`);
//     app.listen(PORT, () => {
//       console.log(`listening to port ${PORT}`);
//     });
//   })
//   .catch((e) => console.log(e));

// app.post("/person", async (req, res) => {
//   const { name, salary, approved } = req.body;

//   if (!name && !salary && !approved) {
//     res.status(422).json({ error: "All the fields are obligatory!" });
//   }

//   const person = {
//     name,
//     salary,
//     approved,
//   };

//   try {
//     const p = await Person.create(person);
//     res.status(201).json({ person });
//     // res.status(201).json({ message: "Person inserted to db sucessufuly" });
//   } catch (error) {
//     console.error(error);
//     //not a good thing to send the error message to the api
//     res.status(500).json({ error: error });
//   }
//   // res.json({ message: "hello world from post" });
// });

// app.get("/all", async (req, res) => {
//   if (req.method === "post") {
//     console.log(req.body);
//     res.json({ message: "post!" });
//   }

//   const data = await Person.find({});
//   res.json({ data });
// });

// app.get("/filter", async (req, res) => {
//   const data = await (
//     await Person.find({})
//   ).filter((item) => parseInt(item.salary) > 3000);

//   if (Object.keys(data).length > 0) {
//     res.status(200).json(data);
//   }

//   res.status(404).json({ message: "no data found" });
// });
