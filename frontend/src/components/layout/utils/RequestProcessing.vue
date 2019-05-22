<template>
  <div v-if="getRequestProcessing">
    <v-progress-linear app indeterminate color="yellow" height="7"></v-progress-linear>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'RequestProcessing',
    computed: {
      ...mapGetters(['getRequestProcessing']),
    }
  };
</script>

<style scoped>
.v-progress-linear {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>