const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.status(200).json("hello 🌱⛈");
});

app.get("/v1/api", async (req, res) => {
  const data = await axios.get("http://localhost:5000/all");
  const items = data.data;

  // console.log(data.data);
  res.status(200).json(items);
});

app.post("/add", async (req, res) => {
  // res.json("/add works");
  await axios({
    method: "post",
    url: "http://localhost:5000/all",
    headers: { "X-Custom-Header": "value" },

    data: {
      firstName: "Finn",
      lastName: "Williams",
    },
  });
});

console.log("hello world");
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
