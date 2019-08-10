<template>
  <section>
    <v-content style="padding: 30px 0px 0px 10px;">
      <v-container fluid ma-0 pa-0 fill-height>
        <v-layout justify-space-between>

          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding-right: 10px;">
            <v-card light>
              <v-btn @click="test_home()">
                API test
              </v-btn>
            </v-card>
          </v-flex>

          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding-right: 10px;">
            <v-card light>

              <div class="v-card-box"></div>

              <v-card-text style="padding: 15px 15px 0px 15px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px;">do later</p>
                <p style="text-align: center; text-indent: 50px; font-size: 30px; margin-bottom: 5px;">:: 5 ::</p>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <p style="color: gray; text-transform: uppercase; font-size: 13px;">
                  click to see them all
                </p>
              </v-card-actions>
            </v-card>
          </v-flex>

          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding-right: 10px;">
            <v-card light>a
            </v-card>
          </v-flex>

          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding-right: 10px;">
            <v-card light>a
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>


  </section>
</template>


<script>
  import { TEST_ACTION } from '@/store/actions/auth';

  export default {
    name: 'Dashboard',
    methods: {
      test_home: function () {
        this.$store.dispatch(TEST_ACTION);
      }
    },
  }
</script>

<style scoped>
  .v-card-box {
    position: absolute;
    background-color: green;
    margin-left: 15px;
    width: 48px;
    height: 56px;
    top: -10px;
    padding: 40px 30px 40px 30px;
    border-radius: 25px;
  }
</style>