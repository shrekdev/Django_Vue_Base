<template>
  <section>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field box label="E-mail"
        v-model="email"
        :error-messages="passwordResetErrors"
        :rules="emailRules">
      </v-text-field>
      <v-btn :disabled="!valid" color="success" @click="passwordReset">
        Reset password
      </v-btn>
    </v-form>
  </section>
</template>


<script>
  import { AUTH_PASSWORD_RESET, AUTH_ERRORS_CLEAR } from '@/store/actions/auth';
  import { mapGetters } from 'vuex';

  export default {
    name: 'PasswordReset',
    data() {
      return {
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        valid: true,
      }
    },
    methods: {
      passwordReset: function() {
        if(this.email.indexOf('@') > -1) {
          this.$store.dispatch(AUTH_PASSWORD_RESET, {
            email: this.email,
          }).then(() => {
            if(this.$store.getters.getAccountPasswordResetStatus === 'success') {
              this.email = '';
              this.$swal({
                type: 'success',
                title: 'Success!',
                text: 'To continue check your email and follow the steps ;)'
              });
              this.$refs.form.resetValidation()
            }
            this.$router.push('/');
          }).catch(reason => {
            this.$refs.form.reset()
            this.$refs.form.resetValidation()
          })
        }
        this.$store.dispatch(AUTH_ERRORS_CLEAR);
      }
    },
    computed: {
      ...mapGetters(['getAccountPasswordResetErrors']),
      passwordResetErrors() {
        const error_list = []
        const errors = this.getAccountPasswordResetErrors.email;
        if(errors !== undefined) {
          for (const error of errors){
            error_list.push(error);
          }
        }
        return error_list
      }
    },
  }
</script>
