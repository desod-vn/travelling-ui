<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <h1>Danh sách nhóm</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-4 mb-5" v-for="(box, index) in all" :key="index">
        <div class="card">
          <img
            class="card-img-top"
            :src="box.image"
            height="200px"
            alt="Card image cap"
          />
          <div class="card-body">
            <h4 class="card-title">
              <router-link
                :to="{
                  name: 'chatBox',
                  params: { id: box.id, slug: box.slug },
                }"
                >{{ box.name }}
              </router-link>
            </h4>
            <p class="card-text">
              <b-icon icon="clock" /> {{ box.start }} đến {{ box.end }}
            </p>
            <p class="card-text">
              <b-icon icon="bicycle" /> Phương tiện: <b>{{ box.vehicle }}</b>
            </p>
            <p class="card-text">
              <b-icon icon="people" /> Số lượng thành viên:
              <b>{{ box.people }}</b>
            </p>
            <div class="d-flex justify-content-end">
              <router-link
                :to="{
                  name: 'chatBox',
                  params: { id: box.id, slug: box.slug },
                }"
                class="btn btn-primary"
                >Truy cập</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <h5 class="text-right">
          <router-link
            :to="{
              name: 'allBox',
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
        .get(`box`)
        .then((response) => {
          if (response.data.status) {
            this.all = response.data.data.data;
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
</style>
