<template>
  <section>
    <v-btn fab small @click="markAsCompleted(tasksChecked)"><v-icon>done</v-icon></v-btn>
    <v-btn fab small @click="deleteTasks(tasksChecked)"><v-icon>delete</v-icon></v-btn>
    <v-divider class="mx-3" vertical></v-divider>
    <v-divider></v-divider>
    <br>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST, TASKS_UPDATE_TASK, TASKS_REMOVE_SELECTED, TASKS_MARK_COMPLETE_SELECTED } from '@/store/actions/tasks';

  export default {
    name: 'TasksBulkAction',
    props: ['tasksChecked'],
    data() {
      return {
      }
    },
    methods: {
      markAsCompleted(tasks) {
        this.$store.commit(TASKS_MARK_COMPLETE_SELECTED, tasks);
      },
      deleteTasks(tasks) {
        this.$store.commit(TASKS_REMOVE_SELECTED, tasks);
      },
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['getTasksCategoryList']),
    },
  }
</script>


<style scoped>
</style>
