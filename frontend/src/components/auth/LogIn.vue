<template>
  <section>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field box required label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        :rules="emailRules">
      </v-text-field>
      <v-text-field box required label="Password"
        type="password"
        v-model="password"
        :rules="passwordRules">
      </v-text-field>
      <v-btn :disabled="!valid" color="primary" @click="logIn">
        Login
      </v-btn>
      <v-btn color="secondary" @click="showPasswordResetForm = !showPasswordResetForm">
        Password?
      </v-btn>
    </v-form>
    <div>
    <br>
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
              this.$router.push({name: 'Dashboard'});
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
