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
              <sign-in />
            </b-tab-item>
            <b-tab-item label="Zarejestruj się">
              <sign-up />
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
  </div>
</div>
</template>


<script>
</script>


<style scoped>
</style>
