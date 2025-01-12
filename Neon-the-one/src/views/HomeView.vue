
<template>
  <main>
    <h1 style="text-align: left; margin-left: 20px;">
  Cinema Fans: <br />
  Make your choice!
</h1>

    <button class="neonbutton" @click="this.$router.push('/shop')">Your film</button>
    <img src="../assets/MovieTime.png" alt="" />
    <section class="first">
      <h2>Our review</h2>
      <p class="description">
        Welcome to our vibrant online store and review site, born from the dedication and passion of six enterprising students. 
        Discover a curated collection of movies from all ages, for everyone <br> <br>
        Our website is more than just an online shop; it's a celebration of cinema and design, meticulously crafted to bring the magic of the silver screen into your space.
        Created as a school project, our platform delivers a seamless shopping experience, reflecting our dedication to excellence in both academics and entrepreneurship.

        Browse through our curated collection movies, each carefully stored to share the essence of iconic actors, legendary directors, and unforgettable cinematic moments. From classics to modern blockbusters, our selection is tailored for film enthusiasts and collectors alike.
        As students, we have poured our creativity and passion into designing an intuitive and visually captivating online shop, ensuring every customer enjoys an effortless journey from browsing to purchase.
        Our project is a testament to our love for cinema, our commitment to quality, and our drive to share the beauty of storytelling through light and design. <br> <br>
        Join us in celebrating the magic of cinema trough our platform, designed to help you pick your movie on a friday night  but also sahre the passion and nostalgia of true film enthusiasts.  
        Thank you for supporting our school project turned passion project!
      </p>
    </section>
    <section class="second">
      <h2>Our team</h2>
      <div class="wrapper">
        <div class="profile">
          <h3>Charles & Eyfeline</h3>
          <p>
            Enter Charles and Eyfeline, two students captivated by the art of cinema and the magic of storytelling. <br>
            Their shared passion for movies drives their dedication to curating the finest collection of neon signs inspired by iconic films and legendary directors. <br>
            Charles and Eyfeline bring a unique blend of creativity and attention to detail, ensuring that each product resonates with movie lovers and enthusiasts alike. <br>
            Their deep appreciation for well-directed masterpieces shines through in every aspect of their work, making their online shop a must-visit destination for those who cherish the beauty of cinema. <br>
            With Charles and Eyfeline at the helm, their commitment to celebrating the world of movies is evident in every meticulously crafted piece.
          </p>
        </div>
        <div class="profile">
          <h3>Mathieu & Julien</h3>
          <p>
            Meet Mathieu and Julien, the dynamic duo behind our team. <br>
            As action movie enthusiasts, they are visionaries driven by their passion for fast-paced storytelling and thrilling cinematic experiences. <br>
            Their love for the genre fuels their creativity, enabling them to design and curate a collection that captures the energy and excitement of action films. <br>
            Mathieu and Julien’s combined dedication ensures that our online shop operates seamlessly, as they channel their passion for movies into every detail of the customer experience.   <br>
            With their shared enthusiasm and commitment, they are the architects of a platform that celebrates the adrenaline and artistry of action cinema.
          </p>
        </div>
        <div class="profile">
          <h3>Youness & Matteo</h3>
          <p>
            Meet Youness and Matteo, the creative minds behind our team. <br>
            As fans of scary movies, they share a passion for the thrill of horror and the joy of watching spine-chilling films with friends. <br>
            Their love for the genre inspires them to curate a collection that captures the eerie and exciting essence of horror cinema. <br>
            Youness and Matteo bring their creativity and dedication to every aspect of the shop, ensuring a seamless and captivating experience for fellow horror enthusiasts. <br>
            With their shared passion and teamwork, they’ve built a platform that celebrates the chills, thrills, and camaraderie of scary movie nights. 
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
h1 {
  margin-top: 0px;
  padding-top: 10%;
  margin-left: 10%;
  font-size: 70px;
  font-family: "Tilt Neon", sans-serif;
  color: white;
}
img {
  width: 50%;
  height: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  object-fit: cover;
  z-index: 1;
}
main {
  background-color: black;
  margin: 0px;
}
button {
  background: none;
  border: none;
  color: #ff6088;
  margin-left: 10%;
  margin-top: 5%;
  font-size: 30px;
  border: 2px solid #ff6088;
  padding: 10px 30px;
  text-shadow:
    /* White glow */ 0 0 7px #ff6088, 0 0 10px #ff6088;
  box-shadow: 
    /* White glow */ 0 0 7px #ff6088, 0 0 10px #ff6088;
}
button:hover {
  color: white;
  transform: scale(1.1);
  transition: all 0.1s ease-in-out;
}
.first {
  margin-top: 20%;
  background-color: #222222;
  padding: 10%;
}
.second {
  background-color: #222222;
  padding: 10%;
}
h2 {
  color: #ff6088;
  font-size: 50px;
  font-family: "Tilt Neon", sans-serif;
}
p {
  color: white;
  font-size: 20px;
  font-family: "Tilt Neon", sans-serif;
  text-align: justify;
}
.wrapper {
  width: 90%;
  display: flex;
  flex-direction: row;
}
.profile {
  width: 70%;
  height: 100%;
  background-color: #ff6088;
  padding: 2%;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin:5px;
  font-family: "Tilt Neon", sans-serif;
  color: white;
}
.description {
  width: 70%;
  text-align: justify;
}
</style>
