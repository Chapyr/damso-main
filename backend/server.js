const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chargement de la base de données
let db = JSON.parse(fs.readFileSync("db.json", "utf8"));

// Fonction pour sauvegarder les données dans db.json
const saveDatabase = (data) => {
  try {
    const filePath = path.join(__dirname, "db.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Erreur lors de la sauvegarde dans db.json :", err);
    throw err;
  }
};

// 1. Utilisateurs

app.post("/api/users", async (req, res) => {
  const { name, password, city } = req.body;
  if (!name || !password || !city) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const userExists = db.users.find((user) => user.name === name);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1,
    name,
    password: hashedPassword,
    city,
  };

  db.users.push(newUser);
  saveDatabase(db);
  res.status(201).json(newUser);
});


// 2. Cinémas
app.get("/api/cinemas", (req, res) => {
  res.json(db.cinemas);
});

app.post("/api/cinemas", (req, res) => {
  const { name, city, capacity } = req.body;

  if (!name || !city || !capacity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newCinema = {
    id: db.cinemas.length > 0 ? db.cinemas[db.cinemas.length - 1].id + 1 : 1,
    name,
    city,
    capacity,
  };

  db.cinemas.push(newCinema);
  saveDatabase(db);

  res.status(201).json(newCinema);
});

// 3. Films
app.get("/api/movies", (req, res) => {
  res.json(db.movies);
});

app.post("/api/movies", (req, res) => {
  const { title, synopsis, duration, cinemaId, rating } = req.body;

  if (!title || !synopsis || !duration || !cinemaId || !rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newMovie = {
    id: db.movies.length > 0 ? db.movies[db.movies.length - 1].id + 1 : 1,
    title,
    synopsis,
    duration,
    cinemaId,
    rating,
  };

  db.movies.push(newMovie);
  saveDatabase(db);

  res.status(201).json(newMovie);
});

// 4. Notes
app.get("/api/ratings", (req, res) => {
  res.json(db.ratings);
});

app.post("/api/ratings", (req, res) => {
  const { userId, movieId, score } = req.body;

  if (!userId || !movieId || !score) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newRating = {
    id: db.ratings.length > 0 ? db.ratings[db.ratings.length - 1].id + 1 : 1,
    userId,
    movieId,
    score,
  };

  db.ratings.push(newRating);
  saveDatabase(db);

  res.status(201).json(newRating);
});

// 5. Authentification
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  const user = db.users.find((user) => user.name === name);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
