<template>
  <section>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field required label="First name"
        v-model="first_name"
        :counter="15"
        :error-messages="firstNameErrors"
        :rules="nameRules">
      </v-text-field>
      <v-text-field required label="E-mail"
        v-model="email1"
        :error-messages="emailErrors"
        :rules="emailRules">
      </v-text-field>
      <v-text-field required label="E-mail confirmation"
        v-model="email2"
        :rules="[v => (!!v && v) === this.email1 || 'E-mails do not match']">>
      </v-text-field>
      <v-text-field required label="Password"
        type="password"
        v-model="password1"
        :counter="4"
        :rules="passwordRules"
        :error-messages="passwordErrors">
      </v-text-field>
      <v-text-field required label="Password confirmation"
        type="password"
        v-model="password2"
        :counter="4"
        :rules="[v => (!!v && v) === this.password1 || 'Passwords do not match']">
      </v-text-field>
      <v-btn :disabled="!valid" color="success" @click="signUp">
        Sign up
      </v-btn>
    </v-form>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { AUTH_SIGN_UP } from '@/store/actions/auth';

  export default {
    name: 'SignUp',
    data() {
      return {
        valid: true,
        first_name: '',
        email1: '',
        email2: '',
        password1: '',
        password2: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 4) || 'Password must be longer than 4 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          v => !!v || 'First name is required',
          v => v.length <= 15 || 'First name must be less than 15 characters'
        ],
      }
    },
    methods: {
      signUp: function () {
        if (this.first_name && this.email1 && this.email2 && this.password1 && this.password2) {
          console.log('passwords OK')
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
      firstNameErrors() {
        const errors = []
        this.signUpErrors.first_name && errors.push(this.signUpErrors.first_name)
        return errors
      },
      emailErrors() {
        const errors = []
        this.signUpErrors.email && errors.push(this.signUpErrors.email)
        return errors
      },
      passwordErrors() {
        const errors = []
        this.signUpErrors.password && errors.push(this.signUpErrors.password)
        return errors
      },
    },
  }
</script>


<style scoped>
</style>
