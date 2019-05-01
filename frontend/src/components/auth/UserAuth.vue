<template>
<div class="columns">
  <div class="column is-8">
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">

        </div>
      </div>
    </section>
  </div>
  <div class="column is-4">
    <section class="hero is-fullheight">
      <div class="hero-body align-baseline">
        <div v-if="passwordResetConfirm" class="container">
          <PasswordResetConfirm @resetConfirmed="updateResetPasswordState" />
        </div>
        <div v-else class="container">
          <div class="tabs is-small is-centered is-right is-toggle is-fullwidth">
            <ul>
              <li :class="logInActive ? 'is-active' : null" v-on:click="switch_tab('sign_in')">
                <a>Log in</a>
              </li>
              <li :class="signUpActive ? 'is-active' : null" v-on:click="switch_tab('sign_up')">
                <a>Sign up</a>
              </li>
            </ul>
          </div>
          <div id="tab-content">
            <p :class="logInActive ? 'is-active' : null">
              <LogIn />
            </p>
            <p :class="signUpActive ? 'is-active' : null">
              <SignUp />
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>


<script>
  import LogIn from './LogIn.vue';
  import SignUp from './SignUp.vue';
  import PasswordResetConfirm from './PasswordResetConfirm.vue';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        logInActive: true,
        signUpActive: false,
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        passwordResetConfirm: false,
      }
    },
    mounted() {
      if(this.uid && this.token) {
        console.log('password reset confirm');
        this.passwordResetConfirm = true
      }
    },
    methods: {
      updateResetPasswordState() {
        console.log('got event');
        this.passwordResetConfirm = !this.passwordResetConfirm
      },
      switch_tab(tab) {
        if(tab === 'sign_in') {
          this.logInActive = true,
          this.signUpActive = false
        } else {
          this.logInActive = false,
          this.signUpActive = true
        }
      }
    },
    name: 'UserAuth',
    components: {
      LogIn,
      SignUp,
      PasswordResetConfirm
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

  .align-baseline {
    align-items: baseline !important;
  }
</style>
