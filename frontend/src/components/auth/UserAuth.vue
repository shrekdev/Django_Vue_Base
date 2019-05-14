<template>
  <v-app id="inspire">

    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout>

          <v-flex xs9 fluid ma-0 pa-0 fill-height>
            <v-sheet tile class="d-flex" color="blue" style="height: 100%">
            </v-sheet>
          </v-flex>

          <v-flex xs3>
            <div>
              <v-tabs dark color="dark" slider-color="yellow" fixed-tabs>
                <v-tab :key="1" ripple>Log in</v-tab>
                <v-tab :key="2" ripple>Sign up</v-tab>
                <v-tab-item :key="1">
                  <v-card flat>
                    <v-card-text><LogIn /></v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item :key="2">
                  <v-card flat>
                    <v-card-text><SignUp /></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer dark app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2019</span>
    </v-footer>

  </v-app>
</template>


<script>
  import LogIn from './LogIn.vue';
  import SignUp from './SignUp.vue';
  import PasswordResetConfirm from './PasswordResetConfirm.vue';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
//        logInActive: true,
//        signUpActive: false,
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
//      switch_tab(tab) {
//        if(tab === 'sign_in') {
//          this.logInActive = true,
//          this.signUpActive = false
//        } else {
//          this.logInActive = false,
//          this.signUpActive = true
//        }
//      }
    },
    name: 'UserAuth',
    components: {
      LogIn,
      SignUp,
      PasswordResetConfirm
    }
  }
</script>


<style scoped></style>