<template>
<div id="home">
  <div id="topheader">
    <HeaderNavBar />
    <div class="image-container">
      <img class="background-image" src="../assets/image/long-boye7.jpg">
      <h2> Arduino &amp; Raspberry Pi Weather Station </h2>
    </div>
    <div class="container-fluid" id="bananentering">
      <div class="p-3 mb-2 bg-light text-dark" id="welcome-text">
        Welcome to <b>ArduinoWeather</b>, a small website showcasing IoT data. <br>
        The data consists of weather inside my home from multiple sensors, as well as temperature from an external API.<br>
        I used the BMP280, DHT11 and DS18B20 sensor to measure temperature, humidity, pressure et cetera.
      </div>
    </div>
  </div>
  <router-view></router-view>
  <Footer />
</div>
</template>

<script>
import HeaderNavBar from '@/components/HeaderNavBar.vue'
import CurrentView from '@/views/CurrentView.vue'
import GraphView from '@/views/GraphView.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    HeaderNavBar,
    CurrentView,
    GraphView,
    Footer
  }
}
</script>

<style>
body {
  background: white;
}
.background-image {
  max-width: 100%;
  height: auto;
  position: relative;
}

.image-container {
  position: relative;
}

.image-container img {
  max-width: 100%;
  height: auto;
  position: relative;
}

.image-container h2 {
  font-size: 30px;
  color: white;
  text-shadow: 1px 1px 1px black;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  /* iOS */
  transform: translate(-50%, -50%);
}

.router-link-exact-active {}

#bananentering {
  padding-left: 0px;
  padding-right: 0px;
}

@media (min-width: 768px) and (max-width: 979px) {
  .image-container h2 {
    font-size: 23px;
    padding-bottom: 10px;
  }

  .image-container img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    position: relative;
  }
}

@media (max-width: 767px) {
  .image-container h2 {
    font-size: 18px;
    padding-bottom: 5px;
  }

  .image-container img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    position: relative;
  }
}

@media (max-width: 480px) {
  .image-container h2 {
    font-size: 16px;
  }

  #welcome-text {
    font-size: 15px;
  }

}
</style>
