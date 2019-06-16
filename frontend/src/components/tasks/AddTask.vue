<template>
  <section>
    <v-card class="v-ma-pa-10">
      <v-card-text>
        <v-text-field solo dark append-icon="add"></v-text-field>
      </v-card-text>
      <v-divider class="my-2"></v-divider>
      <v-item-group multiple class="text-xs-center">
        <v-item v-for="item in getTasksCategoryList" :key="item.id">
          <v-chip label outline slot-scope="{ active, toggle }" :selected="active" @click="toggle" :color="item.color">
            <v-icon left>label</v-icon>{{ item.name }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>
    <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success">
          Let's do that!
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { TASKS_LOAD_CATEGORY_LIST } from '@/store/actions/tasks';

  export default {
    name: 'AddTask',
    created() {
      this.$store.dispatch(TASKS_LOAD_CATEGORY_LIST).then(() => {
        console.log('fetched');
      }).catch(reason => {
        console.log('error: ', reason);
      })
    },
    computed: {
      ...mapGetters(['getTasksCategoryList']),
    },
  }
</script>


<style scoped>
  .v-ma-pa-10 {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
</style>
