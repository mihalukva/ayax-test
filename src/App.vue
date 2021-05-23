<template>
  <v-app class="wrapper">
    <Skeleton></Skeleton>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
/* 
создание и заливка тестовой базы
import db from "./services/dbGenerator";
import connector from "./services/connector";
console.log(db);
connector.fetch("", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(db),
}); */

import Skeleton from "./components/Skeleton.vue";
export default Vue.extend({
  name: "App",
  components: { Skeleton },
});
</script>

<style lang="scss">
.wrapper{
  max-width: 1000px;
  margin: auto;
}
</style>
