<template>
<section>
  <v-list>
    <template v-for="item in getTasksList">
      <v-hover>
        <section slot-scope="{ hover }">
          <v-list-tile :key="item.id" @click="updateTask(item.id)">
            <v-chip small :color="item.status.color" style="width: auto;">{{ item.status.name[0] }}</v-chip>
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
    COMPLETE_SINGLE_TASK,
    DELETE_SINGLE_TASK,
    TASKS_LOAD_TASK_LIST,
    TASKS_LOAD_STATUS_LIST
  } from '@/store/actions/tasks';
  import { mapGetters } from 'vuex';


  export default {
    name: 'TaskList',
    data() {
      return {
        statusList: []
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_STATUS_LIST).then((response) => {
        this.statusList = response.data;
      })
      this.$store.dispatch(TASKS_LOAD_TASK_LIST);
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
        this.$store.dispatch(COMPLETE_SINGLE_TASK, payload);
      },
      deleteSingleTask(taskId) {
        this.$store.dispatch(DELETE_SINGLE_TASK, taskId);
      },
      getTaskStatusNameByTaskId(taskId) {
        if(this.statusList.length > 0) {
          return this.statusList.find(item => item.id === taskId).name;
        }
      },
    },
    computed: {
      ...mapGetters(['getTasksList']),
    },
  }
</script>


<style scoped></style>