<template>
  <v-app>
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout>
          <v-flex xs9 fluid ma-0 pa-0 fill-height>
            <News />
          </v-flex>
          <v-flex xs3>
            <div v-if="passwordResetConfirm">
              <v-container>
                <PasswordResetConfirm @resetConfirmed="updateResetPasswordState" />
              </v-container>
            </div>
            <div v-else>
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
  import News from './News.vue';
  import PasswordResetConfirm from './PasswordResetConfirm.vue';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        passwordResetConfirm: false,
      }
    },
    mounted() {
      if(this.uid && this.token) {
        this.passwordResetConfirm = true
      }
    },
    methods: {
      updateResetPasswordState() {
        this.passwordResetConfirm = !this.passwordResetConfirm
      },
    },
    name: 'UserAuth',
    components: {
      LogIn,
      SignUp,
      News,
      PasswordResetConfirm
    }
  }
</script>


<style scoped></style>