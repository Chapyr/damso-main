<script>
import axios from "axios";

export default {
  name: "OrderView",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orders: [],
      order_traite: [],
    };
  },
  mounted() {

    axios
      .get("http://localhost:8000/api/movies/" + this.user.id)
      .then((response) => {
        this.orders = JSON.parse(response.data);
        console.log(this.orders);
        console.log(this.user.id);
        for (let i = 0; i < this.orders.length; i++) {
          /*for key/value*/
          console.log(this.orders);
          for (let [key, value] of Object.entries(this.orders[i])) {
            axios
              .get("http://localhost:8000/api/prods/" + key)
              .then((response) => {
                this.order_traite.push({
                  product: response.data[0],
                  qty: value,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<template>
  <div class="order">
    <h1>Previous orders</h1>
    <div class="orders">
      <div class="order-card" v-for="order in this.order_traite">
        <div class="infos">
          <div class="tittle">
            <h3>product : {{ order.product.name }}</h3>
            <p>price : {{ order.product.price }}€</p>
          </div>
          <p> quantity : {{ order.qty }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}

.order {
  padding: 0% 5%;
}

.orders {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #ff6088;
  border-radius: 15px;
}

.order {
  width: 80%;
  margin: 2%;
  padding: 5% 5%;

}
.order-card{
  width: 80%;
  margin: 2%;
  background-color: white;
  padding: 5% 5%;
  border-radius: 25px;
}

.tittle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h3 {
  margin-bottom: 0px;
}

p {
  margin-top: 0px;
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