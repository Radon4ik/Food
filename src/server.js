const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const upload = multer();
app.use(morgan("tiny"));
app.use(express.json());

const users = {};
let id = 1;

app.use(express.static("src"));

app.get("/users", (request, response) => {
  console.log(request.headers);
  response.send(users);
});

app.post("/users", upload.none(), (request, response) => {
  console.log(request);
  const person = {
    id,
    name: request.body.name || request.body.firstName,
    phone: request.body.phone || request.body.lastName,
  };
  id = id + 1;
  users[id] = person;
  response.send(users);
  console.log(users);
});

app.listen(3001, () => {
  console.log("server started");
});
