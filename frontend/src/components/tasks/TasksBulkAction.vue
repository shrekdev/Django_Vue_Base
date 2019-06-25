<template>
  <section>
    <v-btn fab small @click="markAsCompleted()"><v-icon>done</v-icon></v-btn>
    <v-btn fab small @click="deleteTasks()"><v-icon>delete</v-icon></v-btn>
    <v-divider class="mx-3" vertical></v-divider>
    <v-divider></v-divider>
    <br>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST, TASKS_UPDATE_TASK } from '@/store/actions/tasks';

  export default {
    name: 'TasksBulkAction',
    data() {
      return {
      }
    },
    methods: {
      markAsCompleted() {
        console.log('markAsCompleted');
      },
      deleteTasks() {
        console.log('deleteTasks');
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
