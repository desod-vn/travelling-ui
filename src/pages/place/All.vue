<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="mt-5 mb-3">
            <router-link to="" class="text-dark"
              >Danh sách địa điểm</router-link
            >
          </h1>
        </div>
      </div>
      <div class="row mt-2" v-for="(place, index) in places" :key="index">
        <div class="col-4">
          <img height="200px" width="100%" :src="place.image" alt="" />
        </div>
        <div class="col-8">
          <strong
            ><h3>{{ place.name }}</h3>
          </strong>
          <hr />
          <router-link
            :to="{
              name: 'onePlace',
              params: { id: place.id, slug: place.slug },
            }"
            class="btn btn-primary"
            >Xem chi tiết</router-link
          >
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
      search: this.$route.query.search,
      places: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    getPlaces() {
      axios
        .get(`place?search=${this.search || ""}`)
        .then((response) => {
          if (response.data.status) {
            this.places = response.data.data;
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