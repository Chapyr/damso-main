<script>
import axios from "axios";

export default {
  name: "MoviesCatalog",
  data() {
    return {
      movies: [
        {
          id: 1,
          title: "Inception",
          description: "A mind-bending thriller where dreams are the battlefield.",
          rating: 4.5,
        },
        {
          id: 2,
          title: "The Dark Knight",
          description: "Batman faces the Joker in this gripping action movie.",
          rating: 5,
        },
        {
          id: 3,
          title: "Interstellar",
          description: "A journey beyond the stars to save humanity.",
          rating: 4.8,
        },
        {
          id: 4,
          title: "Titanic",
          description: "A tragic love story set against the sinking of the Titanic.",
          rating: 4.2,
        },
        {
          id: 5,
          title: "The Matrix",
          description: "A hacker discovers the shocking reality of his world.",
          rating: 4.7,
        },
      ], // Films par défaut
    };
  },
  mounted() {
    // Récupération des films depuis le backend
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      axios
        .get("http://localhost:8000/api/movies") // Adaptez l'URL selon votre API
        .then((response) => {
          if (response.data.length > 0) {
            this.movies = response.data;
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des films :", error);
        });
    },
  },
};
</script>

<template>
  <div class="catalog">
    <h1>Movies Catalog</h1>
    <div class="movies-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= movie.rating }">
            ★
          </span>
          <p>({{ movie.rating }}/5)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  padding: 2% 5%;
  text-align: center;
}

h1 {
  color: #ff6088;
  font-size: 56px;
  margin-bottom: 30px;
}

.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  background-color: #222;
  color: white;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-card h2 {
  margin: 0 0 10px;
  font-size: 24px;
}

.movie-card p {
  font-size: 16px;
  margin: 10px 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.star {
  font-size: 20px;
  color: #ccc;
}

.star.filled {
  color: #ff6088;
}
</style>
