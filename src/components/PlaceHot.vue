<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="mt-5 mb-3">
          <router-link
            :to="{
              name: 'allPlace',
            }"
            class="text-dark"
          >
            ĐỊA ĐIỂM
          </router-link>
        </h1>
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-6 mb-5"
        v-for="(place, index) in all.slice(0, 2)"
        :key="index"
      >
        <div id="container">
          <router-link
            :to="{
              name: 'onePlace',
              params: { id: place.id, slug: place.slug },
            }"
          >
            <img id="image" :src="place.image" />
            <p id="text">{{ place.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-3"
        v-for="(place, index) in all.slice(2, 10)"
        :key="index + 'ok'"
      >
        <div id="container">
          <img id="image" :src="place.image" />
          <router-link
            :to="{
              name: 'onePlace',
              params: { id: place.id, slug: place.slug },
            }"
          >
            <p id="text">{{ place.name }}</p>
          </router-link>
        </div>
      </div>
      <div class="col-12">
        <h5 class="text-right">
          <router-link
            :to="{
              name: 'allPlace',
            }"
            >Xem tất cả...</router-link
          >
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../utils";

export default {
  data() {
    return {
      all: "",
    };
  },
  methods: {
    getPlaces() {
      axios
        .get(`place`)
        .then((response) => {
          if (response.data.status) {
            this.all = response.data.data;
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