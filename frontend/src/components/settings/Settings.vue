<template>
  <section>
    <v-content style="padding: 10px 0px 0px 10px;">
      <p class="v-custom-header-name">task status</p>
      <v-container fluid>
        <v-layout wrap>



  <v-flex lg color="primary" style="padding: 0px 10px 20px 0px;">
    <v-card light>
      <v-card-text style="padding: 15px 15px 0px 15px;">

<v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field label="" solo dark ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn color="success">Activate</v-btn>
        <v-btn color="warning">Deactivate</v-btn>
</v-layout>


      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-flex>



        </v-layout>
      </v-container>
    </v-content>
  </section>
</template>


<script>
  import { mapGetters } from 'vuex';


  export default {
    name: 'Settings',
    computed: {
      ...mapGetters(['getStatusList']),
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
