<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    sensorArray: Array,
    valueArray: Array
  },
  mounted () {
    this.renderChart({
      labels: this.sensorArray,
      datasets: [
        {
          label: "Record Amount",
          borderColor: ['rgba(255, 0, 0, 0.5)','rgba(0, 231, 255, 0.5)','rgba(231, 255, 0, 0.5)','rgba(204, 0, 204,0.5)'],
          backgroundColor: ['rgba(255, 0, 0, 0.25)','rgba(0, 231, 255, 0.25)','rgba(231, 255, 0, 0.25)','rgba(204, 0, 204,0.25)'],
          hoverBorderColor: ['rgba(255, 0, 0, 1)','rgba(0, 231, 255, 1)','rgba(231, 255, 0, 1)','rgba(204, 0, 204,1)'],
          data: this.valueArray
        }
      ]
    })
  }
}
</script>
