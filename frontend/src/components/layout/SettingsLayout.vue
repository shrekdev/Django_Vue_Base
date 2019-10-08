<template>
  <v-app>
    <NavDrawer />
    <v-content>
      <v-container fluid ma-0 pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  import NavDrawer from './nav/NavDrawer.vue';
  import RequestProcessing from './utils/RequestProcessing.vue';

  export default {
    name: 'DashboardLayout',
    components: {
      NavDrawer,
      RequestProcessing,
    }
  }
</script>
