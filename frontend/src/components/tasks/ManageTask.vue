<template>
  <section>
  {{getTaskIdToUpdate}}
    <v-alert v-model="alertSuccess" type="success" dismissible>
      Task added! :)
    </v-alert>
    <v-alert v-model="alertError" type="error" dismissible>
      Something went wrong... :(
    </v-alert>
<v-form ref="form" v-model="valid" lazy-validation>
    <v-textarea dark solo v-model="taskTitle" required></v-textarea>

    <v-select v-if="getTaskIdToUpdate == 0" solo v-model="statusSelectedDefault" item-text="name" item-value="id"
      :items="statusList" disabled label="Status" chips persistent-hint >
    </v-select>
    <v-select v-else solo v-model="statusListSelected" item-text="name" item-value="id" :items="statusList"
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
</v-form>
  </section>
</template>


<script>
  import {
    TASKS_LOAD_CATEGORY_LIST,
    TASKS_UPDATE_TASK,
    TASKS_LOAD_STATUS_LIST,
    CLEAR_TASK_TO_UPDATE_STATE,
    ADD_TASK,
  } from '@/store/actions/tasks';
  import {
    TASKS_PRIORITY_LIST,
    ID_FOR_NEW_TASK,
    ID_FOR_COMPLETED_TASK,
  } from './literals';
  import { mapGetters } from 'vuex';


  export default {
    name: 'ManageTask',
    data() {
      return {
        valid: true,
        statusSelectedDefault: ID_FOR_NEW_TASK,
        alertSuccess: false,
        alertError: false,
        taskTitle: '',
        createdBy: '',
        assignedTo: '',
        statusListSelected: '',
        priorityListSelected: '',
        statusList: [],
        categoryList: [],
        categoryListSelected: [],
        priorityList: TASKS_PRIORITY_LIST,
      }
    },
    methods: {
      clearTaskFields() {
        this.alertSuccess = false;
        this.alertError = false;
        this.taskTitle = '';
        this.priorityListSelected = '';
        this.categoryListSelected = [];
        this.statusListSelected = [];
        this.$store.commit(CLEAR_TASK_TO_UPDATE_STATE);
      },
      addTask() {
        const payload = {
          title: this.taskTitle,
          priority: this.priorityListSelected,
          created_by: 1,
          assigned_to: 1,
          status: ID_FOR_NEW_TASK,
          category: this.categoryListSelected,
        }
        this.$store.dispatch(ADD_TASK, payload).then((response) => {
          this.clearTaskFields();
        });
      },
      updateTask(taskId) {
        let status = this.statusListSelected;
        if(typeof this.statusListSelected === 'object') {
          status = this.statusListSelected.id
        }

        let completed = false;
        if(this.statusListSelected === ID_FOR_COMPLETED_TASK) {
          completed = true;
        }

        const payload = {
          id: taskId,
          status: status,
          completed: completed,
          title: this.taskTitle,
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
