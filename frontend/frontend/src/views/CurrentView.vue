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
        <div class="card-footer text-muted">
          Krommenie, 03-01-2018 17:50:00
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
                  Temperature
                </div>
                <div class="col-4">
                  Pressure
                </div>
                <div class="col-4">
                  Altitude
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
                  Temperature
                </div>
                <div class="col-6">
                  Humidity
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
              Temperature
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
                  Temperature
                </div>
                <div class="col-4">
                  Pressure
                </div>
                <div class="col-4">
                  Humidity
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
      bmp280: [],
      dht11: [],
      ds18b20: [],
      Openweather: []
    }
  },
  created () {
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather: () => {
      axios.get("http://192.168.1.36:3000/api/weather/now")
      .then(resp => {
        console.log(resp.data)
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

  #current-average-body .card-footer {
    font-size: 10px;
  }
}

@media (max-width: 420px) {
  #current-average-body .card-text {
    font-size: 12px;
  }

  #current-average-body .card-title {
    font-size: 14px;
  }

  #current-average-body .card-footer {
    font-size: 9px;
  }
}
</style>
