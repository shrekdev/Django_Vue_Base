<template>
  <section>
    <v-layout row wrap>
      <v-flex sm6 md6>
        <v-text-field label="" solo dark ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex sm3 md3>
        <v-text-field label="" solo dark ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn color="success">Update</v-btn>
      <v-btn color="error">Delete</v-btn>
    </v-layout>
  </section>
</template>


<script>
  export default {
    name: 'TaskStatusUpdate',
  }
</script>


<style scoped>
</style>
