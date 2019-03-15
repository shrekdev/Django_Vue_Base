<template>
<div class="columns">
  <div class="column is-8">
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          main
        </div>
      </div>
    </section>
  </div>
  <div class="column is-4">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">

          <b-tabs type="is-toggle" expanded>
            <b-tab-item label="Zaloguj się">
              <section>
                <b-field label="Username"
                  type=""
                  v-bind:message="message">
                  <b-input value="" maxlength="50"></b-input>
                </b-field>

                <b-field label="Password">
                  <b-input type="password"
                    value="iwantmytreasure"
                    password-reveal>
                  </b-input>
                </b-field>
              </section>
              <button class="button is-primary"
                v-on:click="sign_in()">
                Zaloguj
              </button>
            </b-tab-item>

            <b-tab-item label="Zarejestruj się">
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

            </b-tab-item>
          </b-tabs>


        </div>
      </div>
    </section>
  </div>
</div>
</template>


<script>
    export default {
        data() {
            return {
                sign_in_username: '',
                sign_in_password: '',
                sign_in_status: ''
                message: 'test'
            }
        },
        methods: {
            sign_in() {
                alert('sign in');
            }
        }
    }
</script>


<style scoped>
</style>
