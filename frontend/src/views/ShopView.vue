<script>
import axios from "axios";

export default {
  name: "MoviesCatalog",
  data() {
    return {
      movies: [], // Liste des films
      cinemas: [], // Liste des cinémas associés
    };
  },
  mounted() {
    // Récupération des films et cinémas depuis le backend
    this.fetchMovies();
    this.fetchCinemas();
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
    fetchCinemas() {
      axios
        .get("http://localhost:8000/api/cinemas") // Adaptez l'URL selon votre API
        .then((response) => {
          this.cinemas = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des cinémas :", error);
        });
    },
    getCinemaName(cinemaId) {
      const cinema = this.cinemas.find((cinema) => cinema.id === cinemaId);
      return cinema ? cinema.name : "Unknown Cinema";
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
        <p><strong>Synopsis:</strong> {{ movie.synopsis }}</p>
        <p><strong>Duration:</strong> {{ movie.duration }} minutes</p>
        <p><strong>Cinema:</strong> {{ getCinemaName(movie.cinemaId) }}</p>
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
