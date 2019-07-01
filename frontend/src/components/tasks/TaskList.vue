<template>
<section>
{{getTasksList}}
    <v-list>
      <template v-for="item in getTasksList">
        <v-list-tile :key="item.id" @click="updateTask(item)" @mouseover="hover = true" @mouseleave="hover = false">
        <!--
          <v-chip small :color="item.status.color" style="width: auto;">{{ item.status.name[0] }}</v-chip>
        -->
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



<!--
        <div v-if="item.sub_tasks.length > 0">
        <template v-for="sub_task in item.sub_tasks">
          <v-hover>
            <section slot-scope="{ hover }">
              <v-list-tile :key="item.sub_tasks.id" @click="" style="margin-left: 50px;">
                <v-list-tile>
                  <v-checkbox></v-checkbox>
                </v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title>
                    {{ sub_task.title }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="hover">
                  <v-btn icon><v-icon color="primary">done</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </section>
          </v-hover>
        </template>
        </div>
-->
      </template>
    </v-list>
</section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_TASK_LIST } from '@/store/actions/tasks';
  import { TASKS_STATUS_LIST } from './literals';
  import {
    TASKS_CHANGE_UPDATE_TASK_STATE,
    COMPLETE_SINGLE_TASK,
    DELETE_SINGLE_TASK,
  } from '@/store/actions/tasks';

  export default {
    name: 'TaskList',
    data() {
      return {
        hover: false,
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_TASK_LIST);
    },
    methods: {
      updateTask(task) {
        console.log('UPDATE TASK')
        this.$store.commit(TASKS_CHANGE_UPDATE_TASK_STATE, task);
      },
      completeSingleTask(taskId) {
        console.log('COMPLETED TASK')
        this.$store.dispatch(COMPLETE_SINGLE_TASK, taskId).then((response) => {
          console.log('response.data.status: ', response.data)
//          this.$store.commit(TASKS_CHANGE_UPDATE_TASK_STATE, response.data);
        });
      },
      deleteSingleTask(taskId) {
        this.$store.dispatch(DELETE_SINGLE_TASK, taskId);
      },
    },
    computed: {
      ...mapGetters(['getTasksList']),
    },
    components: {
    },
  }
</script>


<style scoped></style>