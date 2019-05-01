<template>
  <section>
    <form>
      <div class="field">
        <label class="label is-small">E-mail</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="email" type="email" class="input" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p v-if="getAccountPasswordResetErrors.length">
          <p class="help is-danger" v-for="error in getAccountPasswordResetErrors.email">{{ error }}</p>
        </p>
      </div>
      <button class="button is-primary is-small is-fullwidth" v-on:click="passwordReset()">Reset password</button>
    </form>
  </section>
</template>

<script>
  import { AUTH_PASSWORD_RESET } from '@/store/actions/auth';
  import { mapGetters } from 'vuex';

  export default {
    name: 'PasswordReset',
    data() {
      return {
        email: '',
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
                text: 'To continue check your email and follow the steps'
              });
            }
            this.$router.push('/');
          })
        }
      }
    },
    computed: {
      ...mapGetters(['getAccountPasswordResetErrors']),
    },
  }
</script>
