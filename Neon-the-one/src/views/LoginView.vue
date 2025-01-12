<script>
import InputComponent from "@/components/InputComponent.vue";
import axios from "axios";

export default {
  name: "LoginView",
  components: {InputComponent},
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
      axios.post('http://localhost:8000/api/login', this.user)
      .then(response => {
        console.log(response.data)
        /*error 404*/
        if(response.status == 404){
          alert("User not found")
        }
        else{
          /*error 401*/
          if(response.status == 401){
            alert("Wrong password")
          }
          else{
            if(response.status == 200){
              localStorage.setItem('token', response.data.token)
              console.log(response.data.token)
              this.$router.push({name: 'shop'})
            }
          }

        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form action="#">
      <InputComponent name="Username" v-model="user.name" />
      <InputComponent name="Password" type="password" v-model="user.password" />
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  padding: 0% 5%;
}
form{
  width: 30%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff6088;
  padding: 5% 2%;
  border-radius: 15px;
}
h1{
  color: white;
  text-align: center;
  font-size: 56px;
}
button{
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