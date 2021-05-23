<template>
  <div>
    <header>
      <v-app-bar v-if="isMobile">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-app-bar v-else>
        <v-btn depressed v-on:click="pageNumber = 0">Новый мэнеджер</v-btn>
        <v-btn depressed v-on:click="pageNumber = 1">Список менеджеров</v-btn>
        <v-spacer></v-spacer>
        <v-text-field label="Filter" hide-details="auto" v-model="filter"></v-text-field>
        <v-btn icon v-on:click="pageNumber = 2">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute left temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item v-on:click="pageNumber = 0">
              <v-list-item-title>Новый мэнеджер</v-list-item-title>
            </v-list-item>
            <v-list-item v-on:click="pageNumber = 1">
              <v-list-item-title>Список менеджеров</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <v-main>
      <div v-if="pageNumber === -1" class="start-page">
        <h2>Start page</h2>
      </div>
      <NewManager v-if="pageNumber === 0"></NewManager>
      <ManagerList v-if="pageNumber === 1" v-on:click="openCard($event)"></ManagerList>
      <SortedManagerList
        v-if="pageNumber === 2"
        v-bind:filter="filter"
        v-on:click="openCard($event)"
      ></SortedManagerList>
      <EditManager v-if="pageNumber === 3" v-bind:manager="manager"></EditManager>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewManager from "./pages/New.vue";
import ManagerList from "./pages/List.vue";
import SortedManagerList from "./pages/Sorted.vue";
import EditManager from "./pages/Edit.vue";

export default Vue.extend({
  name: "Skeleton",
  components: { NewManager, ManagerList, SortedManagerList, EditManager },
  data: () => ({
    drawer: false,
    group: null,
    pageNumber: -1,
    filter: "",
    manager: {},
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
    /*     filter() {
      console.log(this.filter);
      this.pageNumber = 2;
    }, */
  },
  methods: {
    openCard: function(manager: any) {
      this.manager = manager;
      this.pageNumber = 3;
    },
  },
});
</script>

<style lang="scss">
.start-page {
  display: flex;
  justify-content: center;
}
</style>
