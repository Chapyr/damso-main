<script>
import InputComponent from "@/components/InputComponent.vue";
import axios from "axios";

export default {
  name: "LoginView",
  components: { InputComponent },
  data() {
    return {
      user: {
        name: "",
        password: "",
        city: "", // Ajout du champ "ville"
      },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8000/api/login", this.user)
        .then((response) => {
          if (response.status === 200) {
            // Stockage du token et redirection
            localStorage.setItem("token", response.data.token);
            console.log("Token:", response.data.token);
            this.$router.push({ name: "home" }); // Mise à jour pour rediriger vers une route appropriée
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
              console.error("Unexpected error:", error.response.data);
            }
          } else {
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
      <InputComponent name="City" v-model="user.city" /> <!-- Nouveau champ -->
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
</style>
