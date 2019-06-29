<template>
<section>
  <div v-if="getTasksAddTaskStatus">
    <AddTask />
  </div>
    <v-list>
      <template v-for="item in getTasksList">
        <v-hover>
          <section slot-scope="{ hover }">
            <v-list-tile :key="item.id" ripple @click="updateTask(item)">
              <!--
              <v-list-tile>
                <v-checkbox v-model="selectedTasks" :value="item.id" @change="tasksSelectedChange(item.id)"></v-checkbox>
              </v-list-tile>
              -->



              <v-chip small style="width: auto;">{{ getStatusNameByValue(item.status)[0] }}</v-chip>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="hover">
                <v-btn icon @click="completeSingleTask(item)">
                  <v-icon color="primary">done</v-icon>
                </v-btn>
                <v-btn icon @click="deleteSingleTask(item.id)">
                  <v-icon color="primary">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </section>
        </v-hover>
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
  import AddTask from './AddTask.vue';

  export default {
    name: 'TaskList',
    created() {
      this.$store.dispatch(TASKS_LOAD_TASK_LIST).then(() => {
        console.log('fetched');
      }).catch(reason => {
        console.log('error: ', reason);
      })
    },
    methods: {
      updateTask(task) {
        this.$store.commit(TASKS_CHANGE_UPDATE_TASK_STATE, task);
      },
      completeSingleTask(task) {
        task.completed = true;
        task.status = '5';
        this.$store.dispatch(COMPLETE_SINGLE_TASK, task);
      },
      deleteSingleTask(taskId) {
        this.$store.dispatch(DELETE_SINGLE_TASK, taskId);
      },
      getStatusNameByValue(value) {
        return TASKS_STATUS_LIST.find(x => x.value === value).text;
      }
    },
    computed: {
      ...mapGetters(['getTasksList', 'getTasksAddTaskStatus']),
    },
    components: {
      AddTask,
    },
  }
</script>


<style scoped>
.v-sub-chip {
  margin-left: 60px;
  width: 80% !important;
}
.v-chip {
  width: 98%;
}
.v-cursor-default {
  cursor: default;
}
</style>
