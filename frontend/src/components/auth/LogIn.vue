<template>
  <section>

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

      <button class="button is-primary" v-on:click="log_in()">
        Zaloguj się
      </button>
    </form>
        <br>
        <PasswordReset />

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
      }
    },
    computed: {
      ...mapGetters(['authErrors']),
    },
    components: {
    }
  }
</script>

<style scoped>
</style>
