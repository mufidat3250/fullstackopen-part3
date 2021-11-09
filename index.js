const { request, response } = require("express");
const express = require("express");

const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  const person = request.body;
  console.log(person);
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phone book has information for ${
      persons.length
    } people</p> ${new Date()}`
  );
  response.json(persons);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
