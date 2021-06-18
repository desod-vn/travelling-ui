<template>
  <div id="home">
    <Header />
    <div class="container-fluid">
      <div class="row" v-if="loading">
        <div class="col-12 bg-dark text-light p-3 h2 text-center">
          {{ box.name }}
        </div>
        <div class="col-3">
          <div
            class="d-flex justify-content-between mb-2"
            v-if="getUserId == box.user.id"
          >
            <router-link
              :to="{
                name: 'editBox',
                params: { id: box.id, slug: box.slug },
              }"
              class="btn btn-info"
              >Sửa nhóm</router-link
            >
            <button @click="deleteBox()" class="btn btn-danger">
              Xóa nhóm
            </button>
          </div>
          <Infor :box="box" :joined="joined" :member="member" />
        </div>
        <div class="col-4">
          <div
            class="border"
            v-if="(joinedStatus && member == 1) || getUserId == box.user.id"
          >
            <div class="bg-primary p-2">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model="message.message"
                />
                <div class="input-group-append">
                  <span class="btn btn-secondary" @click.prevent="handle()">
                    Gửi tin nhắn
                  </span>
                </div>
              </div>
            </div>
            <div class="overflow-auto vh-100 p-2">
              <Message :messages="messages" />
            </div>
          </div>
          <div class="border" v-else>
            <img :src="box.image" class="img-thumbnail" alt="" />
            <hr />
            <div class="p-3">
              <h3>
                Xin chào đến với <b>{{ box.name }}</b>
              </h3>
              <div>
                <h5>
                  Để tham gia nhóm của chúng tôi xin bạn vui lòng tham khảo qua
                  những thông tin trên như <b>Lịch trình</b> nằm phía bên phải
                  màn hình của bạn và <b>các thông tin chi tiết</b> về chuyến đi
                  này. Sau đó nếu bạn cảm thấy chúng phù hợp thì hãy
                  <b>Đăng nhập</b> (nếu chưa đăng nhập) và tham gia ngay cùng
                  chúng tôi nhé. Xin cảm ơn !!! Mọi thông tin chi tiết vui lòng
                  trực tiếp liên hệ đến cá nhân
                  <strong>
                    <router-link
                      :to="{
                        name: 'user',
                        params: { id: box.user.id, slug: box.user.slug },
                      }"
                    >
                      {{ box.user.name }}
                    </router-link>
                  </strong>
                  chịu trách nhiệm về việc tổ chức hành trình này.
                </h5>
              </div>
              <hr />
              <div class="d-flex justify-content-center" v-if="getUserId">
                <button
                  v-if="member === 2"
                  @click="join()"
                  class="btn btn-success"
                >
                  Tham gia cùng chúng tôi
                </button>
                <button v-if="!member" @click="join()" class="btn btn-danger">
                  Hủy yêu cầu tham gia
                </button>
              </div>
              <div class="d-flex justify-content-center" v-else>
                <router-link
                  :to="{
                    name: 'login',
                  }"
                  class="btn btn-primary"
                  >Đăng nhập</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <Notification :box="box" />
          <b-alert show>
            <h5>Thông báo</h5>
            <hr />
            {{ box.content }}
          </b-alert>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Notification from "../../components/box/Notification";
import Message from "../../components/box/Message";
import Infor from "../../components/box/Infor";
import axios from "../../utils";
import { mapGetters } from "vuex";

window.pusher = require("pusher-js");

export default {
  data() {
    return {
      box: "",
      messages: "",
      id: this.$route.params.id,
      slug: this.$route.params.slug,
      message: {
        message: "",
        box_id: "",
      },
      joinedStatus: false,
      member: 2,
      loading: false,
    };
  },
  components: {
    Header,
    Footer,
    Notification,
    Message,
    Infor,
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  methods: {
    realChat() {
      window.Echo.channel(`chat.${this.id}`).listen(".MessageSent", () =>
        this.getBox()
      );
    },
    join() {
      axios
        .post(`box/join/${this.id}`)
        .then((response) => {
          if (response.data.status) this.joined();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBox() {
      axios.get(`box/${this.id}`).then((response) => {
        if (response.data.status) {
          this.box = response.data.data;
          this.messages = this.box.messages;
          this.loading = true;
          if (this.slug != this.box.slug) this.$router.push({ name: "home" });
        }
      });
    },

    handle() {
      this.message.box_id = this.id;
      axios.post(`message`, this.message).then(() => {
        this.message.message = "";
        this.realChat();
      });
    },

    joined() {
      axios
        .get(`box/joined/${this.id}`)
        .then((response) => {
          this.joinedStatus = response.data.status;
          this.member = 2;
          this.member = response.data.data.status;
          this.joinedStatus = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteBox() {
      let choose = confirm("Bạn có thực sự muốn xóa nhóm chát này không ?");
      if (choose == true)
        axios.delete(`box/${this.box.id}`).then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "home" });
          }
        });
    },
  },

  mounted() {
    this.getBox();
    this.joined();
    this.realChat();
  },
};
</script>
<style scoped>
</style>
