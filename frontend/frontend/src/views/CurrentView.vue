<template>
  <div class="current-overview">
    <div class="container" id="current-average">
      <div class="card text-center">
        <div class="card-header">
          <h3 class="card-title">
            Current Average Temperature
          </h3>
        </div>
        <div class="card-body" id="current-average-body">
          <div class="row">
            <div class="col-6">
              <h6 class="card-title house-temperature-average">Inside</h6>
              <p v-if="insideAverage" class="card-text">{{ insideAverage }} C&deg;</p>
            </div>
            <div class="col-6">
              <h6 class="card-title outside-temperature">Outside</h6>
              <p v-if="openweather" class="card-text">{{ openweather.temperature }} C&deg;</p>
            </div>
          </div>
        </div>
        <div v-if="bmp280" class="card-footer text-muted">
          Krommenie, {{ bmp280.date }}
        </div>
      </div>
    </div>
    <div class="container-fluid" id="all-values">
      <div class="row">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-sm-6" id="bmp280-col">
              <div class="card text-center">
                <div class="card-header">
                  <h5 class="card-title">
                    BMP280
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="card-title house-temperature">Temperature</h6>
                      <h6 class="card-title house-temperature-mobile">Temp.</h6>
                      <p v-if="bmp280" class="card-text">{{bmp280.temperature}} C&deg;</p>
                    </div>
                    <div class="col-4">
                      <h6 class="card-title house-pressure">Pressure</h6>
                      <p v-if="bmp280" class="card-text">{{bmp280.pressure}}</p>
                    </div>
                    <div class="col-4">
                      <h6 class="card-title house-altitude">Altitude</h6>
                      <p v-if="bmp280" class="card-text">{{bmp280.altitude}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6" id="dht11-col">
              <div class="card text-center">
                <div class="card-header">
                  <h5 class="card-title">
                    DHT11
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <h6 class="card-title house-temperature">Temperature</h6>
                      <h6 class="card-title house-temperature-mobile">Temp.</h6>
                      <p v-if="dht11" class="card-text">{{dht11.temperature}} C&deg;</p>
                    </div>
                    <div class="col-6">
                      <h6 class="card-title house-humidity">Humidity</h6>
                      <p v-if="dht11" class="card-text">{{dht11.humidity}}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-sm-6" id="ds18b20-col">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">
                    DS18B20
                  </h5>
                </div>
                <div class="card-body">
                  <h6 class="card-title house-temperature-ds18b20">Temperature</h6>
                  <p v-if="ds18b20" class="card-text">{{ds18b20.temperature}} C&deg;</p>
                </div>
              </div>
            </div>
            <div class="col-sm-6" id="openweather-col">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title">
                    Openweather
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <h6 class="card-title house-temperature">Temperature</h6>
                      <h6 class="card-title house-temperature-mobile">Temp.</h6>
                      <p v-if="openweather" class="card-text">{{openweather.temperature}} C&deg;</p>
                    </div>
                    <div class="col-4">
                      <h6 class="card-title house-pressure">Pressure</h6>
                      <p v-if="openweather" class="card-text">{{openweather.pressure}}</p>
                    </div>
                    <div class="col-4">
                      <h6 class="card-title house-humidity">Humidity</h6>
                      <p v-if="openweather" class="card-text">{{openweather.humidity}}%</p>
                    </div>
                  </div>
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
      openweather: null,
      insideAverage: null
    }
  },
  created () {
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather: function () {
      axios.get("http://rienstor.no-ip.org:3000/api/weather/now")
      .then((resp) => {
        this.bmp280 = resp.data.BMP280[0]
        this.dht11 = resp.data.DHT11[0]
        this.ds18b20 = resp.data.DS18B20[0]
        this.openweather = resp.data.Openweather[0]
        this.insideAverage = Math.round(((this.bmp280.temperature + this.dht11.temperature + this.ds18b20.temperature) / 3)* 100) / 100 //What a beauty
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
.house-temperature-mobile {
  display: none;
}

.card-header {
  border: 5px 5px 5px 5px;
}

#all-values {
  padding: 5px 15px 15px 15px;
}

#dht11-col, #ds18b20-col, #openweather-col, #bmp280-col {
  margin-top: 9px;
}

h5.card-title, h3.card-title {
  font-weight: bold;
}

@media (min-width: 768px) and (max-width: 979px) {
  .house-humidity, .house-altitude, .house-pressure, .house-temperature-mobile, .house-temperature-ds18b20 {
    font-size: 18px;
  }
  .house-temperature-mobile {
    display: block;
  }
  .house-temperature {
    display: none;
  }
}

@media (max-width: 767px) {
  .house-humidity, .house-altitude, .house-pressure, .house-temperature-mobile, .house-temperature-ds18b20 {
    font-size: 18px;
  }
  .house-temperature-mobile {
    display: block;
  }
  .house-temperature {
    display: none;
  }
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
