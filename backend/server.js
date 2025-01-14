const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chargement de la base de données
let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

// Routes

// 1. Utilisateurs
app.get("/api/users", (req, res) => {
  res.json(db.users);
});

app.post("/api/users", (req, res) => {
  const newUser = { id: db.users.length + 1, ...req.body };
  db.users.push(newUser);
  res.status(201).json(newUser);
});

// 2. Cinémas
app.get("/api/cinemas", (req, res) => {
  res.json(db.cinemas);
});

app.post("/api/cinemas", (req, res) => {
  const newCinema = { id: db.cinemas.length + 1, ...req.body };
  db.cinemas.push(newCinema);
  res.status(201).json(newCinema);
});

// 3. Films
app.get("/api/movies", (req, res) => {
  res.json(db.movies);
});

app.post("/api/movies", (req, res) => {
  const newMovie = { id: db.movies.length + 1, ...req.body };
  db.movies.push(newMovie);
  res.status(201).json(newMovie);
});

// 4. Notes
app.get("/api/ratings", (req, res) => {
  res.json(db.ratings);
});

app.post("/api/ratings", (req, res) => {
  const newRating = { id: db.ratings.length + 1, ...req.body };
  db.ratings.push(newRating);
  res.status(201).json(newRating);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
