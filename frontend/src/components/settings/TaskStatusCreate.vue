<template>
  <section>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-flex sm6 md6>
        <v-text-field v-model="name" solo dark counter maxlength="30"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex sm2 md2>
        <v-text-field v-model="color" solo dark counter maxlength="7"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex sm3 md3>
        <v-btn color="success" @click="createStatus"
          :disabled="name && color ? false : true" >Create</v-btn>
      </v-flex>
    </v-layout>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';
  import { SETTINGS_CREATE_STATUS } from '@/store/actions/settings';


  export default {
    name: 'TaskStatusCreate',
    data(){
      return {
        name: "",
        color: ""
      }
    },
    methods: {
      createStatus(id) {
        const payload = {
          name: this.name,
          color: this.color,
          is_active: true,
          user: this.getUserId,
        }
        this.$store.dispatch(SETTINGS_CREATE_STATUS, payload);
        this.name = "";
        this.color = "";
      },
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
  }
</script>


<style scoped>
</style>
