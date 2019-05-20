<template>
  <v-sheet tile class="d-flex" color="secondary" style="height: 100%">
  <v-container grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md4 d-flex>
        <v-sheet class="d-flex" color="primary" height="424">

        </v-sheet>
      </v-flex>
      <v-flex xs12 md4 d-flex>
        <v-layout wrap>
          <v-flex xs12>
            <v-sheet class="d-flex" color="accent" height="150">

            </v-sheet>
          </v-flex>
          <v-flex xs12>
            <v-sheet class="d-flex" color="primary" height="250">

            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 md4 d-flex>
        <v-sheet class="d-flex" color="primary" height="424">

        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
  </v-sheet>
</template>

<script>
  export default {
    name: 'News',
    mounted() {

    },
  }
</script>
