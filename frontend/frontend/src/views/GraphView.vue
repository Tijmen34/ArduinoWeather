<template>
  <div class="graph-overview">
    <div class="container-fluid graph-container">
      <div class="row">
        <div class="col-sm-4">
          <div class="average-temp-chart">
            <h2>Average Daily Temperature Per Sensor </h2>
            <TempAverageChart v-if="ds18b20Averages" :labelArray="dateArray" :bmp280Array="bmp280Averages" :dht11Array="dht11Averages" :ds18b20Array="ds18b20Averages"/>
          </div>
        </div>
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import TempAverageChart from '@/components/TempAverageChart.vue'

export default {
  name: 'GraphView',
  components: {
    TempAverageChart
  },
  data () {
    return {
      bmp280: null,
      dht11: null,
      ds18b20: null,
      openweather: null,
      bmp280Averages: null,
      dht11Averages: null,
      ds18b20Averages: null,
      dateArray: null
    }
  },
  created () {
    this.getAllWeather();
  },
  methods: {
    getAllWeather: function () {
      axios.get("http://192.168.1.36:3000/api/weather/all")
      .then((resp) => {
        this.bmp280 = resp.data.BMP280
        this.dht11 = resp.data.DHT11
        this.ds18b20 = resp.data.DS18B20
        this.openweather = resp.data.Openweather
        console.log("Request done.")
        this.createAverageArrays();
      })
      .catch(err => {
        console.log(err);
      })
    },
    createAverageArrays: function () {
      this.bmp280Averages = this.createAverageArray(this.bmp280);
      this.dht11Averages = this.createAverageArray(this.dht11);
      this.ds18b20Averages = this.createAverageArray(this.ds18b20);
    },
    createAverageArray: function (temperatureArray) {
      let tempArray = [];
      let dailyArray = [];
      let dailyTemps = 0;
      let i = 0;
      temperatureArray.forEach(tempObject => {
        if (!dailyArray.includes(tempObject.date.substring(0,10))) {
          if(dailyTemps != 0) {
            tempArray.push(Math.round((dailyTemps/i)*100)/100)
            dailyTemps = 0;
            i = 0;
          }
          dailyArray.push(tempObject.date.substring(0,10))
        } else {
          dailyTemps += tempObject.temperature;
          i++;
        }
      })
      tempArray.push(Math.round((dailyTemps/i)*100)/100)
      if (this.dateArray == null) {
        this.dateArray = dailyArray
      }
      return tempArray;
    }
  }
}
</script>

<style>
.average-temp-chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.average-temp-chart {
  height: auto;
  max-width: 450px;
  position: relative;
}


.average-temp-chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  white;
  border-bottom: 1px solid #323d54;
  font-size: 25px;
}

@media (min-width: 768px) and (max-width: 979px) {

}

@media (max-width: 767px) {

}

@media (max-width: 480px) {
  .average-temp-chart h2 {
    font-size: 18px;
  }
}

@media (max-width: 420px) {

}
</style>
