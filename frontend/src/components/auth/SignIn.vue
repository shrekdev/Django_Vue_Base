<template>
  <section>
    <p v-if="non_field_errors" class="help is-danger">
      Podane dane uwierzytelniające są nieprawidłowe!
    </p>
    <br>
    <div class="field">
      <label class="label is-small">E-mail</label>
      <div class="control has-icons-left has-icons-right">
        <input v-model="sign_in_username"
          :class="username_error ? 'input is-danger' : 'input'"
          type="input">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p v-if="username_error" class="help is-danger">
        To pole nie może być puste!
      </p>
    </div>
    <div class="field">
    <label class="label is-small">Hasło</label>
      <p class="control has-icons-left">
        <input v-model="sign_in_password"
          :class="password_error ? 'input is-danger' : 'input'"
          type="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
      <p v-if="password_error" class="help is-danger">
        To pole nie może być puste!
      </p>
    </div>
    <button class="button is-primary" v-on:click="sign_in()">
      Zaloguj się
    </button>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { AUTH_REQUEST } from '@/store/actions/auth';

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
        //console.log('is_authenticated: ', this.$store.getters.is_authenticated);
        this.$store.dispatch(AUTH_REQUEST, credentials).then(() => {
          this.$router.push('/home');
        })
      }
    },
    computed: {
      ...mapGetters(['authErrors']),
      non_field_errors: function() {
        return this.authErrors['non_field_errors'];
      },
      username_error: function() {
        return this.authErrors['username'];
      },
      password_error: function() {
        return this.authErrors['password'];
      }
    },

  }
</script>


<style scoped>
</style>
