<template>
  <section>
  {{getTaskIdToUpdate}}


  {{categoryListSelected}}
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
    <v-btn small v-if="getTaskIdToUpdate == 0" color="success" @click="addTask()">
      Add
    </v-btn>
    <v-btn small v-else color="success" @click="updateTask(getTaskIdToUpdate)">
      Update
    </v-btn>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST, TASKS_UPDATE_TASK, TASKS_LOAD_STATUS_LIST } from '@/store/actions/tasks';
  import { TASKS_PRIORITY_LIST } from './literals';

  export default {
    name: 'ManageTask',
    data() {
      return {
        alertSuccess: false,
        alertError: false,
        taskTitle: '',
        categoryListSelected: [],
        categoryList: [],
        statusList: [],
        statusListSelected: '',
        priorityListSelected: '',
        createdBy: '',
        assignedTo: '',
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

        console.log('payload.status -> ', payload.status)

        this.$store.dispatch(TASKS_UPDATE_TASK, payload).then((response) => {
          console.log('response.data: ', response.data)
//          this.categoryListSelected = response.data.category;
        })
//        this.$store.dispatch(TASKS_UPDATE_TASK, payload).then((response) => {
//          this.alertSuccess = true;
//          this.alertError = false;
//        }).catch(error => {
//          this.alertSuccess = false;
//          this.alertError = true;
//        });
      }
    },
    created() {
      this.$store.dispatch(TASKS_LOAD_CATEGORY_LIST).then((response) => {
        this.categoryList = response.data;
      })
      this.$store.dispatch(TASKS_LOAD_STATUS_LIST).then((response) => {
        this.statusList = response.data;
      })
    },
    mounted() {
        const t = this.taskToUpdate;
        this.categoryListSelected = t.category;
        this.statusListSelected = t.status;
        this.priorityListSelected = t.priority;
        this.taskTitle = t.title;
        this.createdBy = t.created_by;
        this.assignedTo = t.assigned_to;
    },
    computed: {
      ...mapGetters(['getTaskIdToUpdate', 'getTaskById']),
      taskToUpdate: function taskId() {
        const id = this.getTaskIdToUpdate;
        if(id != 0) {
          return this.getTaskById(id)[0]
        }
        return {};
      },
    },
  }
</script>


<style scoped>
</style>
