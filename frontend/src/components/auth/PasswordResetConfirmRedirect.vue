<template>
</template>

<script>
  export default {
    name: 'PasswordResetConfirmRedirect',
    mounted() {
      this.$router.push({
        name: 'UserAuth',
        params: {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
        }
      });
    },
  }
</script>
