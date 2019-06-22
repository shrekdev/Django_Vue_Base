<template>
  <section>
    <v-textarea dark solo v-model="taskTitle"></v-textarea>

    <v-select solo v-model="statusListSelected" :items="statusList"
      label="Status" chips persistent-hint >
    </v-select>

    <v-select solo v-model="categoryListSelected" item-text="name" item-value="id" :items="categoryList"
      label="Category" multiple chips persistent-hint >
    </v-select>

    <v-select solo v-model="priorityListSelected" :items="priorityList"
      label="Priority" chips persistent-hint >
    </v-select>

    <v-btn small>Cancel</v-btn>
    <v-btn small color="success" @click="updateTask(getTaskToUpdate.id)">Save</v-btn>

  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST, TASKS_UPDATE_TASK } from '@/store/actions/tasks';
  import { TASKS_STATUS_LIST, TASKS_PRIORITY_LIST } from './literals';

  export default {
    name: 'UpdateTask',
    data() {
      return {
        taskTitle: '',
        categoryListSelected: [],
        categoryList: [],
        statusListSelected: '',
        priorityListSelected: '',
        statusList: TASKS_STATUS_LIST,
        priorityList: TASKS_PRIORITY_LIST,
      }
    },
    methods: {
      updateTask(taskId) {
        const payload = {
          id: taskId,
          title: this.taskTitle,
          status: this.statusListSelected,
          category: this.categoryListSelected,
          priority: this.priorityListSelected,
        }
        this.$store.commit(TASKS_UPDATE_TASK, payload);
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_CATEGORY_LIST).then((response) => {
        this.categoryList = response.data;
      })
    },
    mounted() {
      for (var i = 0; i < this.categoryIds.length; i++) {
        this.categoryListSelected.push(this.categoryIds[i].id)
      }
      this.statusListSelected = this.statusId;
      this.priorityListSelected = this.priorityId;
      this.taskTitle = this.taskText;
      console.log('this.title ', this.taskText)
    },
    computed: {
      ...mapGetters(['getTasksCategoryList', 'getTaskToUpdate']),
      categoryIds: function category() {
        return this.getTaskToUpdate.category;
      },
      statusId: function status() {
        return this.getTaskToUpdate.status;
      },
      priorityId: function priority() {
        return this.getTaskToUpdate.priority;
      },
      taskText: function title() {
        return this.getTaskToUpdate.title;
      },
    },
  }
</script>


<style scoped>
</style>
