<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data() {
    return {
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'label 1',
              fill: false,
              backgroundColor: '#f87979',
			  borderColor: '#f87979',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            },
            {
              label: 'label 2',
              fill: false,
              borderColor: '#ffff00',
              backgroundColor: '#ffff00',
              data: [10, 12, 12, 39, 10, 40, 12, 80, 12, 20, 12, 11]
            }
          ]
      },
      defaultOptions: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      },
    }
  },
  mounted () {
    this.renderChart(this.data, this.defaultOptions)
  }
}
</script>