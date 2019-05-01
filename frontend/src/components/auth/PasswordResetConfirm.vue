<template>
<div>
  <label class="help is-small is-info has-text-centered">
    To complete the procedure enter the correct new password and then just remember it ;)
  </label>
  <p v-if="getAccountPasswordResetConfirmErrors.length">
    <p class="help is-danger has-text-centered" v-for="error in getAccountPasswordResetConfirmErrors.non_field_errors">{{ error }}</p>
  </p>
  <br>
  <form>
    <div class="field">
      <label class="label is-small">New password</label>
      <p class="control has-icons-left">
        <input v-model="new_password" type="password" class="input" required>
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
      <p v-if="getAccountPasswordResetConfirmErrors.length">
        <p class="help is-danger has-text-centered" v-for="error in getAccountPasswordResetConfirmErrors.new_password">{{ error }}</p>
      </p>
    </div>
    <div class="field">
      <label class="label is-small">Confirm new password</label>
      <p class="control has-icons-left">
        <input v-model="re_new_password" type="password" class="input" required>
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <button class="button is-primary is-small is-fullwidth" v-on:click="passwordResetConfirm()">
      Change password
    </button>
  </form>
</div>
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
        new_password: "",
        re_new_password: "",
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
    },
  }
</script>
