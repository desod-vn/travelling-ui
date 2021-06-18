<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="mt-5 mb-3">
            <router-link to="" class="text-dark">Danh sách nhóm </router-link>
          </h1>
        </div>
      </div>
      <div
        class="row mt-2 mb-5"
        v-for="(box, index) in boxes.data"
        :key="index"
      >
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
      <div class="row">
        <div class="col-xl-12">
          <div class="d-flex bg-dark p-2 justify-content-center">
            <pagination
              v-model="page"
              :records="total"
              :per-page="perPage"
              @paginate="getBoxes"
              :options="{ texts: { count: '' } }"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import axios from "../../utils";
import Pagination from "vue-pagination-2";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default {
  data() {
    return {
      search: this.$route.query.search,
      boxes: "",
      page: 1,
      total: 0,
      perPage: 9,
    };
  },
  components: {
    Header,
    Footer,
    Pagination,
  },
  methods: {
    getBoxes(page = 1) {
      axios
        .get(`box?page=${page}&search=${this.search || ""}`)
        .then((response) => {
          if (response.data.status) {
            this.boxes = response.data.data;
            this.total = response.data.data.total;
            this.perPage = response.data.data.per_page;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },

  mounted() {
    this.getBoxes();
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