<template>
  <div id="app">
    <h1>Django and Vue</h1>
    <div id="nav">
     <router-link :to="{ name: 'UserAuth' }">Auth</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style>
#app {

}
</style>
