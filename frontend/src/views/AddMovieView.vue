<script>
import axios from "axios";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "AddMovieView",
  components: { InputComponent },
  data() {
    return {
      movie: {
        title: "",        // Titre du film
        synopsis: "",     // Synopsis
        duration: null,   // Durée en minutes
        cinemaId: "",     // Identifiant du cinéma associé
        rating: null,     // Note initiale
      },
      cinemas: [],        // Liste des cinémas disponibles
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    // Récupération de la liste des cinémas pour les associer aux films
    this.fetchCinemas();
  },
  methods: {
    fetchCinemas() {
      axios
        .get("http://localhost:8000/api/cinemas")
        .then((response) => {
          this.cinemas = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des cinémas :", error);
        });
    },
    addMovie() {
      // Validation minimale
      if (!this.movie.title || !this.movie.cinemaId || !this.movie.rating) {
        this.errorMessage = "All fields are required.";
        return;
      }

      axios
        .post("http://localhost:8000/api/movies", this.movie)
        .then((response) => {
          if (response.status === 201) {
            this.successMessage = "Movie added successfully!";
            this.resetForm();
          }
        })
        .catch((error) => {
          this.errorMessage = "Failed to add movie.";
          console.error("Error:", error);
        });
    },
    resetForm() {
      this.movie = {
        title: "",
        synopsis: "",
        duration: null,
        cinemaId: "",
        rating: null,
      };
    },
  },
};
</script>

<template>
  <div class="add-movie">
    <h1>Add a Movie</h1>
    <form @submit.prevent="addMovie">
      <InputComponent name="Movie Title" v-model="movie.title" />
      <InputComponent name="Synopsis" v-model="movie.synopsis" />
      <InputComponent name="Duration (in minutes)" type="number" v-model="movie.duration" />
      <label for="cinema">Select Cinema:</label>
      <select v-model="movie.cinemaId" id="cinema" required>
        <option disabled value="">Choose a cinema</option>
        <option v-for="cinema in cinemas" :key="cinema.id" :value="cinema.id">
          {{ cinema.name }}
        </option>
      </select>
      <InputComponent name="Rating (out of 5)" type="number" min="0" max="5" step="0.1" v-model="movie.rating" />
      <button type="submit">Add Movie</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.add-movie {
  padding: 2% 5%;
  text-align: center;
}

form {
  width: 30%;
  margin: 0 auto;
  background-color: #ff6088;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  color: #ff6088;
  font-size: 56px;
  margin-bottom: 20px;
}

label {
  color: white;
  display: block;
  margin: 10px 0 5px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  background-color: #1f1f1f;
  color: #ff6088;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #1f1f1f;
  color: #ff6088;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #ff6088;
  color: white;
  transition: all 0.2s ease-in-out;
}

.success {
  color: #28a745;
  margin-top: 20px;
  font-size: 16px;
}

.error {
  color: #dc3545;
  margin-top: 20px;
  font-size: 16px;
}
</style>

