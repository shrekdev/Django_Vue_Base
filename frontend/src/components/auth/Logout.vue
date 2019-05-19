<template>
</template>

<script>
  import { AUTH_LOGOUT } from '@/store/actions/auth';

  export default {
    name: 'Logout',
    mounted() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({name: 'UserAuth'});
      })
    },
  }
</script>
