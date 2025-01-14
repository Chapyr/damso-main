<script>
import axios from "axios";
import InputComponent from "@/components/InputComponent.vue";

export default {
  name: "RegisterView",
  components: { InputComponent },
  data() {
    return {
      user: {
        name: "",
        password: "",
        city: "", // Champ "Ville"
      },
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8000/api/register", this.user)
        .then((response) => {
          if (response.status === 201) {
            alert("User created successfully!");
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              alert("Bad request: " + error.response.data.message);
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
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <InputComponent name="Username" v-model="user.name" />
      <InputComponent name="Password" type="password" v-model="user.password" />
      <InputComponent name="City" v-model="user.city" /> <!-- Champ Ville -->
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register {
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
