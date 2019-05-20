<template>
  <section>
    <v-btn @click="test_home()">
      API test
    </v-btn>
<br>
    <v-chip color="grey" text-color="white" style="width: 80%">
      <v-avatar class="green darken-4">A</v-avatar>
      Test_1
    </v-chip>

    <v-chip color="grey" text-color="white" style="width: 80%">
      <v-avatar class="green darken-4">A</v-avatar>
      Test_1
    </v-chip>

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
