<template>
  <v-navigation-drawer right app :value="getShowTakFormStatus">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid ma-0 pa-1>
      <ManageTask :key="getTaskIdToUpdate"/>
    </v-container>
    <v-container fluid ma-0 pa-1>
      <v-card></v-card>
    </v-container>
  </v-navigation-drawer>
</template>


<script>
  import { mapGetters } from 'vuex';
  import ManageTask from '../../tasks/ManageTask.vue';


  export default {
    name: 'NavDrawerRight',
    computed: {
      ...mapGetters(['getTaskIdToUpdate', 'getShowTakFormStatus']),
    },
    components: {
      ManageTask,
    }
  }
</script>
