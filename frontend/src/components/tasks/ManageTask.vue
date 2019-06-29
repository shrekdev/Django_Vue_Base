<template>
  <section>
{{getTaskToUpdate}}
    <v-alert v-model="alertSuccess" type="success" dismissible>
      Task added! :)
    </v-alert>

    <v-alert v-model="alertError" type="error" dismissible>
      Something went wrong... :(
    </v-alert>

    <v-textarea dark solo v-model="taskTitle"></v-textarea>

    <v-select solo v-model="statusListSelected" item-text="name" item-value="id" :items="statusList"
      label="Status" chips persistent-hint >
    </v-select>

    <v-select solo v-model="categoryListSelected" item-text="name" item-value="id" :items="categoryList"
      label="Category" multiple chips persistent-hint >
    </v-select>

    <v-select solo v-model="priorityListSelected" :items="priorityList"
      label="Priority" chips persistent-hint >
    </v-select>

    <v-btn small @click="clearTaskFields()">Cancel</v-btn>
    <v-btn small v-if="getTaskToUpdate.id == -1" color="success" @click="addTask()">
      Add
    </v-btn>
    <v-btn small v-else color="success" @click="updateTask(getTaskToUpdate.id)">
      Update
    </v-btn>
  </section>



</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST, TASKS_UPDATE_TASK } from '@/store/actions/tasks';
  import { TASKS_STATUS_LIST, TASKS_PRIORITY_LIST } from './literals';

  export default {
    name: 'ManageTask',
    data() {
      return {
        alertSuccess: false,
        alertError: false,
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
      clearTaskFields() {
        this.alertSuccess = false;
        this.alertError = false;
        this.taskTitle = '';
        this.categoryListSelected = [];
        this.statusListSelected = '';
        this.priorityListSelected = '';
      },
      addTask() {
        console.log('add');
      },
      updateTask(taskId) {
        const payload = {
          id: taskId,
          title: this.taskTitle,
          status: this.statusListSelected,
          category: this.categoryListSelected,
          priority: this.priorityListSelected,
          created_by: this.createdBy,
          assigned_to: this.assignedTo,
        }

        // TODO: verify if anything has changed, prevent below request if not

        this.$store.dispatch(TASKS_UPDATE_TASK, payload).then((response) => {
          this.alertSuccess = true;
          this.alertError = false;
        }).catch(error => {
          this.alertSuccess = false;
          this.alertError = true;
        });
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_CATEGORY_LIST).then((response) => {
        this.categoryList = response.data;
      })
    },
    mounted() {
      for (var i = 0; i < this.categoryIds.length; i++) {
        this.categoryListSelected.push(this.categoryIds[i]);
      }
      this.statusListSelected = this.statusId;
      this.priorityListSelected = this.priorityId;
      this.taskTitle = this.taskText;
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
      createdBy: function created() {
        return this.getTaskToUpdate.created_by;
      },
      assignedTo: function assigned() {
        return this.getTaskToUpdate.assigned_to;
      },
    },
  }
</script>


<style scoped>
</style>
