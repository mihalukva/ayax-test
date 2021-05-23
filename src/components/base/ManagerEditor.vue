<template>
  <v-form ref="form">
    <div class="manager-editor">
      <div class="manager-editor__imputs">
        <v-text-field
          v-model="manager.firstName"
          :counter="10"
          label="First name"
          required
        ></v-text-field>
        <v-text-field
          v-model="manager.lastName"
          :counter="10"
          label="Last name"
          required
        ></v-text-field>
        <v-select
          v-model="manager.department"
          :items="departmentNameList"
          label="Department"
          required
        ></v-select>
      </div>
      <div class="manager-editor__picker">
        <v-date-picker v-model="manager.created"></v-date-picker>
      </div>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

import connector from "../../services/connector";
export default Vue.extend<any, any, any, any>({
  name: "ManagerEditor",
  model: {
    prop: "manager",
    event: "change",
  },
  props: {
    manager: Object,
  },
  created: function() {
    connector
      .fetch("/departments", { method: "get" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.departments = Object.values(data);
        console.log("data from server ", Object.values(data));
      });
    return [];
  },
  data: () => ({
    departments:[],
  }),
  computed:{
    departmentNameList:function(){
      return  this.departments.map((item: any) => {
         return  item.name;
        });
    }
  },
  watch: {
    firstName: function() {
      this.emit();
    },
    lastName: function() {
      this.emit();
    },
    select: function() {
      this.emit();
    },
    picker: function() {
      this.emit();
    },
  },
  methods: {
    emit: function() {
      const newManager = {
        firstName: this.manager.firstName,
        lastName: this.manager.lastName,
        department: this.manager.department,
        created: this.manager.created,
      };
      this.$emit("change", newManager);
    },
  },
});
</script>

<style lang="scss">
.manager-editor {
  display: flex;
  &__imputs {
    width: 100%;
    margin-right: 20px;
  }
  &__picker {
    box-shadow: 0px 0px 5px -2px black;
  }
}
</style>
