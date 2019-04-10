<template>
  <section>
    <form>
      <div class="field">
        <div v-if="getAccountPasswordResetStatus === ''">
          <p class="help is-info is-small has-text-centered">
            To reset your password, enter the email address you provided during account registration
          </p>
        </div>
        <div v-else-if="getAccountPasswordResetStatus === 'success'">
          <article class="message is-success is-small has-text-centered">
            <div class="message-body">
              To continue checking your email and follow the steps
            </div>
          </article>
        </div>
        <div v-else-if="getAccountPasswordResetStatus === 'error'">
          <article class="message is-danger is-small has-text-centered">
            <div class="message-body">
              Something went wrong, please try again later
            </div>
          </article>
        </div>
        <br>
        <div class="control has-icons-left has-icons-right">
          <input v-model="email" type="input" class="input" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>

      </div>
      <button class="button is-primary is-small is-fullwidth" v-on:click="passwordReset()">Resset password</button>
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
        console.log('clicked, email: ', this.email);
        if(this.email) {
          this.$store.dispatch(AUTH_PASSWORD_RESET, {
            email: this.email,
          }).then(() => {
            this.$router.push('/');
          })
        }
      }
    },
    computed: {
      ...mapGetters(['getAccountPasswordResetStatus']),
    },
  }
</script>
