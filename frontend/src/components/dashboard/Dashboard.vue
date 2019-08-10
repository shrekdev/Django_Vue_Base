<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <v-container fluid>
        <v-layout wrap>

          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <div class="v-card-box" style="background-color: green;"></div>

              <v-card-text style="padding: 15px 15px 0px 15px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px;">do first</p>
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



          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <div class="v-card-box" style="background-color: blue;"></div>

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




          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <div class="v-card-box" style="background-color: orange;"></div>

              <v-card-text style="padding: 15px 15px 0px 15px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px;">delegate</p>
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




          <v-flex sm6 xs12 md6 lg3 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <div class="v-card-box" style="background-color: pink;"></div>

              <v-card-text style="padding: 15px 15px 0px 15px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px;">eliminate</p>
                <p style="text-align: center; text-indent: 50px; font-size: 30px; margin-bottom: 5px;">:: 3 ::</p>
              </v-card-text>

              <v-divider></v-divider>
              <v-card-actions>
                <p style="color: gray; text-transform: uppercase; font-size: 13px;">
                  click to see them all
                </p>
              </v-card-actions>
            </v-card>
          </v-flex>













          <v-flex sm6 xs12 md6 lg6 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <v-card-title style="padding: 8px 10px 8px 10px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px; margin-bottom: 0px">
                  deadline is upcoming
                </p>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text style="padding: 15px 15px 0px 15px;">
                <v-list>
                <v-list-tile>
                  <v-list-tile>2019-10-10</v-list-tile><v-list-tile-content>task 1 deadline</v-list-tile-content>
                </v-list-tile>
                </v-list>
              </v-card-text>

            </v-card>
          </v-flex>


          <v-flex sm6 xs12 md6 lg6 color="primary" style="padding: 0px 10px 20px 0px;">
            <v-card light>

              <v-card-title style="padding: 8px 10px 8px 10px;">
                <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px; margin-bottom: 0px">
                  newly added
                </p>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text style="padding: 15px 15px 0px 15px;">
              </v-card-text>

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