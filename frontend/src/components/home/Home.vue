<template>
  <div>
    <div>
      <h2>You are now logged in.</h2>

      <button class="button is-primary" v-on:click="test_home()">
        API test
      </button>

    </div>

  </div>
</template>

<style>
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import UserAuth from '../auth/UserAuth.vue';
  import { TEST_ACTION } from '@/store/actions/auth';

  export default {
    methods: {
      test_home: function () {
          this.$store.dispatch(TEST_ACTION);
        }
      },
  }
</script>
