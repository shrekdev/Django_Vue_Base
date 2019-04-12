<template>
  <section>
    <div v-if="getAccountActivationStatus === 'success'">
      <article class="message is-success is-small has-text-centered">
        <div class="message-body">
          Success! You can log in now :)
        </div>
      </article>
    </div>
    <div v-else-if="getAccountActivationStatus === 'error'">
      <article class="message is-danger is-small has-text-centered">
        <div class="message-body">
          error
        </div>
      </article>
    </div>
    <p v-if="authErrors.length">
      <p class="help is-danger" v-for="error in authErrors.non_field_errors">{{ error }}</p>
    </p>
    <br>
    <form>
      <div class="field">
        <label class="label is-small">E-mail</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="email" type="input" :class="authErrors.email ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p v-if="authErrors.length">
          <p class="help is-danger" v-for="error in authErrors.email">{{ error }}</p>
        </p>
      </div>
      <div class="field">
        <label class="label is-small">Password</label>
        <p class="control has-icons-left">
          <input v-model="password" type="password" :class="authErrors.password ? 'input is-danger' : 'input'" required>
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p v-if="authErrors.length">
          <p class="help is-danger" v-for="error in authErrors.password">{{ error }}</p>
        </p>
      </div>
      <button class="button is-primary is-small is-fullwidth" v-on:click="log_in()">Log in</button>
    </form>
    <div>
      <a class="help is-info has-text-centered" v-on:click="showPasswordResetForm = !showPasswordResetForm">Zapomniałeś hasła?</a>
      <div v-bind:class="showPasswordResetForm ? null : 'is-hidden'">
        <PasswordReset />
      </div>
    </div>
  </section>
</template>


<script>
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
      test_if: function(){
        return false;
      },
      log_in: function () {
        const credentials = {
          email: this.email,
          password: this.password
        }
        if (this.email && this.password) {
          this.$store.dispatch(AUTH_LOG_IN, {
            email: this.email,
            password: this.password
          }).then(() => {
            this.$router.push('/home');
          })
        }
      },
    },
    computed: {
      ...mapGetters(['authErrors', 'getAccountActivationStatus']),
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
