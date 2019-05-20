<template>
    <v-navigation-drawer permanent persistent v-model="drawer" :mini-variant="mini" dark app>
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/1.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Random User</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-spacer></v-spacer>
        <v-list-tile v-for="item in items" :key="item.title" @click="">

          <v-list-tile-action>
            <router-link :to="item.url">
              <v-icon>{{ item.icon }}</v-icon>
            </router-link>
          </v-list-tile-action>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</template>


<script>
  export default {
    name: 'NavDrawer',
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard', url: '/dashboard' },
          { title: 'Logout', icon: 'logout', url: '/logout'}
        ],
        mini: true,
      }
    },
  }
</script>