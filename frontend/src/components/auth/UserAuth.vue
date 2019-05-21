<template>
  <v-app>
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout>
          <v-flex xs9 fluid>
            <v-toolbar dense dark color="secondary" >
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat left><router-link to="/" class="v-tabs__item">news</router-link></v-btn>
                <v-btn flat><router-link to="about" class="v-tabs__item">about app</router-link></v-btn>
              </v-toolbar-items>
            </v-toolbar>
<!--
              <v-container fluid fill-height>
                <v-layout>
                  <router-view></router-view>
                </v-layout>
              </v-container>
-->
              <router-view></router-view>

          </v-flex>
          <v-flex xs3>
            <div v-if="passwordResetConfirm">
              <v-container>
                <PasswordResetConfirm @resetConfirmed="updateResetPasswordState" />
              </v-container>
            </div>
            <div v-else>
              <v-tabs dark color="secondary" slider-color="yellow" fixed-tabs>
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
      PasswordResetConfirm
    }
  }
</script>


<style scoped></style>