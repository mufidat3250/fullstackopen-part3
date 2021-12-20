require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.PASS_WORD);

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node index.js <password>"
  );
  process.exit(1);
}
const password = process.argv[2];
const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

///dont understand this yet
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("People", personSchema);

module.exports = Person;
