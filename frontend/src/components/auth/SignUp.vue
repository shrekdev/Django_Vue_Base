<template>
  <section>
    <b-field label="Nazwa użytkownika"
      type=""
      message="">
      <b-input value="" maxlength="50"></b-input>
    </b-field>

    <b-field label="E-mail"
      type=""
      message="">
      <b-input type="email"
        value=""
        maxlength="50">
      </b-input>
    </b-field>

    <b-field label="Hasło">
      <b-input type="password"
        value=""
        password-reveal>
      </b-input>
    </b-field>

    <b-field label="Potwierdź hasło">
      <b-input type="password"
        value=""
        password-reveal>
      </b-input>
    </b-field>
  </section>
</template>


<script>
    export default {
        name: 'SignUp',
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>


<style scoped>
</style>
