<template>
    <div v-if="editPlace.status">
        <div class="mt-3 h3">
            <div class="d-flex justify-content-between align-items-center">
            <span>
                <b-icon icon="pencil"></b-icon>
                Chỉnh sửa địa danh
            </span>
            <span @click="deletePlace()">
                <b-icon icon="x-circle" class="text-danger"></b-icon>
            </span>
            </div>
        </div>
        <b-card no-body class="overflow-hidden">

            <b-row no-gutters>
                <b-col lg="12">
                    <b-card-img :src="editPlace.urlImage || editPlace.image" alt="Image" class="fixed--image"></b-card-img>
                </b-col>

                <b-col lg="12">
                    <b-card-body>
                        <b-card-text>
                            <form class="mx-auto" @submit.prevent="handle()">
                                <div class="form-group">
                                    <label class="form-control-label">Sửa tên địa danh: </label>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        v-model="editPlace.name"
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
                                    <button type="submit" class="mt-2 btn btn-block btn-outline-info">Chỉnh sửa</button>
                                </div>
                            </form>
                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>
<script>
import axios from '../../utils'

export default {
   data() {
       return {
           urlImage: '',
           changeImage: false,
       }
   },
   props: ["editPlace"],
   methods: {
        onFile (e) {
            this.changeImage = true
            this.editPlace.image = e.target.files[0]
            this.createImage(this.editPlace.image)
        },

        createImage (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.editPlace.urlImage = e.target.result
            }
            reader.readAsDataURL(file)
        },

        deletePlace () {
            let choose = confirm("Bạn có thực sự muốn xóa địa danh này không ?");
            if (choose == true)
                axios
                .delete(`place/${this.editPlace.id}`)
                .then((response) => {
                    if (response.data.status) {
                        this.success('xóa');
                    }
                })
        },

        handle () {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                }
            }

            let data = new FormData();
            if (this.changeImage) data.append("image", this.editPlace.image)
            data.append("name", this.editPlace.name)

            axios
            .post(`place/${this.editPlace.id}`, data, config)
            .then(response => {
                if (response.data.status) {
                    this.success('cập nhật')
                }
            })
            .catch(error => {
                this.failure(error.response.data)
            })
        },

        success(action) {
            this.$parent.getPlaces()
            this.editPlace.status = false
            this.changeImage = false
            this.$bvToast.toast(`Địa danh đã được ${action} thành công. Dữ liệu đã được cập nhật lại.`, {
                title: "Thông báo",
                variant: 'success',
                solid: true,
            })
        },

        failure (error) {
            let err = ''
            if (error.errors.name) err += error.errors.name
            else if (error.errors.image) err += error.errors.image
            this.$bvToast.toast(`${err}`, {
                title: `Có lỗi vui lòng thử lại`,
                variant: "danger",
                solid: true,
            })
        },
   }
}
</script>


<style scoped>
.fixed--image {
    height: 300px;
    max-width: 1000px;
}
</style>