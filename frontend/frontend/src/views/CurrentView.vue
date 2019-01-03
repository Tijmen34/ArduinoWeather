<template>
  <div class="current-overview">
    <div class="container" id="current-average">
      <div class="card text-center">
        <div class="card-header">
          <h4 class="card-title">
            Current Average Temperature
          </h4>
        </div>
        <div class="card-body" id="current-average-body">
          <div class="row">
            <div class="col-6">
              <h5 class="card-title house-temperature">Inside</h5>
              <p class="card-text">20 &deg;</p>
            </div>
            <div class="col-6">
              <h5 class="card-title outside-temperature">Outside</h5>
              <p class="card-text">7 &deg;</p>
            </div>
          </div>
        </div>
        <div v-if="bmp280" class="card-footer text-muted">
          Krommenie, {{ bmp280.date }}
        </div>
      </div>
    </div>
    <div class="container" id="all-values">
      <div class="row">
        <div class="col-sm-3">
          <div class="card text-center">
            <div class="card-header">
              <h6 class="card-title">
                BMP280
              </h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <h5 class="card-title house-temperature">Temperature</h5>
                  <p v-if="bmp280" class="card-text">{{bmp280.temperature}} &deg;</p>
                </div>
                <div class="col-4">
                  <h5 class="card-title house-temperature">Pressure</h5>
                  <p v-if="bmp280" class="card-text">{{bmp280.pressure}}</p>
                </div>
                <div class="col-4">
                  <h5 class="card-title house-temperature">Altitude</h5>
                  <p v-if="bmp280" class="card-text">{{bmp280.altitude}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card text-center">
            <div class="card-header">
              <h6 class="card-title">
                DHT11
              </h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <h5 class="card-title house-temperature">Temperature</h5>
                  <p v-if="dht11" class="card-text">{{dht11.temperature}} &deg;</p>
                </div>
                <div class="col-6">
                  <h5 class="card-title house-temperature">Humidity</h5>
                  <p v-if="dht11" class="card-text">{{dht11.humidity}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title">
                DS18B20
              </h6>
            </div>
            <div class="card-body">
              <h5 class="card-title house-temperature">Temperature</h5>
              <p v-if="ds18b20" class="card-text">{{ds18b20.temperature}} &deg;</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title">
                Openweather
              </h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <h5 class="card-title house-temperature">Temperature</h5>
                  <p v-if="openweather" class="card-text">{{openweather.temperature}} &deg;</p>
                </div>
                <div class="col-4">
                  <h5 class="card-title house-temperature">Pressure</h5>
                  <p v-if="openweather" class="card-text">{{openweather.pressure}}</p>
                </div>
                <div class="col-4">
                  <h5 class="card-title house-temperature">Humidity</h5>
                  <p v-if="openweather" class="card-text">{{openweather.humidity}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'CurrentView',
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
      axios.get("http://192.168.1.36:3000/api/weather/now")
      .then((resp) => {
        this.bmp280 = resp.data.BMP280[0]
        this.dht11 = resp.data.DHT11[0]
        this.ds18b20 = resp.data.DS18B20[0]
        this.openweather = resp.data.Openweather[0]
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
.card-footer {
  padding-top: 6px;
  padding-bottom: 3px;
}


#current-average .card-text {
  /* font-size: 10px; */
}

#current-average .card-text {
  /* font-size: 10px; */
}

#all-values {
  padding-top: 15px;
}

@media (min-width: 768px) and (max-width: 979px) {

}

@media (max-width: 767px) {
}

@media (max-width: 480px) {
  #current-average-body .card-text {
    font-size: 14px;
  }

  #current-average-body .card-title {
    font-size: 16px;
  }

  #current-average .card-footer {
    font-size: 10px;
  }
}

@media (max-width: 420px) {
   .card-text {
    font-size: 13px;
  }

   .card-title {
    font-size: 14px;
  }

  #current-average .card-footer {
    font-size: 12px;
  }
}
</style>
