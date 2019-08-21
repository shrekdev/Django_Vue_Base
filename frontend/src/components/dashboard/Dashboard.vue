<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <v-container fluid>
        <v-layout wrap>
          <StatsEisenhowerMatrix :data=matrixData.urgent_and_important />
          <StatsEisenhowerMatrix :data=matrixData.important_and_not_urgent />
          <StatsEisenhowerMatrix :data=matrixData.urgent_and_not_important />
          <StatsEisenhowerMatrix :data=matrixData.not_important_and_not_urgent />
          <StatsTaskStatuses />
        </v-layout>
      </v-container>
    </v-content>
  </section>
</template>


<script>
  import StatsTaskStatuses from './StatsTaskStatuses.vue';
  import StatsEisenhowerMatrix from './StatsEisenhowerMatrix.vue';
  import { DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD } from '@/store/actions/dashboard';
  import { mapGetters } from 'vuex';


  export default {
    name: "Dashboard",
    data() {
      return {
        matrixData: {
          "urgent_and_important": [{"qty": null, "label": "", "color": "", "id": ""}],
          "important_and_not_urgent": [{"qty": null, "label": "", "color": "", "id": ""}],
          "urgent_and_not_important": [{"qty": null, "label": "", "color": "", "id": ""}],
          "not_important_and_not_urgent": [{"qty": null, "label": "", "color": "", "id": ""}]
        }
      }
    },
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
    created() {
      this.$store.dispatch(DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD, 12).then((response) => {
        this.matrixData = response.data;
      })
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
    components: {
      StatsEisenhowerMatrix,
      StatsTaskStatuses,
    },
  }
</script>

<style scoped>
</style>
