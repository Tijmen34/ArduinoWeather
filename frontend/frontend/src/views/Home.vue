<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->

<template>
<div id="home">
  <div id="topheader">
    <HeaderNavBar />
    <div class="image-container">
      <img class="background-image" src="../assets/image/long-boye6.jpg">
      <h2> Arduino &amp; Raspberry Pi Weather Station </h2>
    </div>
    <div class="container-fluid" id="bananentering">
      <div class="p-3 mb-2 bg-light text-dark">
        Welcome to <b>ArduinoWeather</b>, a simple website showcasing some awesome fucking data. <br>
        You will be able to see the temperature in my house, as well as outside my house. <br>
        Amazing right.
      </div>
    </div>
  </div>
  <CurrentView/>
    <!-- <HelloWorld msg="Welcome to my amazing WeatherStation website!" /> -->
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HeaderNavBar from '@/components/HeaderNavBar.vue'
import CurrentView from '@/views/CurrentView.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld,
    HeaderNavBar,
    CurrentView
  }
}
</script>

<style>
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
  left:  50%;
  -webkit-transform: translate(-50%, -50%); /* iOS */
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

}
</style>
