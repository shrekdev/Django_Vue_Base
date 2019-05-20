<template>
  <v-app>
    <NavToolbar />
    <NavDrawer />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
  import { TEST_ACTION } from '@/store/actions/auth';
  import NavDrawer from './nav/NavDrawer.vue';
  import NavToolbar from './nav/NavToolbar.vue';

  export default {
    name: 'Layout',
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
    components: {
      NavDrawer,
      NavToolbar
    }
  }
</script>
