<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="gray">
      <div class="container">
        <b-navbar-nav>
          <b-navbar-toggle target="nav-collapse-menu"></b-navbar-toggle>

          <b-collapse id="nav-collapse-menu" is-nav>
            <b-nav-item
              ><router-link
                :to="{
                  name: 'home',
                }"
                :class="currentRouteName == 'home' ? 'active--now' : ''"
                >TRANG CHỦ</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link
                :to="{
                  name: 'myBox',
                }"
                :class="currentRouteName == 'myBox' ? 'active--now' : ''"
                >NHÓM CỦA TÔI</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link
                :to="{
                  name: 'allPlace',
                }"
                :class="currentRouteName == 'allPlace' ? 'active--now' : ''"
                >DANH SÁCH ĐỊA ĐIỂM</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link
                :to="{
                  name: 'allBox',
                }"
                :class="currentRouteName == 'allBox' ? 'active--now' : ''"
                >DANH SÁCH NHÓM</router-link
              ></b-nav-item
            >
          </b-collapse>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
              v-model="one"
            ></b-form-input>
            <b-form-select
              size="sm"
              v-model="which"
              :options="options"
              class="mr-sm-2"
            ></b-form-select>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              @click.prevent="place()"
              >TÌM KIẾM</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: "",
      which: "",
      options: [
        { value: "place", text: "Địa điểm" },
        { value: "box", text: "Nhóm trò chuyện" },
      ],
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    place() {
      if (this.which == "place")
        this.$router.push({
          name: "allPlace",
          query: {
            search: this.one,
          },
        });
      if (this.which == "box")
        this.$router.push({
          name: "allBox",
          query: {
            search: this.one,
          },
        });
    },
  },
};
</script>
<style scoped>
.gray {
  background: #ddd;
}
.active--now {
  text-shadow: 1px 1px 2px #000;
  background: #fff;
  padding: 20px;
}
</style>