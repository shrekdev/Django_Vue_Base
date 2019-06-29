<template>
  <v-toolbar app>

    <v-toolbar-title></v-toolbar-title>

    <v-spacer></v-spacer>
    <v-text-field solo dark append-icon="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
  export default {
    name: 'NavToolbar',
    methods: {
    },
    computed: {
    },
  }
</script>
