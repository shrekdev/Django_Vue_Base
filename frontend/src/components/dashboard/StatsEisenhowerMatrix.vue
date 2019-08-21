<template>
  <v-flex sm6 xs12 md6 lg3 color="primary" style="padding: 0px 10px 20px 0px;">
    <v-card light>

      <div class="v-card-box" :style="'background-color: ' + data[0].color"></div>

      <v-card-text style="padding: 15px 15px 0px 15px;">
        <p style="text-align: right; color: gray; text-transform: uppercase; font-size: 13px;">{{ data[0].label }}</p>
        <p style="text-align: center; text-indent: 50px; font-size: 30px; margin-bottom: 5px;">:: {{ data[0].qty }} ::</p>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <p style="color: gray; text-transform: uppercase; font-size: 13px;">
          click to see them all (id={{ data[0].id }})
        </p>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
  export default {
    name: 'StatsEisenhowerMatrix',
    props: ['data'],
  }
</script>

<style scoped>
  .v-card-box {
    position: absolute;
    background-color: green;
    margin-left: 15px;
    width: 48px;
    height: 56px;
    top: -10px;
    padding: 40px 30px 40px 30px;
    border-radius: 25px;
  }

  .v-custom-p {
    text-align: right;
    color: gray;
    text-transform: uppercase;
    font-size: 13px;
    margin-bottom: 0px;
  }

  .v-custom-date-format {
    color: gray;
    font-size: 15px;
    padding: 0px 5px 0px 10px;
  }
</style>