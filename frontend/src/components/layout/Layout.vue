<template>
  <v-app>
    <RequestProcessing />
    <NavToolbar />
    <NavDrawer />

    <v-content>
      <v-container ma-0 pa-2>
        <router-view></router-view>
      </v-container>
    </v-content>


      qqqq<v-navigation-drawer permanent right app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            _
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

  <v-container fluid ma-0 pa-1>
    <v-card color="accent">
      aaaaaaaa<br>
      aaaaaaaa
      aaaaaaaa
    </v-card>
  </v-container>

  <v-container fluid ma-0 pa-1>
    <v-card color="accent">
      aaaaaaaa<br>
      aaaaaaaa
      aaaaaaaa
    </v-card>
  </v-container>
  </v-navigation-drawer>



  </v-app>
</template>


<script>
  import { TEST_ACTION } from '@/store/actions/auth';
  import NavDrawer from './nav/NavDrawer.vue';
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
      NavToolbar,
      RequestProcessing,
    }
  }
</script>
