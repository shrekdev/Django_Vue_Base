<template>
<section>
  <AddTask />
  <v-card>
    <v-item-group v-for="item in getTasksList" :key="item.id" class="v-cursor-default">
      <v-chip color="secondary" text-color="white" class="v-chip v-cursor-default">
        <v-avatar :color="item.category[0].color">
          {{ item.category[0].name[0] }}
        </v-avatar>
        {{ item.title }}
      </v-chip>

      <div v-if="item.sub_tasks.length > 0">
        <v-item-group v-for="sub_task in item.sub_tasks" :key="item.sub_tasks.id" class="v-cursor-default">
          <v-chip color="accent" text-color="white" class="v-sub-chip v-cursor-default">
            {{ sub_task.title }}
          </v-chip>
        </v-item-group>
      </div>
    </v-item-group>
  </v-card>
</section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_TASK_LIST } from '@/store/actions/tasks';
  import AddTask from './AddTask.vue';

  export default {
    name: 'TaskList',

    created() {
      this.$store.dispatch(TASKS_LOAD_TASK_LIST).then(() => {
        console.log('fetched');
      }).catch(reason => {
        console.log('error: ', reason);
      })
    },
    computed: {
      ...mapGetters(['getTasksList']),
    },
    components: {
      AddTask,
    }
  }
</script>


<style scoped>
.v-sub-chip {
  margin-left: 60px;
  width: 80% !important;
}
.v-chip {
  width: 98%;
}
.v-cursor-default {
  cursor: default;
}
</style>
