<template>
  <section>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-flex sm6 md6>
        <v-text-field v-model="updateName" solo dark counter maxlength="30"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex sm2 md2>
        <v-text-field v-model="updateColor" solo dark counter maxlength="7"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex sm3 md3>
      <v-btn color="success" @click="updateStatus(id)"
        :disabled="updateName == name && updateColor == color ? true : false">Update</v-btn>
      <v-btn color="error" @click="deleteStatus(id)">Delete</v-btn>
      </v-flex>
    </v-layout>
  </section>
</template>


<script>
  import { SETTINGS_UPDATE_STATUS } from '@/store/actions/settings';


  export default {
    name: 'TaskStatusUpdate',
    props: ['id', 'name', 'color'],
    data(){
      return {
        updateName: this.name,
        updateColor: this.color,
      }
    },
    methods: {
      updateStatus(id) {
        const payload = {
          id: id,
          name: this.updateName,
          color: this.updateColor,
        }
        this.$store.dispatch(SETTINGS_UPDATE_STATUS, payload);
      },
      deleteStatus(id) {
        const payload = {
          id: id,
          is_active: false,
        }
        this.$store.dispatch(SETTINGS_UPDATE_STATUS, payload);
      },
    },
  }
</script>


<style scoped>
</style>
