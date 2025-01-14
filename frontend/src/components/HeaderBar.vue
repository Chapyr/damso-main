<template>
  <div>
    <header class="header">
      <div class="wrapper">
        <h1>Movie</h1>
        <h2>TIME</h2>
      </div>

      <nav>
        <button v-if="connected" @click="logout" class="logout">Logout</button>
        <RouterLink to="/login" v-if="!connected">Login</RouterLink>
        <RouterLink to="/register" v-if="!connected">Register</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/add-cinema" v-if="user?.admin">Add Cinema</RouterLink>
        <RouterLink to="/add-movie" v-if="user?.admin">Add Movie</RouterLink>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      connected: false,
    };
  },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.connected = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.connected = false;
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.wrapper {
  font-family: "Tilt Neon", sans-serif;
  padding: 0 30px;
}

h1 {
  margin-bottom: 0px;
  font-size: 40px;
}

h2 {
  margin-top: 0px;
  color: #ff6088;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid #9d9d9d;
  background-color: #222222;
  color: white;
  margin-bottom: 0px;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  color: white;
}

a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  margin-right: 50px;
  margin-left: 50px;
}

a:hover {
  color: #ff6088;
  border-bottom: #ff6088 2px solid;
  transform: translate(0, -2px);
  transform: scale(1.15);
  transition: all 0.1s ease-in-out;
}

button {
  background-color: #ff6088;
  border: none;
  font-size: 20px;
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
}

button:hover {
  background-color: #9d9d9d;
  color: black;
  transition: all 0.1s ease-in-out;
}

.logout {
  border-radius: 15px;
  margin: 2% 2%;
}
</style>
