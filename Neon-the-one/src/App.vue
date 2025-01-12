<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderBar from "./components/HeaderBar.vue";


</script>

<template>
  <HeaderBar :user="user" class="bar"  :cart="this.cart" @buy="this.cart= []; this.cart={}" @add-to-cart="addToCart($event)"/>

  <RouterView @AddToCart="purchase" :user="user"/>
</template>
<script>

import {jwtDecode} from "jwt-decode";
import axios from "axios";

export default {
  components: {
    RouterLink,
    RouterView,
    HeaderBar,
  },
  data() {
    return {
      /*define a user object*/
      user: {
        name: "John Doe",
        id: 1,
        admin: false  ,
      },
      /*define an array of articles*/
      cart_brut : {},
      cart : [],
    };
  },
  mounted() {
    var token = localStorage.getItem('token')
    if(token){
      const decoded = jwtDecode(token);
      console.log(decoded)
      this.user.name = decoded.name
      this.user.id = decoded.userId
      try {
        axios.get('http://localhost:4000/api/panier/' + this.user.id)
        .then(response => {
          this.cart_brut = JSON.parse(response.data)
          console.log(JSON.parse(response.data))

          this.cart = []
          for (let [key, value] of Object.entries(this.cart_brut)) {
            axios.get('http://localhost:4000/api/prods/' + key)
                .then(response => {
                  this.cart.push({product : response.data[0], qty : value})
                }).catch(error => {
              console.log(error)
            })
          }


        }).catch(error => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    purchase(article, qty) {
      if(this.cart_brut[article]){
        this.cart_brut[article] += qty
      }
      else{
        this.cart_brut[article] = qty
      }
      console.log(this.cart_brut)
      this.cart = []
      for (let [key, value] of Object.entries(this.cart_brut)) {
        axios.get('http://localhost:4000/api/prods/' + key)
        .then(response => {
          this.cart.push({product : response.data[0], qty : value})
        }).catch(error => {
          console.log(error)
        })
      }
      console.log(this.cart)
      this.updatePanier(this.cart_brut)
    },
    updatePanier(cart){
      console.log(cart)
      axios.put('http://localhost:4000/api/panier/' + this.user.id, {product : JSON.stringify(cart)})
      .then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addToCart(article){
      var id= article[0]
      var qty = article[1]
      console.log(id)
      if(this.cart_brut[id]=== 1 && qty === -1){
        delete this.cart_brut[id]
      }
      else{

        this.cart_brut[id] = parseInt(this.cart_brut[id])  +  parseInt(qty)
      }
      console.log(this.cart_brut)
      this.cart = []
      for (let [key, value] of Object.entries(this.cart_brut)) {
        axios.get('http://localhost:4000/api/prods/' + key)
        .then(response => {
          this.cart.push({product : response.data[0], qty : value})
        }).catch(error => {
          console.log(error)
        })
      }
      console.log(this.cart)
      this.updatePanier(this.cart_brut)
    }
  },
};
</script>
<style scoped>
.bar{
  margin-bottom:0px;
}
</style>
