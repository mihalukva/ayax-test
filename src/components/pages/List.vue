<template>
  <div class="manager-list">
    <div class="filter">
      <div>
        <v-text-field
          v-model="dateRangeText"
          label="Date range"
          prepend-icon="mdi-calendar"
          readonly
          v-on:click.self="changePickerVisibility()"
        ></v-text-field>
        <div v-if="isVisiblePicker" class="picker">
          <v-date-picker v-model="dates" range></v-date-picker>
        </div>
      </div>
      <v-text-field label="Last name" v-model="lastName"></v-text-field>
      <v-select :items="[3, 5, 10]" label="items per page" v-model="itemPerPage"></v-select>
    </div>
    <ManagerCard
      v-bind:manager="item"
      v-for="item in visibledList"
      v-bind:key="item.guid"
      v-on:click="$emit('click', $event)"
    />
    <v-pagination v-model="pageNumber" :length="paginatorLength"></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ManagerCard from "../base/ManagerCard.vue";
import moment from "moment";

import connector from "../../services/connector";

export default Vue.extend({
  name: "ManagerList",
  components: { ManagerCard },
  data: () => {
    return {
      managerList: [],
      dates: ["", ""],
      isVisiblePicker: false,
      itemPerPage: 5,
      pageNumber: 1,
      lastName: "",
      filteredManagerList: [],
    };
  },
  created: function() {
    connector
      .fetch("/manager", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.managerList = Object.values(data);
        this.filteredManagerList = Object.values(data);
        console.log("data from server ", Object.values(data));
      });
  },
  watch: {
    lastName: function() {
      this.filterManager();
    },
    dates: function() {
      this.filterManager();
    },
  },
  computed: {
    paginatorLength: function() {
      return Math.ceil(this.filteredManagerList.length / this.itemPerPage);
    },
    dateRangeText: function() {
      return this.dates.join(" ~ ");
    },
    visibledList: function() {
      const start = (this.pageNumber - 1) * this.itemPerPage;
      const end = start + this.itemPerPage;
      return this.filteredManagerList.slice(start, end);
    },
  },
  methods: {
    openCard: function(id:any) {
      console.log("object",id);
    },
    filterManager: function() {
      const filteredManagerList = this.managerList.filter((item: any) => {
        const newDate = moment(this.dates[0]).isBefore(this.dates[1])
          ? [this.dates[0], this.dates[1]]
          : [this.dates[1], this.dates[0]];

        console.log(this.dates);
        console.log(this.lastName);
        if (this.dates[0] === "" || this.dates[1] === "") {
          if (item.lastName.toLowerCase().indexOf(this.lastName.toLowerCase()) > -1) return true;
        }

        if (this.dates[0] !== "" && this.dates[1] !== "") {
          if (
            moment(item.created).isBetween(newDate[0], newDate[1], undefined, "[]") &&
            item.lastName.toLowerCase().indexOf(this.lastName.toLowerCase()) > -1
          )
            return true;
        }
      });

      this.filteredManagerList = filteredManagerList;
      this.pageNumber = 1;
    },
    changePickerVisibility: function() {
      console.log(this.isVisiblePicker);
      this.isVisiblePicker = !this.isVisiblePicker;
    },
  },
});
</script>

<style ln="scss">
.manager-list {
  display: flex;
  flex-direction: column;
  align-items: center;
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
