<template>
  <div class="shop">
    <h1>Welcome to our Catalogue</h1>
    <div class="shopgrid">
      <div
        class="article"
        v-for="(article) in articles"
        :key="article.index"
        :style="{
          boxShadow:
            '0 0 7px ' +
            article.color +
            ', 0 0 10px ' +
            article.color +
            ', 0 0 20px ' +
            article.color,
        }"
      >
        <img :src="article.img" alt="" class="panier" />
        <div class="infos">
          <div class="tittle">
            <h3>{{ article.name }}</h3>
            <p :style="{ color: article.color }">{{ article.price }}€</p>
          </div>
          <p>{{ article.description }}</p>
          <button
            @click="$emit('add-to-cart', article._id, 1 )"
            :style="{
              boxShadow:
                '0 0 7px ' +
                article.color +
                ', 0 0 10px ' +
                article.color +
                ', 0 0 20px ' +
                article.color,
                borderColor: article.color,
                Hover: {
                  color: article.color,
                },
            }"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import axios from "axios";


export default {
  name: "ShopView",
  data() {
    return {
      /*define an array of articles*/
      articles: [],
    };
  },
  mounted(){
    axios.get('http://localhost:4000/api/prods')
    .then(response => {
        this.articles = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }
};
</script>

<style scoped>
h1 {
  color: white;
}
.shop {
  padding: 0% 5%;

}
.shopgrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
}
img {
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.article {
  background-color: rgba(0, 0, 0, 0.35);
  margin: 5%;
  border-radius: 20px;
  box-shadow: 
    /* White glow */ 0 0 7px #ff6088, 0 0 10px #ff6088,
    0 0 20px #ff6088;
  height: 100%;
}
.article:hover {
  transform: scale(1.005);
  z-index: 0;
  transition: all 0.1s ease-in-out;
}
.infos {
  margin-top: -5px;

  height: 40%;
  border-radius: 0 0 20px 20px;
  padding: 15px;
}
h3 {
  margin-top: 0px;
  color: white;
  font-size: 30px;
  margin-bottom: 0px;

  letter-spacing: 2px;
}
.tittle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /*align the items in the center
  */
  align-items: center;
}
.tittle p {
  margin-top: 0px;

  font-size: 30px;
  margin-bottom: 0px;
}
p {
  color: white;
}
a {
  text-decoration: none;
}
.infos button {
  float: right;
  background: none;
  border-radius: 10px;
  font-size: 30px;
  padding: 5px 15px;
  border: 2px solid #ff6088;
  box-shadow: 
    /* White glow */ 0 0 2px #ff6088, 0 0 20px #ff6088;
  margin-bottom: 20px;
  color: white;


}
button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
