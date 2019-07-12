<template>
  <v-toolbar app>
    <v-toolbar-title>
      <v-btn fab big color="pink" @click="changeFormStatus"><v-icon>add</v-icon></v-btn>
    </v-toolbar-title>

    <v-divider class="mx-4" inset vertical></v-divider>
    <v-btn fab small @click.stop=""><v-icon>select_all</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="markAsCompleted(tasksChecked)"><v-icon>done</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="deleteTasks(tasksChecked)"><v-icon>star</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="deleteTasks(tasksChecked)"><v-icon>delete</v-icon></v-btn>
    <v-divider class="mx-4" inset vertical></v-divider>

    <v-spacer></v-spacer>
    <v-text-field solo dark append-icon="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { SHOW_TASK_FORM } from '@/store/actions/tasks';


  export default {
    name: 'NavToolbar',
    methods: {
      markAsCompleted(tasks) {
//        this.$store.commit(TASKS_MARK_COMPLETE_SELECTED, tasks);
      },
      deleteTasks(tasks) {
//        this.$store.commit(TASKS_REMOVE_SELECTED, tasks);
      },
      changeFormStatus() {
        this.$store.commit(SHOW_TASK_FORM);
      }
    },
    computed: {
      ...mapGetters(['getSelectedTasksIds']),

    },
  }
</script>
