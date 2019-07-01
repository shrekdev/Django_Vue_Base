<template>
<section>
{{getTasksList}}
    <v-list>
      <template v-for="item in getTasksList">
        <v-hover>
          <section slot-scope="{ hover }">
            <v-list-tile :key="item.id" @click="updateTask(item.id)">
              <v-chip small :color="item.status.color" style="width: auto;">s</v-chip>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="hover">
                <v-btn icon @click.stop="completeSingleTask(item.id)">
                  <v-icon color="primary">done</v-icon>
                </v-btn>
                <v-btn icon @click.stop="deleteSingleTask(item.id)">
                  <v-icon color="primary">delete</v-icon>
                </v-btn>
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
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_TASK_LIST } from '@/store/actions/tasks';
  import { TASKS_STATUS_LIST } from './literals';
  import {
    SET_TASK_ID_TO_UPDATE,
    COMPLETE_SINGLE_TASK,
    DELETE_SINGLE_TASK,
  } from '@/store/actions/tasks';

  export default {
    name: 'TaskList',
    created() {
      this.$store.dispatch(TASKS_LOAD_TASK_LIST);
    },
    methods: {
      updateTask(taskId) {
        this.$store.commit(SET_TASK_ID_TO_UPDATE, taskId);
      },
      completeSingleTask(taskId) {
        console.log('COMPLETED TASK: ', taskId)
//        this.$store.dispatch(COMPLETE_SINGLE_TASK, taskId).then((response) => {
//          console.log('response.data.status: ', response.data);
//          this.$store.commit(SET_TASK_ID_TO_UPDATE, response.data);
//        });
      },
      deleteSingleTask(taskId) {
        this.$store.dispatch(DELETE_SINGLE_TASK, taskId);
      },
    },
    computed: {
      ...mapGetters(['getTasksList']),
    },
  }
</script>


<style scoped></style>