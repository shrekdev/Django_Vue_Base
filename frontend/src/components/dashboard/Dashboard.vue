<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <p class="v-custom-header-name">eisenhower matrix</p>
      <v-container fluid>
        <v-layout wrap>
          <DashboardBox :data=matrixData.urgent_and_important filter_by="priority"/>
          <DashboardBox :data=matrixData.important_and_not_urgent filter_by="priority" />
          <DashboardBox :data=matrixData.urgent_and_not_important filter_by="priority" />
          <DashboardBox :data=matrixData.not_important_and_not_urgent filter_by="priority" />
        </v-layout>
      </v-container>
      <p class="v-custom-header-name">task statuses</p>
      <v-container fluid>
        <v-layout wrap>
          <template v-for="status in statusesData.status_list">
            <DashboardBox :data=status filter_by="status" />
          </template>
        </v-layout>
      </v-container>
      <p class="v-custom-header-name">news</p>
      <v-container fluid>
        <v-layout wrap>
          <StatsTaskStatuses />
        </v-layout>
      </v-container>
      <p class="v-custom-header-name">chart</p>
      <v-container fluid>
        <StatusesChart />
      </v-container>
    </v-content>
  </section>
</template>


<script>
  import StatsTaskStatuses from './StatsTaskStatuses.vue';
  import DashboardBox from './DashboardBox.vue';
  import { DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD, DASHBOARD_STATS_STATUS_LIST_LOAD } from '@/store/actions/dashboard';
  import { mapGetters } from 'vuex';
  import StatusesChart from './StatusesChart';

  export default {
    name: "Dashboard",
    data() {
      return {
        matrixData: {
          "urgent_and_important": [{"qty": null, "label": "", "color": "", "id": ""}],
          "important_and_not_urgent": [{"qty": null, "label": "", "color": "", "id": ""}],
          "urgent_and_not_important": [{"qty": null, "label": "", "color": "", "id": ""}],
          "not_important_and_not_urgent": [{"qty": null, "label": "", "color": "", "id": ""}]
        },
        statusesData: [],
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
      this.$store.dispatch(DASHBOARD_STATS_STATUS_LIST_LOAD, 12).then((response) => {
        this.statusesData = response.data;
      })
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
    components: {
      DashboardBox,
      StatsTaskStatuses,
      StatusesChart,
    },
  }
</script>

<style scoped>
  .v-custom-header-name {
    text-transform: uppercase;
    font-size: 15px;
    color: gray;
    margin-bottom: 0px;
  }
</style>
