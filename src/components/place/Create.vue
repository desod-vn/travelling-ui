<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col lg="6">
        <b-card-img
          :src="urlImage"
          alt="Image"
          class="fixed--image"
        ></b-card-img>
      </b-col>

      <b-col lg="6">
        <b-card-body>
          <b-card-text>
            <form class="mx-auto" @submit.prevent="handle()">
              <div class="form-group">
                <label class="form-control-label">Tên địa danh: </label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  v-model="place.name"
                />
              </div>
              <div class="form-group">
                <label class="form-control-label">Hình ảnh: </label>
                <input
                  type="file"
                  name="image"
                  class="form-control-file"
                  @change="onFile"
                />
              </div>
              <div class="d-flex align-items-center">
                <button type="submit" class="mt-2 btn btn-block btn-info">
                  Tạo mới
                </button>
              </div>
            </form>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import axios from "../../utils";

export default {
  data() {
    return {
      place: {
        name: "",
        image: "",
      },
      urlImage: "https://picsum.photos/1000/500/?image=29",
    };
  },
  methods: {
    onFile(e) {
      this.place.image = e.target.files[0];
      this.createImage(this.place.image);
    },

    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.urlImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    handle() {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let data = new FormData();
      data.append("image", this.place.image);
      data.append("name", this.place.name);

      axios
        .post("place", data, config)
        .then((response) => {
          if (response.data.status) {
            this.success();
          }
        })
        .catch((error) => {
          this.failure(error.response.data);
        });
    },

    success() {
      this.$parent.getPlaces();
      this.$bvToast.toast(`Địa danh đã được tạo mới thành công.`, {
        title: "Thông báo",
        variant: "success",
        solid: true,
      });
    },

    failure(error) {
      let err = "";
      if (error.errors.name) err += error.errors.name;
      else if (error.errors.image) err += error.errors.image;
      this.$bvToast.toast(`${err}`, {
        title: `Có lỗi vui lòng thử lại`,
        variant: "danger",
        solid: true,
      });
    },
  },
};
</script>


<style scoped>
.fixed--image {
  height: 300px;
  max-width: 1000px;
}
</style>