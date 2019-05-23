<template>
  <section>
    <v-btn @click="test_home()">
      API test
    </v-btn>
  </section>
</template>


<script>
  import { TEST_ACTION } from '@/store/actions/auth';

  export default {
    name: 'Dashboard',
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
  }
</script>
