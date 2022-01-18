const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;
// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
