<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labelArray: Array,
    bmp280Array: Array,
    dht11Array: Array,
    ds18b20Array: Array
  },
  data () {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.gradient3.addColorStop(0, 'rgba(231, 255, 0, 0.75)')
    this.gradient3.addColorStop(0.5, 'rgba(231, 255, 0, 0.25)');
    this.gradient3.addColorStop(1, 'rgba(231, 255, 0, 0)');

    this.renderChart({
      labels: this.labelArray,
      datasets: [
        {
          label: 'DHT11',
          borderColor: '#FC2525',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white',
          backgroundColor: this.gradient,
          data: this.dht11Array
        },
        {
          label: 'BMP280',
          borderColor: '#05CBE1',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: this.bmp280Array
        },
        {
          label: 'DS18B20',
          borderColor: '#FFFF00',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient3,
          data: this.ds18b20Array
        }
      ]
    })
  }
}
</script>
