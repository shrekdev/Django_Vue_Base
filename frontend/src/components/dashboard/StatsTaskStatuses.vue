<template>
  <v-layout wrap>
    <v-flex sm6 xs12 md6 lg6 color="primary" style="padding: 0px 10px 20px 0px;">
      <v-card light>
        <v-card-title style="padding: 8px 10px 8px 10px;">
          <p class="v-custom-p">
            upcoming deadlines
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding: 15px 15px 0px 0px;">
          <v-list>
            <template v-for="item in tasksWithDeadline">
              <v-hover>
                <section slot-scope="{ hover }">
                  <v-list-tile :key="item.id" style="padding-left:0px;">
                    <v-list-tile style="padding-left:0px;">
                    <div class="text-xs-center">
                      <v-icon v-if="item.in_danger == true" color="red">warning</v-icon>
                      <v-icon v-else color="yellow">warning</v-icon>
                    </div><v-spacer></v-spacer>
                    <div class="v-custom-date-format">
                      {{ item.due_to | formatDate }}
                    </div>
                    </v-list-tile>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                  </v-list-tile>
                </section>
              </v-hover>
              </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex sm6 xs12 md6 lg6 color="primary" style="padding: 0px 10px 20px 0px;">
      <v-card light>
        <v-card-title style="padding: 8px 10px 8px 10px;">
          <p class="v-custom-p">
            newly added
          </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding: 15px 15px 0px 0px;">
          <v-list>
            <template v-for="item in tasksNewlyAdded">
              <v-hover>
                <section slot-scope="{ hover }">
                  <v-list-tile :key="item.id">
                    <v-list-tile>
                      <v-icon color="green">add</v-icon>
                    <v-spacer></v-spacer>
                    <div class="v-custom-date-format">
                      {{ item.created | formatDate }}
                    </div>
                    </v-list-tile>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                  </v-list-tile>
                </section>
              </v-hover>
              </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import { DASHBOARD_STATS_NEW_AND_OLD_LOAD } from '@/store/actions/dashboard';
  import { mapGetters } from 'vuex';


  export default {
    name: 'StatsTaskStatuses',
    data() {
      return {
        tasksWithDeadline: [],
        tasksNewlyAdded: [],
      }
    },
    methods: {
      test_home: function () {
      }
    },
    created() {
      this.$store.dispatch(DASHBOARD_STATS_NEW_AND_OLD_LOAD, 12).then((response) => {
        this.tasksWithDeadline = response.data.tasks_with_deadline_upcoming;
        this.tasksNewlyAdded = response.data.tasks_newly_added;
      })
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
  }
</script>

<style scoped>
  .v-custom-p {
    text-align: right;
    color: gray;
    text-transform: uppercase;
    font-size: 13px;
    margin-bottom: 0px;
  }

  .v-custom-date-format {
    color: gray;
    font-size: 15px;
    padding: 0px 5px 0px 10px;
  }
</style>