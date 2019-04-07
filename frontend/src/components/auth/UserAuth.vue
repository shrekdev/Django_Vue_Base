<template>
<div class="columns">
  <div class="column is-8">
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div v-if="getAccountActivationStatus === 'error'">
            <b-message type="is-danger" has-icon>
              error message
            </b-message>
          </div>
          <div v-else-if="getAccountActivationStatus === 'success'">
            <b-message type="is-success" has-icon>
              message success
            </b-message>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="column is-4">
    <section class="hero is-fullheight">
      <div class="hero-body align-baseline">
        <div class="container">

          <div class="tabs is-small is-centered is-right is-toggle is-fullwidth">
            <ul>
              <li :class="sign_in_active ? 'is-active' : null" v-on:click="switch_tab('sign_in')">
                <a>Log in</a>
              </li>
              <li :class="sign_up_active ? 'is-active' : null" v-on:click="switch_tab('sign_up')">
                <a>Sign up</a>
              </li>
            </ul>
          </div>

          <div id="tab-content">
            <p :class="sign_in_active ? 'is-active' : null">
              <LogIn />
            </p>
            <p :class="sign_up_active ? 'is-active' : null">
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
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        sign_in_active: true,
        sign_up_active: false,
      }
    },
    methods: {
      switch_tab(tab) {
        console.log('clicked: ', tab);
        if(tab === 'sign_in') {
          this.sign_in_active = true,
          this.sign_up_active = false
        } else {
          this.sign_in_active = false,
          this.sign_up_active = true
        }
      }
    },

    computed: {
      ...mapGetters(['getAccountActivationStatus']),
    },

    name: 'UserAuth',
    components: {
      LogIn,
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

  .align-baseline {
    align-items: baseline !important;
  }
</style>
