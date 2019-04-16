<template>
</template>


<script>
  import { AUTH_ACCOUNT_ACTIVATE } from '@/store/actions/auth';


  export default {
    name: 'AccountActivate',
    mounted() {
      this.$store.dispatch(AUTH_ACCOUNT_ACTIVATE, {
        uid: this.$route.params.uid,
        token: this.$route.params.token
      }).then(() => {
        if(this.$store.getters.getAccountActivationStatus === 'success') {
          this.$swal({
            type: 'success',
            title: 'Success!',
            text: 'You can log in now ;)'
          });
        }
        this.$router.push('/');
      })
    },
  }
</script>


<style scoped>
</style>
