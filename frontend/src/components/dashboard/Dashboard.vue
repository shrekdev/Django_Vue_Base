<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <v-container fluid>
        <v-layout wrap>
          <StatsEisenhowerMatrix :qty=q1[0].qty />
          <StatsEisenhowerMatrix />
          <StatsEisenhowerMatrix />
          <StatsEisenhowerMatrix />
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
    name: 'Dashboard',
    data() {
      return {
        q1: {}
      }
    },
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
    created() {
      this.$store.dispatch(DASHBOARD_STATS_EISENHOWER_MATRIX_LOAD, 12).then((response) => {
        this.q1 = response.data.urgent_and_important;
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
