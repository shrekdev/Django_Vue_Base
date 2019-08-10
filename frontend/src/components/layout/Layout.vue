<template>
  <v-app>
    <NavToolbar />
    <NavDrawer />
    <NavDrawerRight />
    <v-content>
      <v-container fluid ma-0 pa-0>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  import { TEST_ACTION } from '@/store/actions/auth';
  import NavDrawer from './nav/NavDrawer.vue';
  import NavDrawerRight from './nav/NavDrawerRight.vue';
  import NavToolbar from './nav/NavToolbar.vue';
  import RequestProcessing from './utils/RequestProcessing.vue';

  export default {
    name: 'Layout',
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
    components: {
      NavDrawer,
      NavDrawerRight,
      NavToolbar,
      RequestProcessing,
    }
  }
</script>
