<template>
<section>
  <div v-if="getTasksAddTaskStatus">
    <AddTask />
  </div>
    <v-list>
      <template v-for="item in getTasksList">
        <v-hover>
          <section slot-scope="{ hover }">
            <v-list-tile :key="item.id" ripple @click="">
              <v-list-tile>
                <v-checkbox v-model="selectedTasksArray" :value="item.id"></v-checkbox>
              </v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="hover">
                <v-btn icon @click="updateTask(item)">
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </section>
        </v-hover>
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
                  <v-btn icon><v-icon color="primary">edit</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </section>
          </v-hover>
        </template>
        </div>
      </template>
    </v-list>
</section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_TASK_LIST } from '@/store/actions/tasks';
  import { TASKS_UPDATE_TASK_STATUS } from '@/store/actions/tasks';
  import AddTask from './AddTask.vue';

  export default {
    name: 'TaskList',
    data () {
      return {
        selectedTasksArray: [],
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_TASK_LIST).then(() => {
        console.log('fetched');
      }).catch(reason => {
        console.log('error: ', reason);
      })
    },
    methods: {
      updateTask(task) {
        console.log('title: ', task.title);
        this.$store.commit(TASKS_UPDATE_TASK_STATUS, task);
      }
    },
    computed: {
      ...mapGetters(['getTasksList', 'getTasksAddTaskStatus']),
    },
    components: {
      AddTask,
    }
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
