<template>
  <v-toolbar app>
    <v-toolbar-title>
      <v-btn fab big color="pink" @click="changeFormStatus"><v-icon>add</v-icon></v-btn>
    </v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-btn fab small @click.stop="selectAllTasks()"><v-icon>select_all</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="markAsCompleted()"><v-icon>done</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="markWithStar()"><v-icon>star</v-icon></v-btn>
    <v-btn fab :disabled="getSelectedTasksIds.length > 0 ? false : true" small @click.stop="deleteSelectedTasks()"><v-icon>delete</v-icon></v-btn>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer></v-spacer><v-spacer></v-spacer>
    <v-text-field v-model="searchValue" v-on:input="searchChangeHandler" solo dark clearable></v-text-field>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
  import { mapGetters } from 'vuex';
  import {
    SHOW_TASK_FORM,
    SELECT_ALL_TASKS,
    MARK_SELECTED_TASKS_AS_COMPLETED,
    MARK_SELECTED_TASKS_WITH_STAR,
    DELETE_SELECTED_TASKS,
    TASKS_LOAD_TASK_LIST,
  } from '@/store/actions/tasks';


  export default {
    name: 'NavToolbar',
    data() {
      return {
        searchValue: "",
      }
    },
    methods: {
      selectAllTasks(tasks) {
        this.$store.commit(SELECT_ALL_TASKS);
      },
      markAsCompleted() {
        this.$store.dispatch(MARK_SELECTED_TASKS_AS_COMPLETED);
      },
      markWithStar() {
        this.$store.dispatch(MARK_SELECTED_TASKS_WITH_STAR);
      },
      deleteSelectedTasks(tasks) {
        this.$store.dispatch(DELETE_SELECTED_TASKS);
      },
      changeFormStatus() {
        this.$store.commit(SHOW_TASK_FORM);
      },
      searchChangeHandler() {
        if(this.searchValue === null) {
          this.$store.dispatch(TASKS_LOAD_TASK_LIST);
          return;
        }

        if(this.searchValue.length >= 2) {
          const payload = {
            search: this.searchValue
          }
          this.$store.dispatch(TASKS_LOAD_TASK_LIST, payload);
        } else if(this.searchValue.length === 0) {
          this.$store.dispatch(TASKS_LOAD_TASK_LIST);
        }
      },
    },
    computed: {
      ...mapGetters(['getSelectedTasksIds']),
    },
  }
</script>
