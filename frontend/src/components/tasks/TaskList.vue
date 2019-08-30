<template>
<section>
  <v-list>
    <template v-for="item in getTasksList">
      <v-hover>
        <section slot-scope="{ hover }">
          <v-list-tile :key="item.id" @click="updateTask(item.id)">
            <v-list-tile>
              <v-checkbox @click.stop="addTaskToSelected(item.id)" color="secondary" light v-model="getSelectedTasksIds" :value="item.id"></v-checkbox>
              <div class="text-xs-center">
                <v-btn @click.stop="stareTask(item.id, item.is_star)" text icon>
                  <v-icon v-if="item.is_star == false" color="grey">star</v-icon>
                  <v-icon v-else color="yellow">star</v-icon>
                </v-btn>
              </div>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-chip small :color="item.status.color" v-on="on" style="width: auto;">{{ item.status.name[0] }}</v-chip>
                </template>
                <span>{{ item.status.name }}</span>
              </v-tooltip>
            </v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="hover">
              <span>
                <v-btn v-if="!item.completed" icon @click.stop="completeSingleTask(item.id)">
                  <v-icon color="primary">done</v-icon>
                </v-btn>
                <v-divider class="mx-1" vertical></v-divider>
                <v-btn icon @click.stop="deleteSingleTask(item.id)">
                  <v-icon color="primary">delete</v-icon>
                </v-btn>
              </span>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </section>
      </v-hover>
    </template>
  </v-list>
</section>
</template>


<script>
  import {
    SET_TASK_ID_TO_UPDATE,
    PATCH_TASK,
    DELETE_SINGLE_TASK,
    TASKS_LOAD_TASK_LIST,
    TASKS_LOAD_STATUS_LIST,
    CHANGE_SELECTED_TASK,
  } from '@/store/actions/tasks';
  import { mapGetters } from 'vuex';


  export default {
    name: 'TaskList',
    data() {
      return {
        statusList: [],
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_STATUS_LIST).then((response) => {
        this.statusList = response.data;
      })
      if(this.$route.params.filter_by && this.$route.params.id) {
        const payload = {
          filter_by: this.$route.params.filter_by,
          id: this.$route.params.id
        }
        this.$store.dispatch(TASKS_LOAD_TASK_LIST, payload);
      } else {
        const payload = {
          filter_by: null,
          id: null
        }
        this.$store.dispatch(TASKS_LOAD_TASK_LIST, payload);
      }
    },
    methods: {
      updateTask(taskId) {
        this.$store.commit(SET_TASK_ID_TO_UPDATE, taskId);
      },
      // TODO: move status/completed to literals
      completeSingleTask(taskId) {
        const payload = {
          id: taskId,
          status: 2,
          completed: true,
        }
        this.$store.dispatch(PATCH_TASK, payload);
      },
      deleteSingleTask(taskId) {
        this.$store.dispatch(DELETE_SINGLE_TASK, taskId);
      },
      getTaskStatusNameByTaskId(taskId) {
        if(this.statusList.length > 0) {
          return this.statusList.find(item => item.id === taskId).name;
        }
      },
      stareTask(taskId, star) {
        const payload = {
          id: taskId,
          is_star: !star,
        }
        this.$store.dispatch(PATCH_TASK, payload);
      },
      addTaskToSelected(taskId) {
        this.$store.commit(CHANGE_SELECTED_TASK, taskId);
      },
    },
    computed: {
      ...mapGetters(['getTasksList', 'getSelectedTasksIds']),
    },
  }
</script>


<style scoped></style>