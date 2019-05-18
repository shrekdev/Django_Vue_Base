<template>


  <v-app>
    <v-content>
      <v-container>
        <v-layout justify-center>
          <v-btn @click="test_home()">
            API test
          </v-btn>
        </v-layout>
      </v-container>

      <Menu />

    </v-content>
  </v-app>



</template>


<script>
  import { mapGetters } from 'vuex';
  import UserAuth from '../auth/UserAuth.vue';
  import { TEST_ACTION } from '@/store/actions/auth';
  import Menu from './Menu.vue';


  export default {
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
    components: {
      Menu
    }
  }
</script>
