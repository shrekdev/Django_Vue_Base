<template>
  <section>
    <v-textarea dark solo :value="getTaskToUpdate.title"></v-textarea>

    <v-select outline v-model="statusListSelected" :items="statusList"
      label="Status" chips persistent-hint >
    </v-select>

    <v-select outline v-model="categoryListSelected" item-text="name" item-value="id" :items="categoryList"
      label="Category" multiple chips persistent-hint >
    </v-select>

    <v-select outline v-model="priorityListSelected" :items="priorityList"
      label="Priority" chips persistent-hint >
    </v-select>

    <v-btn small>Cancel</v-btn>
    <v-btn small color="success">Save</v-btn>

  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST } from '@/store/actions/tasks';
  import { TASKS_STATUS_LIST, TASKS_PRIORITY_LIST } from './literals';

  export default {
    name: 'UpdateTask',
    data() {
      return {
        categoryListSelected: [],
        categoryList: [],
        statusListSelected: '',
        priorityListSelected: '',
        statusList: TASKS_STATUS_LIST,
        priorityList: TASKS_PRIORITY_LIST,
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
    },
    computed: {
      ...mapGetters(['getTasksCategoryList', 'getTaskToUpdate']),
      categoryIds: function category() {
        return this.getTaskToUpdate.category;
      },
      statusId: function status() {
        return this.getTaskToUpdate.status;
      },
      priorityId: function status() {
        return this.getTaskToUpdate.priority;
      },
    },
  }
</script>


<style scoped>
</style>
