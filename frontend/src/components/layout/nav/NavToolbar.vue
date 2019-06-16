<template>
  <v-toolbar app>
    <v-toolbar-title>
      <v-btn v-if="getTasksAddTaskStatus" fab dark color="primary" @click="addTask">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-btn v-else fab dark color="pink" @click="addTask">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field solo dark append-icon="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
  import store from '../../../store';
  import { mapGetters } from 'vuex';
  import { TASKS_ADD_TASK } from '@/store/actions/tasks';

  export default {
    name: 'NavToolbar',
    methods: {
      addTask: function() {
        this.$router.push({name: 'TaskList'});
        store.commit(TASKS_ADD_TASK);
      }
    },
    computed: {
      ...mapGetters(['getTasksAddTaskStatus']),
    },
  }
</script>
