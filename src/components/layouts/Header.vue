<template>
  <header class="mb-5">
    <b-navbar toggleable="md" type="light" class="blue">
      <div class="container">
        <b-navbar-brand>
          <router-link to="/">
            <img src="../../assets/logo.png" height="50px" alt="" />
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto m-1">
            <div v-if="getUserRole">
              <router-link
                class="desod--link"
                :to="{
                  name: 'dashboard',
                }"
              >
                <b-icon icon="joystick" />
                Quản trị
              </router-link>
            </div>
            <div v-if="getLogStatus">
              <router-link
                class="desod--link"
                :to="{
                  name: 'createBox',
                }"
              >
                <b-icon icon="plus-circle" />
                Nhóm mới
              </router-link>
            </div>

            <div v-if="getLogStatus">
              <b-nav-item-dropdown>
                <template #button-content>
                  <img
                    :src="getUserAvatar"
                    class="rounded-circle"
                    alt=""
                    height="40px"
                    width="40px"
                  />
                </template>
                <b-dropdown-item>
                  <strong>{{ getUserName }}</strong>
                </b-dropdown-item>
                <hr />
                <b-dropdown-item>
                  <router-link
                    :to="{
                      name: 'user',
                      params: { id: getUserId, slug: getUserSlug },
                    }"
                  >
                    <b-icon icon="person-lines-fill" />
                    <span class="text-primary"> Cá nhân </span>
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="{
                      name: 'avatar',
                    }"
                  >
                    <b-icon icon="file-person" />
                    <span class="text-primary"> Ảnh đại diện </span>
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="{
                      name: 'password',
                    }"
                  >
                    <b-icon icon="file-lock-fill" />
                    <span class="text-primary"> Đổi mật khẩu </span>
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <b-icon icon="box-arrow-in-right" />
                  <router-link class="text-danger" to="/logout">
                    Đăng xuất
                  </router-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </div>

            <div v-if="!getUserName">
              <router-link class="desod--link" to="/register">
                <b-icon icon="person-plus-fill"></b-icon>
                Đăng ký
              </router-link>

              <router-link class="desod--link" to="/login">
                <b-icon icon="person-fill"></b-icon>
                Đăng nhập
              </router-link>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <Menu />
  </header>
</template>
<script>
import Menu from "./Menu"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  created() {
    this.getUser();
  },
  components: {
    Menu
  },
  computed: {
    ...mapGetters([
      "getLogStatus",
      "getUserName",
      "getUserSlug",
      "getUserId",
      "getUserRole",
      "getUserAvatar",
    ]),
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>

<style scoped>
.blue {
  background: #2196f3;
}
.desod--link {
  text-transform: uppercase;
  color: white;
  padding: 0.6rem 1rem;
  margin: 0.2rem;
  display: inline-block;
  border-radius: 25px;
  border: 1px solid white;
}
#nav-collapse a:hover {
  text-decoration: none;
  color: #cccccc;
}
</style>