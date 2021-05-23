<template>
  <v-card
    class="mx-auto"
    max-width="600"
    style="margin-bottom:20px"
    width="100%"
    v-on:click="$emit('click', manager)"
  >
    <v-card-title>{{ manager.firstName + " " + manager.lastName }}</v-card-title>
    <v-card-text>
      <p>{{ "id : " + manager.id }}</p>
      <p>{{ "guid : " + manager.guid }}</p>
      <p>{{ "department : " + manager.department }}</p>
      <p>{{ "created at: " + manager.created }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "ManagerCard",
  props: {
    manager: Object,
  },
  computed: {
    data: function() {
      return moment(this.manager.created).format("DD.MM.YYYY HH:mm");
    },
  },
});
</script>

<style ln="scss"></style>
