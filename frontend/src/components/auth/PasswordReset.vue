<template>
  <section>
    <form action="">
      <b-field label="E-mail">
        <b-input
          v-model="email"
          type="email"
          placeholder="E-mail address"
          required>
        </b-input>
      </b-field>
      <button class="button is-primary" v-on:click="passwordReset()">
        Reset password
      </button>
    </form>
  </section>
</template>

<script>
  import { AUTH_PASSWORD_RESET } from '@/store/actions/auth';

  export default {
    name: 'PasswordReset',

    data() {
      return {
        email: '',
      }
    },
    methods: {
      passwordReset: function() {
        console.log('clicked, email: ', this.email);
        if(this.email) {
          this.$store.dispatch(AUTH_PASSWORD_RESET, {
            email: this.email,
          }).then(() => {
            this.$router.push('/');
          })
        }
      }
    }
  }
</script>
