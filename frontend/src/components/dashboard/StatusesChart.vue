<script>
import { Line } from 'vue-chartjs'
import { DASHBOARD_STATS_STATUSES_CHART } from '@/store/actions/dashboard';

export default {
  extends: Line,
  props: ['data'],
  data() {
    return {
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
              labelString: 'Days'
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
      this.$store.dispatch(DASHBOARD_STATS_STATUSES_CHART).then((response) => {
        this.renderChart(response.data.data, this.defaultOptions)
      })
  }
}
</script>