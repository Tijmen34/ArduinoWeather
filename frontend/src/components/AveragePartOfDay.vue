<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    bmp280Array: Array,
    dht11Array: Array,
    ds18b20Array: Array,
    openweatherArray: Array
  },
  // Night [0-4] Dawn [5-7] Morning [8-11] Afternoon [12-16] Dusk [17-19] Evening [20-23]
  mounted () {
    this.renderChart({
      labels: ["Night", "Dawn", "Morning", "Afternoon", "Dusk", "Evening"],
      datasets: [
        {
          label: "BMP280",
          borderColor: 'rgba(255, 0, 0, 0.5)',
          backgroundColor: 'rgba(255, 0, 0, 0.25)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          pointBackgroundColor: "#212733",
          data: this.bmp280Array
        },
        {
          label: "DHT11",
          borderColor: 'rgba(0, 231, 255, 0.5)',
          backgroundColor: 'rgba(0, 231, 255, 0.25)',
          hoverBorderColor: 'rgba(0, 231, 255, 1)',
          pointBackgroundColor: "#212733",
          data: this.dht11Array
        },
        {
          label: "DS18B20",
          borderColor: 'rgba(231, 255, 0, 0.5)',
          backgroundColor: 'rgba(231, 255, 0, 0.25)',
          hoverBorderColor: 'rgba(231, 255, 0, 1)',
          pointBackgroundColor: "#212733",
          data: this.ds18b20Array
        },
        {
          label: "Openweather",
          borderColor: 'rgba(204, 0, 204,0.5)',
          backgroundColor: 'rgba(204, 0, 204,0.25)',
          hoverBorderColor: 'rgba(204, 0, 204,1)',
          pointBackgroundColor: "#212733",
          data: this.openweatherArray
        }
      ]
    })
  }
}
</script>
