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
              <SignIn />
            </b-tab-item>
            <b-tab-item label="Zarejestruj się">
              <SignUp />
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
  </div>
</div>
</template>


<script>
  import SignIn from './SignIn.vue';
  import SignUp from './SignUp.vue';

  export default {
    components: {
      SignIn,
      SignUp
    }
  }
</script>


<style scoped>
</style>
