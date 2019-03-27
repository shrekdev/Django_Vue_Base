<template>
  <section>
    <p v-if="non_field_errors" class="help is-danger">
      Podane dane uwierzytelniające są nieprawidłowe!
    </p>
    <br>

    <div class="field">
      <label class="label is-small">Imię</label>
      <div class="control has-icons-left has-icons-right">
        <input v-model="first_name"
          :class="first_name_error ? 'input is-danger' : 'input'"
          type="input">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <p v-if="first_name_error" class="help is-danger">
        To pole jest wymagane!
      </p>
    </div>

    <div class="field">
      <label class="label is-small">E-mail</label>
      <p class="control has-icons-left">
        <input v-model="email"
          :class="email_error ? 'input is-danger' : 'input'"
          type="email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
      <p v-if="email_error" class="help is-danger">
        To pole jest wymagane!
      </p>
    </div>

    <div class="field">
      <label class="label is-small">Hasło</label>
      <p class="control has-icons-left">
        <input v-model="password1"
          :class="password1_error ? 'input is-danger' : 'input'"
          type="password">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
      <p v-if="password1_error" class="help is-danger">
        To pole jest wymagane!
      </p>
    </div>

    <div class="field">
      <label class="label is-small">Powtórz hasło</label>
      <p class="control has-icons-left">
        <input v-model="password2"
          :class="password2_error ? 'input is-danger' : 'input'"
          type="password">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
      <p v-if="password1_error" class="help is-danger">
        To pole jest wymagane!
      </p>
    </div>

    <button class="button is-primary" v-on:click="sign_in()">
      Zarejestruj się
    </button>
  </section>
</template>


<script>
  export default {
    name: 'SignUp',
      data() {
        return {
          first_name: '',
          email: '',
          password1: '',
          password2: '',
        }
      },
      methods: {
      }
  }
</script>


<style scoped>
</style>
