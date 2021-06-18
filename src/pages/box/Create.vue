<template>
  <div id="home">
    <Header />
    <div class="container border p-3">
      <h2>Tạo nhóm chat</h2>
      <hr />
      <form class="mx-auto" @submit.prevent="handle()">
        <div class="form-group">
          <label class="form-control-label"
            >Tên nhóm chát: <b class="text-danger">*</b></label
          >
          <input
            type="text"
            name="name"
            class="form-control"
            v-model="box.name"
          />
        </div>

        <div class="form-group">
          <label class="form-control-label">Hình ảnh: <b class="text-danger">*</b></label>
          <input
            type="file"
            name="image"
            class="form-control-file"
            @change="onFile"
          />
        </div>

        <div class="row">
          <div class="col">
            <label class="form-control-label">Phương tiện: <b class="text-danger">*</b></label>
            <input
              type="text"
              name="name"
              class="form-control"
              v-model="box.vehicle"
            />
          </div>
          <div class="col">
            <label class="form-control-label">Số người: <b class="text-danger">*</b></label>
            <input
              type="number"
              name="name"
              class="form-control"
              v-model="box.people"
            />
          </div>
          <div class="col">
            <label class="form-control-label">Chi phí: </label>
            <input
              type="number"
              name="name"
              class="form-control"
              v-model="box.fee"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label">Trạng thái nhóm: </label>
          <input
            type="text"
            name="name"
            class="form-control"
            v-model="box.status"
          />
        </div>

        <div class="form-group">
          <label class="form-control-label">Thông tin chung: </label>
          <textarea
            class="form-control"
            v-model="box.content"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-control-label">Địa điểm: <b class="text-danger">*</b></label>
          <div class="border p-3">
            <div class="input-group mt-3 mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><b-icon icon="search" /></span>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="place"
                @change="getPlaces(place)"
              />
            </div>

            <div class="pt-3 pb-3">
              <span v-for="(place, index) in places" :key="index">
                <span
                  @click="infor(place.id)"
                  :class="
                    place.id == box.place_id
                      ? 'btn btn-dark rounded-pill m-1'
                      : 'btn btn-outline-dark rounded-pill m-1'
                  "
                >
                  {{ place.name }}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-control-label">Ngày bắt đầu: <b class="text-danger">*</b></label>
            <input
              type="date"
              name="name"
              class="form-control"
              v-model="box.start"
            />
          </div>
          <div class="col">
            <label class="form-control-label">Ngày kết thúc: <b class="text-danger">*</b></label>
            <input
              type="date"
              name="name"
              class="form-control"
              v-model="box.end"
            />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button type="submit" class="mt-2 btn btn-info">Tạo ngay</button>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "../../utils";

export default {
  data() {
    return {
      place: "",
      places: {},
      box: {
        name: "",
        status: "",
        content: "",
        vehicle: "",
        people: "",
        start: "",
        end: "",
        fee: "",
        place_id: "",
        image: "",
      },
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    onFile(e) {
      this.box.image = e.target.files[0];
    },

    infor(id) {
      this.box.place_id = id;
    },

    handle() {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let data = new FormData();
      data.append("image", this.box.image);
      data.append("name", this.box.name);
      data.append("status", this.box.status);
      data.append("content", this.box.content);
      data.append("vehicle", this.box.vehicle);
      data.append("people", this.box.people);
      data.append("fee", this.box.fee || 0);
      data.append("start", this.box.start);
      data.append("end", this.box.end);
      data.append("place_id", this.box.place_id);
      data.append("people", this.box.people);

      axios
        .post("box", data, config)
        .then((response) => {
          if (response.data.status) {
            this.success();
            this.$router.push({
              name: "chatBox",
              params: {
                id: response.data.data.id,
                slug: response.data.data.slug,
              },
            });
          }
        })
        .catch((error) => {
          this.failure(error.response.data);
        });
    },

    getPlaces(name = "") {
      axios.get(`place?search=${name}`).then((response) => {
        if (response.data.status) {
          this.places = response.data.data;
        }
      });
    },

    success() {
      this.$bvToast.toast(`Nhóm chat đã được tạo mới thành công.`, {
        title: "Thông báo",
        variant: "success",
        solid: true,
      });
    },

    failure(error) {
      let err = "";
      for (const property in error.errors) {
        err += `${error.errors[property]}`;
      }

      this.$bvToast.toast(`${err}`, {
        title: `Có lỗi vui lòng thử lại`,
        variant: "danger",
        solid: true,
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
