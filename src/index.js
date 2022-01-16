const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("working! 🌱⛈");
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
