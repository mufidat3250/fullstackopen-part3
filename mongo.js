require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.PASS_WORD);

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://mufidat:${password}@cluster0.bhkys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("People", personSchema);

module.exports = Person;
