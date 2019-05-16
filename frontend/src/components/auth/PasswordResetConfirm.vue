<template>
  <section>
    <v-label>
      <p class="text-xs-center">
        To complete the procedure enter the correct new password and then just remember it ;)
      </p>
    </v-label>
    <br>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field box required label="New password"
        type="password"
        v-model="new_password"
        :error-messages="passwordErrors"
        :rules="passwordRules">
      </v-text-field>

      <v-text-field box required label="Confirm new password"
        type="password"
        v-model="re_new_password"
        :rules="[v => (!!v && v) === this.new_password || 'Passwords do not match']">
      </v-text-field>

      <v-btn :disabled="!valid" color="success" @click="passwordResetConfirm">
        Change password
      </v-btn>
    </v-form>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { AUTH_PASSWORD_RESET_CONFIRM } from '@/store/actions/auth';

  export default {
    name: 'PasswordResetConfirm',
    components: {
    },
    data() {
      return {
        valid: true,
        new_password: "",
        re_new_password: "",
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 4) || 'Password must be longer than 4 characters'
        ],
      }
    },
    methods: {
      passwordResetConfirm: function() {
        if(this.new_password && this.re_new_password) {
          this.$store.dispatch(AUTH_PASSWORD_RESET_CONFIRM, {
            uid: this.$route.params.uid,
            token: this.$route.params.token,
            new_password: this.new_password,
            re_new_password: this.re_new_password
          }).then(() => {
            if(this.$store.getters.getAccountPasswordResetConfirmStatus === 'success') {
              this.new_password = '';
              this.re_new_password = '';
              this.$swal({
                type: 'success',
                title: 'Success!',
                text: 'You can log in now with your new password ;)'
              });
              this.$emit('resetConfirmed')
            } else if(this.$store.getters.getAccountPasswordResetConfirmStatus === 'error') {
              this.$swal({
                type: 'error',
                title: 'Something went wrong...',
                text: "We can't reset your password, sorry ;("
              });
            }
          })
        }
      }
    },
    computed: {
      ...mapGetters(['getAccountPasswordResetConfirmErrors']),

      passwordErrors() {
        const error_list = []
        const errors = this.getAccountPasswordResetConfirmErrors.new_password;
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
