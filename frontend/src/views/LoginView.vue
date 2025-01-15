<script>
import axios from "axios";
import InputComponent from "@/components/InputComponent.vue"; // Assurez-vous que ce chemin est correct

export default {
  name: "LoginView",
  components: { InputComponent },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // Validation des champs
      if (!this.user.name || !this.user.password) {
        alert("All fields are required.");
        return;
      }

      // Requête d'authentification
      axios
        .post("http://localhost:8000/api/login", this.user)
        .then((response) => {
          if (response.status === 200) {
            // Stocker le token dans localStorage
            localStorage.setItem("token", response.data.token);

            // Recharger la page
            window.location.reload();
          }
        })
        .catch((error) => {
          // Gestion des erreurs
          if (error.response) {
            if (error.response.status === 404) {
              alert("User not found");
            } else if (error.response.status === 401) {
              alert("Wrong password");
            } else {
              alert("An unexpected error occurred. Please try again.");
              console.error("Unexpected error:", error.response.data);
            }
          } else {
            alert("Could not connect to the server. Please check your connection.");
            console.error("Error:", error.message);
          }
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <InputComponent name="Username" v-model="user.name" />
      <InputComponent name="Password" type="password" v-model="user.password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  padding: 0% 5%;
}
form {
  width: 30%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff6088;
  padding: 5% 2%;
  border-radius: 15px;
}
h1 {
  color: white;
  text-align: center;
  font-size: 56px;
}
button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 50px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #1f1f1f;
  color: #ff6088;
  font-size: 20px;
}
button:hover {
  background-color: #ff6088;
  color: white;
  transition: all 0.1s ease-in-out;
}
</style>
