<template>
    <div class="mt-5">
        <form class="mx-auto" @submit.prevent="handle()">
            <div class="form-group">
                <label class="form-control-label">Tên người dùng: </label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                    v-model="user.name"
                />
            </div>

           <div class="form-group">
                <label class="form-control-label">Giới tính: </label>
                <br />
                <div class="form-check form-check-inline">
                    <input 
                        class="form-check-input" 
                        type="radio"
                        name="gender"
                        id="male"
                        value="Nam"
                        v-model="user.gender"
                    />
                    <label class="form-check-label" for="male">Nam</label>
                </div>

                <div class="form-check form-check-inline">

                    <input 
                        class="form-check-input" 
                        type="radio"
                        name="gender"
                        id="female"
                        value="Nữ"
                        v-model="user.gender"
                    />
                    <label class="form-check-label" for="female">Nữ</label>
                </div>

                <div class="form-check form-check-inline">
                    <input 
                        class="form-check-input" 
                        type="radio"
                        name="gender"
                        id="other"
                        value="khác"
                        v-model="user.gender"
                    />
                    <label class="form-check-label" for="other">Khác</label>

                </div>
            </div>

            <div class="form-group">
                <label class="form-control-label">Số điện thoại: </label>
                <input
                    type="number"
                    name="name"
                    class="form-control"
                    v-model="user.phone"
                />
            </div>

            <div class="form-group">
                <label class="form-control-label">Ngày sinh: </label>
                <input
                    type="date"
                    name="name"
                    class="form-control"
                    v-model="user.birthday"
                />
            </div>
            <div class="d-flex align-items-center">
                <button type="submit" class="mt-2 btn btn-block btn-outline-info">Cập nhật</button>
            </div>
        </form>
    </div>       
</template>
<script>
import axios from '../../utils'

export default {
   data() {
       return {

       }
   },
   props: ["user"],
   methods: {

        handle () {
            axios
            .put(`user/${this.user.id}`, this.user)
            .then(response => {
                if (response.data.status) {
                    this.success()
                }
            })
            .catch(error => {
                this.failure(error.response.data)
            })
        },

        success() {
            this.$bvToast.toast(`Thông tin người dùng đã được cập nhật thành công. Dữ liệu đã được cập nhật lại.`, {
                title: "Thông báo",
                variant: 'success',
                solid: true,
            })
        },

        failure (error) {
            let err = ''
            if (error.errors.name) err += error.errors.name
            else if (error.errors.gender) err += error.errors.gender
            else if (error.errors.phone) err += error.errors.phone
            else if (error.errors.birthday) err += error.errors.birthday
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