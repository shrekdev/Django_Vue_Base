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


<div class="tabs is-toggle">
  <ul>
    <li class="is-active"><a>Sign in</a></li>
    <li><a>Sign up</a></li>
  </ul>
</div>

<div id="tab-content">
  <p class="is-active" data-content="1">
    <SignIn />
  </p>
  <p data-content="2">
    <SignUp />
  </p>
  <p data-content="3">
    Videos
  </p>
  <p data-content="4">
    Documents
  </p>
</div>





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
    name: 'UserAuth',
    components: {
      SignIn,
      SignUp
    }
  }
</script>


<style scoped>
  #tab-content p {
    display: none;
  }

  #tab-content p.is-active {
    display: block;
  }
</style>
