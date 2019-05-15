<template>
  <section>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field required label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        :rules="emailRules">
      </v-text-field>

      <v-text-field required label="Password"
        type="password"
        v-model="password"
        :counter="4"
        :rules="passwordRules">
      </v-text-field>
      <v-btn :disabled="!valid" color="success" @click="logIn">
        Log in
      </v-btn>
    </v-form>

    <div>
      <a class="help is-info has-text-centered" v-on:click="showPasswordResetForm = !showPasswordResetForm">
        Have you forgotten your password?
      </a>
      <div v-show="showPasswordResetForm">
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
        valid: true,
        email: '',
        password: '',
        showPasswordResetForm: false,
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 4) || 'Password must be longer than 4 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
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
              this.$refs.form.resetValidation();
            }
          }).catch(reason => {
            this.$refs.form.reset()
            this.$refs.form.resetValidation()
          })





        }
      },
    },
    computed: {
      ...mapGetters(['getLogInErrors']),
      emailErrors() {
        const errors = []
        this.getLogInErrors.detail && errors.push(this.getLogInErrors.detail)
        return errors
      },
    },
    components: {
      PasswordReset
    }
  }
</script>

<style scoped>
</style>
