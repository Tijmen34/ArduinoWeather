<template>
  <div class="graph-overview">
    <div class="container-fluid graph-container">
      <div class="row">
        <div class="col-lg-4">
          <div class="average-temp-chart">
            <h2>Average Daily Temperature per Sensor</h2>
            <TempAverageChart v-if="ds18b20Averages" :labelArray="dateArray" :bmp280Array="bmp280Averages" :dht11Array="dht11Averages" :ds18b20Array="ds18b20Averages"/>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="record-amount-chart">
            <h2>Amount of Records per Source</h2>
            <RecordAmountChart v-if="recordArray" :sensorArray="sensorArray" :valueArray="recordArray"/>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="partofday-chart">
            <h2>Average Temperature per part of Day</h2>
            <AveragePartOfDay v-if="openweatherDayPart" :bmp280Array="bmp280DayPart" :dht11Array="dht11DayPart" :ds18b20Array="ds18b20DayPart" :openweatherArray="openweatherDayPart"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import TempAverageChart from '@/components/TempAverageChart.vue'
import RecordAmountChart from '@/components/RecordAmountChart.vue'
import AveragePartOfDay from '@/components/AveragePartOfDay.vue'

export default {
  name: 'GraphView',
  components: {
    TempAverageChart,
    RecordAmountChart,
    AveragePartOfDay
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
      dateArray: null,
      sensorArray: null,
      recordArray: null,
      bmp280DayPart: null,
      ds18b20DayPart: null,
      dht11DayPart: null,
      openweatherDayPart: null
    }
  },
  created () {
    this.getAllWeather();
  },
  methods: {
    getAllWeather: function () {
      axios.get("http://rienstor.no-ip.org:3000/api/weather/all")
      .then((resp) => {
        this.bmp280 = resp.data.BMP280
        this.dht11 = resp.data.DHT11
        this.ds18b20 = resp.data.DS18B20
        this.openweather = resp.data.Openweather
        console.log("Request done.")
        this.createAverageArrays();
        this.createRecordAmountArray();
        this.createDayPartArrays();
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
    },
    createRecordAmountArray: function () {
      this.sensorArray = ["BMP280", "DHT11", "DS18B20", "Openweather"]
      this.recordArray = [
        this.bmp280.length,
        this.dht11.length,
        this.ds18b20.length,
        this.openweather.length
      ]
    },
    createDayPartArrays: function () {
      this.bmp280DayPart = this.createDayPartArray(this.bmp280);
      this.dht11DayPart = this.createDayPartArray(this.dht11);
      this.ds18b20DayPart = this.createDayPartArray(this.ds18b20);
      this.openweatherDayPart = this.createDayPartArray(this.openweather)
    },
    createDayPartArray: function (weatherArray) {
      // Night [0-4] Dawn [5-7] Morning [8-11] Afternoon [12-16] Dusk [17-19] Evening [20-23]
      let recordAmountArray = [0, 0, 0, 0, 0, 0];
      let dayPartArray = [0, 0, 0, 0, 0, 0];
      weatherArray.forEach(weatherValues => {
        let weatherHour = Number(weatherValues.date.substring(11,13))
        switch (true) {
          case (this.between(weatherHour, 0, 4)): {
            dayPartArray[0] += weatherValues.temperature
            recordAmountArray[0]++
            break;
          }
          case (this.between(weatherHour, 5, 7)): {
            dayPartArray[1] += weatherValues.temperature
            recordAmountArray[1]++
            break;
          }
          case (this.between(weatherHour, 8, 11)): {
            dayPartArray[2] += weatherValues.temperature
            recordAmountArray[2]++
            break;
          }
          case (this.between(weatherHour, 12, 16)): {
            dayPartArray[3] += weatherValues.temperature
            recordAmountArray[3]++
            break;
          }
          case (this.between(weatherHour, 17, 19)): {
            dayPartArray[4] += weatherValues.temperature
            recordAmountArray[4]++
            break;
          }
          case (this.between(weatherHour, 20, 23)): {
            dayPartArray[5] += weatherValues.temperature
            recordAmountArray[5]++
            break;
          }
        }
      })
      for (let i = 0; i < dayPartArray.length; i++) {
        dayPartArray[i] = Math.round((dayPartArray[i]/recordAmountArray[i])*100)/100
      }
      return dayPartArray;
    },

    between: function (x, min, max) {
      return x >= min && x <= max;
    }
  }
}
</script>

<style>
.average-temp-chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 4px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.average-temp-chart {
  height: auto;
  max-width: 550px;
  position: relative;
}

.average-temp-chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  white;
  border-bottom: 1px solid #323d54;
  font-size: 25px;
}

.partofday-chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 4px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.partofday-chart {
  height: auto;
  max-width: 550px;
  position: relative;
}

.partofday-chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  white;
  border-bottom: 1px solid #323d54;
  font-size: 25px;
}

.record-amount-chart {
  border-radius: 15px;
  box-shadow: 4px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.record-amount-chart {
  height: auto;
  max-width: 550px;
  position: relative;
}

.record-amount-chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color: black;
  border-bottom: 1px solid #323d54;
  font-size: 25px;
}

@media (min-width: 768px) and (max-width: 979px) {
  .record-amount-chart, .partofday-chart, .average-temp-chart {
    left: 12%;
  }
}

@media (max-width: 767px) {
  .record-amount-chart, .partofday-chart, .average-temp-chart {
    left: 8%;
  }
}

@media (max-width: 480px) {
  .average-temp-chart h2, .partofday-chart h2 {
    font-size: 18px;
  }

  .record-amount-chart, .partofday-chart, .average-temp-chart {
    left: 0;
  }
}

@media (max-width: 420px) {

}
</style>
