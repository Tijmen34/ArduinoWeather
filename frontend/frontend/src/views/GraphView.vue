<template>
  <div class="graph-overview">
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'GraphView',
  data () {
    return {
      bmp280: null,
      dht11: null,
      ds18b20: null,
      openweather: null
    }
  },
  created () {
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather: function () {
      axios.get("http://192.168.1.36:3000/api/weather/all")
      .then((resp) => {
        this.bmp280 = resp.data.BMP280
        this.dht11 = resp.data.DHT11
        this.ds18b20 = resp.data.DS18B20
        this.openweather = resp.data.Openweather
        console.log("Request done.")
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>
