<template>
  <section>

    <v-select v-model="statusListSelected" :items="statusList"
      label="Status" chips persistent-hint >
    </v-select>

    <v-textarea solo :value="getTaskToUpdate.title"></v-textarea>

    <v-select v-model="categoryListSelected" item-text="name" item-value="id" :items="categoryList"
      label="Category" multiple chips persistent-hint >
    </v-select>

    <v-select v-model="priorityListSelected" :items="priorityList"
      label="Priority" chips persistent-hint >
    </v-select>

    <v-btn small>Cancel</v-btn>
    <v-btn small color="success">Save</v-btn>

  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST } from '@/store/actions/tasks';

  export default {
    name: 'UpdateTask',
    data() {
      return {
        categoryListSelected: [],
        categoryList: [],
        statusList: [
          {'value': '1', 'text': 'New'},
          {'value': '2', 'text': 'In Progress'},
          {'value': '3', 'text': 'Suspended'},
          {'value': '4', 'text': 'Cancelled'},
          {'value': '5', 'text': 'Completed'},
        ],
        statusListSelected: [],
        priorityList: [
          {'value': '1', 'text': 'Urgent and important'},
          {'value': '2', 'text': 'Important and not urgent'},
          {'value': '3', 'text': 'Urgent and not important'},
          {'value': '4', 'text': 'Not important and not urgent'},
        ],
        priorityListSelected: [],
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
    },
    computed: {
      ...mapGetters(['getTasksCategoryList', 'getTaskToUpdate']),
      categoryIds: function chart() {
        return this.getTaskToUpdate.category;
      },
    },
  }
</script>


<style scoped>
</style>
