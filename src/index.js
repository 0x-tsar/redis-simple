const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
// app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "working! 🌱⛈" });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json(`working! -  ${id} 🌱⛈`);
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
