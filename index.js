require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

const Person = require("./mongo");
// / app.use(morgan("tiny"));.....default morgan specification

morgan.token("body", (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body :http-version"
);

app.use(morganMiddleware);

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

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

app.get("/api/persons", (request, response) => {
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

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send("<h1>Error 404</h1>");
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person, index) => person.id !== id);
  request.status(204).end();
});

app.post("/api/persons", (request, response) => {
  let body = request.body;
  console.log(body);
  if (!body.name && !body.number) {
    return response.status(400).json({ error: "missing name" });
  }

  const person_ = new Person({
    name: body.name,
    number: body.number,
  });

  persons = persons.concat(person_);
  response.json(person_);

  person_.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
