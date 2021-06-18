<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="mt-5 mb-3 bg-primary p-2 text-light">Nhóm bạn quản lý</h1>
        </div>
      </div>
      <div class="row mt-2 mb-5" v-for="(box, index) in user.boxes" :key="index">
        <div class="col-4">
          <img height="200px" width="100%" :src="box.image" alt="" />
        </div>
        <div class="col-8">
          <strong
            ><h4>{{ box.name }}</h4>
          </strong>
          <b-list-group-item>
            <b-icon icon="clock" />
            <strong> {{ box.start }} đến {{ box.end }}</strong>
          </b-list-group-item>
          <b-list-group-item>
            <b-icon icon="people" /> Số lượng:
            <strong>{{ box.people }}</strong>
          </b-list-group-item>
          <b-list-group-item>
            <router-link
              :to="{
                name: 'chatBox',
                params: { id: box.id, slug: box.slug },
              }"
              class="btn btn-primary"
              >Truy cập</router-link
            >
          </b-list-group-item>
        </div>
      </div>
      <div class="row mt-2 mb-5">
        <div class="col-md-12">
          <h1 class="mt-5 mb-3 bg-primary p-2 text-light">Nhóm bạn tham gia</h1>
        </div>
      </div>
      <div class="row" v-for="(box, index) in user.member_in" :key="index">
        <div class="col-4">
          <img height="200px" width="100%" :src="box.image" alt="" />
        </div>
        <div class="col-8">
          <strong
            ><h4>{{ box.name }}</h4>
          </strong>
          <b-list-group-item>
            <b-icon icon="clock" />
            <strong> {{ box.start }} đến {{ box.end }}</strong>
          </b-list-group-item>
          <b-list-group-item>
            <b-icon icon="people" /> Số lượng:
            <strong>{{ box.people }}</strong>
          </b-list-group-item>
          <b-list-group-item>
            <router-link
              :to="{
                name: 'chatBox',
                params: { id: box.id, slug: box.slug },
              }"
              class="btn btn-primary"
              >Truy cập</router-link
            >
          </b-list-group-item>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import axios from "../../utils";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default {
  data() {
    return {
      user: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    getPlaces() {
      axios
        .get(`box/my`)
        .then((response) => {
          if (response.data.status) {
            this.user = response.data.data;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },

  mounted() {
    this.getPlaces();
  },
};
</script>

<style scoped>
#container {
  height: 200px;
  padding: 5px;
  position: relative;
}
#image {
  position: absolute;
  left: 0;
  height: 150px;
  width: 100%;
  top: 0;
}
#text {
  z-index: 100;
  position: absolute;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  bottom: 25%;
  text-shadow: 3px 3px 15px #000;
  left: 1;
}
</style>