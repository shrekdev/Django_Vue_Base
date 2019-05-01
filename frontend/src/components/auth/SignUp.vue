<template>
  <section>
  <br>
    <form>
      <div class="field">
        <label class="label is-small">First name</label>
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
        <label class="label is-small">E-mail (repeated)</label>
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
        <label class="label is-small">Password</label>
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
        <label class="label is-small">Password (repeated)</label>
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
      <button class="button is-primary is-small is-fullwidth" v-on:click="signUp()">
        Sign up
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
      }
    },
    methods: {
      signUp: function () {
        if (this.password1 === this.password2) {
          this.$store.dispatch(AUTH_SIGN_UP, {
            first_name: this.first_name,
            email: this.email1,
            password: this.password1
          }).then(() => {
            if(this.$store.getters.getAccountSignUpStatus === 'success') {
              this.first_name = '';
              this.email1 = '';
              this.email2 = '';
              this.password1 = '';
              this.password2 = '';
              this.$swal({
                type: 'success',
                title: 'E-mail confirmation',
                text: 'Check your e-mail box and confirm your e-mail address ;)'
              });
              this.$router.push('/');
            } else if(this.$store.getters.getAccountSignUpStatus === 'error') {
              this.$swal({
                type: 'error',
                title: 'Something went wrong...',
                text: "We can't sign you up, sorry ;("
              });
            }
          })
        }
      },
    },
    computed: {
      ...mapGetters(['signUpErrors']),
    },
  }
</script>


<style scoped>
</style>
