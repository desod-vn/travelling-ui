<template>
  <div>
    <b-card
      class="mt-3"
      header="Thành viên"
      v-if="member == 1 || getUserId == box.user.id"
    >
      <b-list-group>
        <div v-for="(mem, index) in box.has_members" :key="'ok' + index">
          <b-list-group-item
            v-if="mem.pivot.status == 1"
            class="d-flex justify-content-between align-items-center"
          >
            <router-link
              :to="{
                name: 'user',
                params: { id: mem.id, slug: mem.slug },
              }"
              ><img
                :src="mem.avatar"
                class="rounded-circle"
                alt=""
                height="40px"
                width="40px"
              />
              {{ mem.name }}</router-link
            >
            <button
              v-if="getUserId == box.user.id"
              class="btn btn-danger"
              @click="remove(mem.pivot.box_id, mem.id)"
            >
              Xóa
            </button>
          </b-list-group-item>
        </div>
      </b-list-group>
    </b-card>

    <b-card
      class="mt-3"
      header="Phê duyệt thành viên"
      v-if="getUserId == box.user.id"
    >
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <div class="p-2">
        Nhập email thành viên:
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="userMail" />
          <div class="input-group-append">
            <span class="btn btn-warning" @click.prevent="invite()">
              Thêm
            </span>
          </div>
        </div>
      </div>
      <div v-for="(mem, index) in box.has_members" :key="'ok' + index">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
          v-if="mem.pivot.status == 0"
        >
          <router-link
            :to="{
              name: 'user',
              params: { id: mem.id, slug: mem.slug },
            }"
            ><img
              :src="mem.avatar"
              class="rounded-circle"
              alt=""
              height="40px"
              width="40px"
            />
            {{ mem.name }}</router-link
          >
          <button
            class="btn btn-outline-primary"
            @click="consider(mem.pivot.box_id, mem.id)"
          >
            Phê duyệt
          </button>
        </b-list-group-item>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "../../utils";

export default {
  data() {
    return {
      userMail: "",
      error: "",
    };
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  props: ["box", "member", "joined"],

  methods: {
    consider(box, user) {
      axios.post(`box/consider/${box}`, { user: user }).then((reponse) => {
        if (reponse.data.status) this.$parent.getBox();
      });
    },
    remove(box, user) {
      axios.post(`box/remove/${box}`, { user: user }).then((reponse) => {
        if (reponse.data.status) this.$parent.getBox();
      });
    },
    invite() {
      axios
        .post(`box/invite/${this.box.id}`, { user: this.userMail })
        .then((reponse) => {
          if (reponse.data.status) {
            this.$parent.getBox();
            this.userMail = "";
            this.error = "";
          } else
            this.error =
              "Không tồn tại User với email tương ứng, vui lòng kiểm tra lại";
        });
    },
  },
};
</script>
<style scoped>
</style>