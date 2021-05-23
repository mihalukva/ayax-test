<template>
  <div class="manager-list">
    <ManagerCard
      v-bind:manager="item"
      v-for="item in visibledList"
      v-bind:key="item.guid"
      v-on:click="$emit('click', $event)"
    />
    <div class="manager-list__controls">
      <v-pagination v-model="pageNumber" :length="paginatorLength"></v-pagination>
      <v-select :items="[3, 5, 10]" label="items per page" v-model="itemPerPage" dense></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ManagerCard from "../base/ManagerCard.vue";
import connector from "../../services/connector";

export default Vue.extend<any, any, any, any>({
  name: "SortedManagerList",
  components: { ManagerCard },
  data: () => {
    return {
      managerList: [],
      departmentList: [],
      itemPerPage: 5,
      pageNumber: 1,
    };
  },
  props: { filter: String },
  created: function() {
    const getManager = connector
      .fetch("/manager", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.managerList = Object.values(data);
        console.log("data from server ", data);
      });
    const getDepartments = connector
      .fetch("/departments", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.departmentList = Object.values(data);
        console.log("data from server ", data);
      });
    Promise.all([getManager, getDepartments]);
  },
  computed: {
    filteredManagerList: function() {
      const filteredManagerList = this.managerList.filter((manager: any) => {
        const department = this.departmentList.find((dep: any) => {
          if (dep.id === manager.department) return true;
        });
        if (
          manager.firstName.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
          manager.lastName.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
          department?.name?.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        )
          return true;
      });
      return filteredManagerList;
    },
    paginatorLength: function() {
      return Math.ceil(this.filteredManagerList.length / this.itemPerPage);
    },
    visibledList: function() {
      const start = (this.pageNumber - 1) * this.itemPerPage;
      const end = start + this.itemPerPage;
      return this.filteredManagerList.slice(start, end);
    },
  },
  watch: {},
  methods: {},
});
</script>

<style lang="scss">
.manager-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__controls {
    display: flex;
  }
}
.filter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  position: relative;
  margin: 20px;
}
.picker {
  position: absolute;
  z-index: 99;
  box-shadow: 0px 0px 5px -2px black;
}
.search {
  width: 100%;
  max-width: 300px;
  display: flex;
}
</style>
