<template>
  <section>
    <div v-if="getLogInErrors.detail">
      <p class="help is-danger">{{ getLogInErrors.detail }}</p>
    </div>
    <br>
    <form>
      <div class="field">
        <label class="label is-small">E-mail</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="email" type="email" :class="getLogInErrors.email ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p v-if="getLogInErrors.length">
          <p class="help is-danger" v-for="error in getLogInErrors.email">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">Password</label>
        <p class="control has-icons-left">
          <input v-model="password" type="password" :class="getLogInErrors.password ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p v-if="getLogInErrors.length">
          <p class="help is-danger" v-for="error in getLogInErrors.password">{{ error }}</p>
        </p>
      </div>
      <button class="button is-primary is-small is-fullwidth" v-on:click="logIn()">Log in</button>
    </form>
    <div>
      <a class="help is-info has-text-centered" v-on:click="showPasswordResetForm = !showPasswordResetForm">
        Have you forgotten your password?
      </a>
      <div v-bind:class="showPasswordResetForm ? null : 'is-hidden'">
        <PasswordReset />
      </div>
    </div>
  </section>
</template>


<script>
  import PasswordReset from './PasswordReset.vue';
  import { mapGetters } from 'vuex';
  import { AUTH_LOG_IN } from '@/store/actions/auth';


  export default {
    name: 'LogIn',
    data() {
      return {
        email: '',
        password: '',
        showPasswordResetForm: false,
      }
    },
    methods: {
      logIn: function () {
        const credentials = {
          email: this.email,
          password: this.password
        }
        if (this.email && this.password) {
          this.$store.dispatch(AUTH_LOG_IN, {
            email: this.email,
            password: this.password
          }).then(() => {
            if(this.$store.getters.getLogInStatus === 'success') {
              this.$router.push('/');
            } else if(this.$store.getters.getLogInStatus === 'error') {
              this.$swal({
                type: 'error',
                title: 'Something went wrong...',
                text: "We can't log you in, sorry ;("
              });
            }
          })
        }
      },
    },
    computed: {
      ...mapGetters(['getLogInErrors', 'getAccountActivationStatus']),
    },
    components: {
      PasswordReset
    }
  }
</script>

<style scoped>
</style>
