<template>
  <section>
    <b-field label="Username">
      <b-input v-model="sign_in_username" maxlength="50"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input v-model="sign_in_password" type="password" password-reveal></b-input>
    </b-field>

    <button class="button is-primary" v-on:click="sign_in()">
      Zaloguj
    </button>
  </section>
</template>


<script>
  import {AUTH_REQUEST} from '@/store/actions/auth';
  import { mapGetters } from 'vuex';

  export default {
    name: 'SignIn',
    data() {
      return {
        sign_in_username: '',
        sign_in_password: '',
      }
    },
    methods: {
      sign_in: function () {
        const credentials = {
          username: this.sign_in_username,
          password: this.sign_in_password
        }
        this.$store.dispatch(AUTH_REQUEST, credentials).then(() => {
          this.$router.push('/dashboard');
        })
      }
    }
  }
</script>


<style scoped>
</style>
