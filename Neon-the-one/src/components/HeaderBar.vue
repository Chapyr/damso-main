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
      <RouterLink to="/shop" v-if="!this.user.admin">Shop</RouterLink>
      <RouterLink to="/about" v-if="!this.user.admin">About</RouterLink>
      <RouterLink to="/admin" v-if="this.user.admin">Shop</RouterLink>
      <RouterLink to="/admin/create" v-if="this.user.admin">new product</RouterLink>
    </nav>


    <button @click="buy" class="logout">Buy</button>

    <div class="wrapper_panier" @click="ShowPanier = !ShowPanier;">
      <img src="../assets/panier.png" alt="" class="panier" />
      <p>{{cart.length}} item</p>
    </div>

  </header>
    <div v-if="ShowPanier" class="panierPanel" >
      <div v-for="(item, index) in cart" :key="index" class="panierRow">
        <div>
          <p>{{item.product.name}}</p>
          <p>{{item.product.price}}€</p>
        </div>
        <div class="number">
          <button @click="$emit('add-to-cart', [item.product._id, -1])" class="button2">-</button>
          <p class="qty">{{item.qty}}</p>
          <button @click="$emit('add-to-cart', [item.product._id, 1])" class="button2">+</button>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HeaderBar",
  data() {
    return {
      ShowPanier: false,
      panier: [],
      connected: false,
    };
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if(localStorage.getItem('token')){
      this.connected = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.connected = false;
      this.$router.push({name: 'login'})

    },
    buy() {
      var bool = confirm("Are you sure you want to buy your cart? Remeber to log in before you buy! If you are not logged in, your cart will be lost")
      if(!bool){
        return
      }


      axios.get("http://localhost:4000/api/panier/" + this.user.id)
.then(response => {
        this.panier = JSON.parse(response.data)
        if (this.panier == null) {
          alert("Your cart is empty")
          return
        }

       axios.post('http://localhost:4000/api/orders/', {product : this.panier, user : this.user.id})
        .then(response => {
          console.log(response.data)
          axios.get('http://localhost:4000/api/emptyPanier/' + this.user.id)

          this.$router.push({name: 'orders'})
          this.$emit('buy')
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
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
  justify-content: space-between; /* Add this line */
  border-bottom: 2px solid #9d9d9d;
  background-color: #222222;
  color: white;
  margin-bottom:0px;
}

.panier {
  width: 50px;
  height: 50px;
}
.panier:hover {
  transform: scale(1.2);
  transition: all 0.1s ease-in-out;
}

.wrapper_panier {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  width: 8%;
  background-color: #9d9d9d;
  z-index: 1;
}
.wrapper_panier:hover {
  background-color: #ff6088;
  transition: all 0.1s ease-in-out;
}
.wrapper_panier:hover * {
  transform: scale(1.2);
  transition: all 0.1s ease-in-out;
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
.panierPanel {
  width: 20%;
  height: 50%;
  position: absolute;
  right: 0;
  margin-right: 20px;
  margin-top: 10px;
  z-index: 1;
  background-color: antiquewhite;
  overflow-y: scroll;



}
.panierRow{
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: #222222 2px solid;
  display: flex;
  flex-direction: row ;
  justify-content: space-between;
  font-size: 34px;
}
.panierRow .qty{
  float: right;
}

button{
  background-color: #ff6088;
  border: none;

  font-size: 30px;
  padding: 5px 75px;


  color: white;
}
button:hover{
  background-color: #9d9d9d;
  color: black;
  transition: all 0.1s ease-in-out;
}
.number{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button2{
  background-color: #ff6088;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 30px;
  padding: 5px 5px;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
}
.logout{
  border-radius: 15px;
  margin: 2% 2%;
}
</style>