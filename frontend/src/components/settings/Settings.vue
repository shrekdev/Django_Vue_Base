<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <p class="v-custom-header-name">task status</p>
      <v-container fluid>
        <v-layout wrap>
          <v-flex style="padding: 0px 10px 20px 0px;">
            <v-card light>
              <v-card-text style="padding: 15px 15px 0px 15px;">
                <template v-for ="item in getStatusList">
                  <template v-if="!item.is_new && !item.is_completed && item.is_active">
                    <TaskStatusUpdate :key="item.id" :id="item.id" :name="item.name" :color="item.color"/>
                  </template>
                </template>
                <TaskStatusCreate />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import TaskStatusUpdate from './TaskStatusUpdate.vue';
  import TaskStatusCreate from './TaskStatusCreate.vue';
  import { SETTINGS_GET_TASK_STATUS_LIST } from '@/store/actions/settings';
  import { TASKS_LOAD_STATUS_LIST } from '@/store/actions/tasks';

  export default {
    name: 'Settings',
    computed: {
      ...mapGetters(['getStatusList']),
    },
    mounted() {
      this.$store.dispatch(TASKS_LOAD_STATUS_LIST);
    },
    components: {
      TaskStatusUpdate,
      TaskStatusCreate
    },
  }
</script>

<style scoped>
  .v-custom-header-name {
    text-transform: uppercase;
    font-size: 15px;
    color: gray;
    margin-bottom: 0px;
  }
</style>
