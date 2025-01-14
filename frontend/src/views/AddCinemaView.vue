<script>
import axios from "axios";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "AddCinemaView",
  components: { InputComponent },
  data() {
    return {
      cinema: {
        name: "",
        address: "",
        capacity: null,
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    addCinema() {
      axios
        .post("http://localhost:8000/api/cinemas", this.cinema)
        .then((response) => {
          if (response.status === 201) {
            this.successMessage = "Cinema added successfully!";
            this.resetForm();
          }
        })
        .catch((error) => {
          this.errorMessage = "Failed to add cinema.";
          console.error("Error:", error);
        });
    },
    resetForm() {
      this.cinema = {
        name: "",
        address: "",
        capacity: null,
      };
    },
  },
};
</script>

<template>
  <div class="add-cinema">
    <h1>Add a Cinema</h1>
    <form @submit.prevent="addCinema">
      <InputComponent name="Cinema Name" v-model="cinema.name" />
      <InputComponent name="Address" v-model="cinema.address" />
      <InputComponent name="Capacity" type="number" v-model="cinema.capacity" />
      <button type="submit">Add Cinema</button>
    </form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.add-cinema {
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
