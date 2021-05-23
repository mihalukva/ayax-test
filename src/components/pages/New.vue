<template>
  <div class="new-manager">
    <ManagerEditor v-model="manager"></ManagerEditor>
    <v-btn color="primary" v-on:click="createManagerAndUpload()" class="new-manager__control">
      Create
    </v-btn>
    <v-alert dense text type="success" :value="seccessAlert">
      Мэнеджер был создан <strong>text</strong> prop and a <strong>type</strong> of success
    </v-alert>
    <v-alert dense text type="warning" :value="warningAlert">
      Что то пошло не так <strong>text</strong> prop and a <strong>type</strong> of success
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ManagerEditor from "../base/ManagerEditor.vue";
import { v4 as uuidv4 } from "uuid";
import { idGenerator } from "../../services/lib";
import connector from "../../services/connector";

export default Vue.extend({
  name: "NewManager",
  components: { ManagerEditor },
  data: () => ({
    manager: { firstName: "", lastName: "", department: "", created: "" },
    seccessAlert: false,
    warningAlert: false,
  }),
  methods: {
    createManagerAndUpload: function() {
      let newManager: any = { ...this.manager };
      newManager.id = idGenerator();
      newManager.guid = uuidv4();
      connector
        .fetch("/manager/"+newManager.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newManager),
        })
        .then(() => {
          this.seccessAlert = true;
          this.manager = { firstName: "", lastName: "", department: "", created: "" };
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
.new-manager {
  margin: 20px;
  &__control{
      margin-bottom: 20px;
  }
}
</style>
