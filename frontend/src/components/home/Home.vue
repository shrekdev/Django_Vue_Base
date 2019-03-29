<template>
  <div>
    <div v-if="isAuthenticated">
      <h2>You are now logged in.</h2>

      <button class="button is-primary" v-on:click="test_home()">
        API test
      </button>

    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <UserAuth />
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
    components: {
      UserAuth,
    },
    name: 'Home',
    computed: {
      ...mapGetters(['refresh_token_exp', 'access_token_exp', 'is_authenticated', 'isAuthenticated']),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }
    },
  }
</script>
