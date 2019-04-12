<template>
  <section>
    <div v-if="getAccountSignUpStatus === 'success'">
      <article class="message is-success is-small has-text-centered">
        <div class="message-body">
          Check your e-mail
        </div>
      </article>
    </div>
    <div v-else-if="getAccountSignUpStatus === 'error'">
      <article class="message is-danger is-small has-text-centered">
        <div class="message-body">
          error during registration
        </div>
      </article>
    </div>
    <form>
      <div class="field">
        <label class="label is-small">Imię</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="first_name" type="input" :class="signUpErrors.first_name ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p v-if="signUpErrors.length">
          <p class="help is-danger" v-for="error in signUpErrors.first_name">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">E-mail</label>
        <p class="control has-icons-left">
          <input v-model="email1" type="email" :class="signUpErrors.email ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <p v-if="signUpErrors.length">
          <p class="help is-danger" v-for="error in signUpErrors.email">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">Powtórz e-mail</label>
        <p class="control has-icons-left">
          <input v-model="email2" type="email" :class="signUpErrors.email ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <p v-if="signUpErrors.length">
          <p class="help is-danger" v-for="error in signUpErrors.email">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">Hasło</label>
        <p class="control has-icons-left">
          <input v-model="password1" type="password" :class="signUpErrors.password ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
         </span>
        </p>
        <p v-if="signUpErrors.length">
          <p class="help is-danger" v-for="error in signUpErrors.password">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">Powtórz hasło</label>
        <p class="control has-icons-left">
          <input v-model="password2" type="password" :class="signUpErrors.password ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <p v-if="signUpErrors.length">
          <p class="help is-danger" v-for="error in signUpErrors.password">{{ error }}</p>
        </p>
      </div>
      <button class="button is-primary" v-on:click="sign_up()">
        Zarejestruj się
      </button>
    </form>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { AUTH_SIGN_UP } from '@/store/actions/auth';

  export default {
    name: 'SignUp',
    data() {
      return {
        first_name: '',
        email1: '',
        email2: '',
        password1: '',
        password2: '',
        errors: {},
      }
    },
    methods: {
      sign_up: function () {
        if (this.password1 === this.password2) {
          this.$store.dispatch(AUTH_SIGN_UP, {
            first_name: this.first_name,
            email: this.email1,
            password: this.password1
          }).then(() => {
          })
        }
      },
    },
    computed: {
      ...mapGetters(['signUpErrors', 'getAccountSignUpStatus']),
    },
  }
</script>


<style scoped>
</style>
