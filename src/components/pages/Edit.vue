<template>
  <div class="edit-manager">
    <ManagerEditor v-model="newManager"></ManagerEditor>
    <div class="edit-manager__control">
      <v-btn color="primary" v-on:click="updateManager()">
        Update
      </v-btn>
      <v-btn color="warning" v-on:click="dialog = true">
        Delete
      </v-btn>
    </div>
    <v-alert dense text type="success" :value="seccessAlert">
      Мэнеджер был создан <strong>text</strong> prop and a <strong>type</strong> of success
    </v-alert>
    <v-alert dense text type="warning" :value="warningAlert">
      Что то пошло не так <strong>text</strong> prop and a <strong>type</strong> of success
    </v-alert>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Подтвержение
        </v-card-title>
        <v-card-text>Вы уверенны?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text v-on:click="dialog = false">
            Отмена
          </v-btn>
          <v-btn color="green darken-1" text v-on:click="deleteManager()">
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ManagerEditor from "../base/ManagerEditor.vue";

import connector from "../../services/connector";
import moment from "moment";

export default Vue.extend<any, any, any, any>({
  name: "EditManager",
  components: { ManagerEditor },
  props: {
    manager: Object,
  },
  data: () => ({
    seccessAlert: false,
    warningAlert: false,
    newManager: {},
    dialog: false,
  }),
  created: function() {
    const x = { ...this.manager };
    x.created = moment(x.created).format("YYYY-MM-DD");
    this.newManager = x;
  },
  methods: {
    updateManager: function() {
      connector
        .fetch("/manager/" + this.newManager.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newManager),
        })
        .then(() => {
          this.seccessAlert = true;
          this.newManager = { firstName: "", lastName: "", department: "", created: "" };
          setTimeout(() => {
            this.seccessAlert = false;
          }, 3000);
        })
        .catch(() => {
          this.warningAlert = true;
          setTimeout(() => {
            this.warningAlert = false;
          }, 3000);
        });
    },
    deleteManager: function() {
      this.dialog = false
      connector
        .fetch("/manager/" + this.newManager.id, { method: "DELETE" })
        .then(() => {
          this.seccessAlert = true;
          this.newManager = { firstName: "", lastName: "", department: "", created: "" };
          setTimeout(() => {
            this.seccessAlert = false;
          }, 3000);
        })
        .catch(() => {
          this.warningAlert = true;
          setTimeout(() => {
            this.warningAlert = false;
          }, 3000);
        });
    },
  },
});
</script>

<style lang="scss">
.edit-manager {
  margin: 20px;
  &__control {
    margin-bottom: 20px;
  }
}
</style>
