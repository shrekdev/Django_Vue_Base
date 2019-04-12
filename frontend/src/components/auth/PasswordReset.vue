<template>
  <section>
    <form>
      <div v-if="getAccountPasswordResetStatus === 'success'">
        <article class="message is-success is-small has-text-centered">
          <div class="message-body">
            To continue check your email and follow the steps
          </div>
        </article>
      </div>
      <br>
      <div class="field">
        <label class="label is-small">E-mail</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="email" type="input" class="input" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p v-if="getAccountPasswordResetErrors.length">
          <p class="help is-danger" v-for="error in getAccountPasswordResetErrors.email">{{ error }}</p>
        </p>
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
      ...mapGetters(['getAccountPasswordResetStatus', 'getAccountPasswordResetErrors']),
    },
  }
</script>
