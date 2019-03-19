<template>
  <div>
    <div v-if="isAuthenticated">
      <h2>You are now logged in.</h2>
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

  export default {
    components: {
      UserAuth,
    },
    name: 'Home',
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus']),
      loading: function () {
        return this.authStatus === 'loading' && !this.isAuthenticated
      }
    },
  }
</script>
