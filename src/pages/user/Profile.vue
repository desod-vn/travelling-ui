<template>
    <div id="home">
        <Header />
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-xl-4">
                    <img
                        :src="user.avatar"
                        class="img-fluid"
                        alt=""
                    />
                    <div
                        v-if="id == getUserId" 
                        class="mt-5 mb-5 d-flex justify-content-between"
                    >
                        <router-link
                            class="btn btn-primary"
                            :to="{
                                name: 'avatar'
                            }"
                        >
                            Thay ảnh đại diện
                        </router-link>
                        <router-link
                            class="btn btn-danger"
                            :to="{
                                name: 'password'
                            }"
                        >
                            Đổi mật khẩu
                        </router-link>
                    </div>
                </div>
                <div class="col-xl-8">
                    <p class="h2 font-weight-bold mb-4 d-flex justify-content-between">
                        {{ user.name }}
                        <span v-if="!edit">
                            <button
                                v-if="id == getUserId"
                                class="btn btn-info"
                                @click="() => { this.edit = !this.edit}"
                            >
                                Chỉnh sửa thông tin
                            </button>
                        </span>
                        <span v-else>
                            <button
                                v-if="id == getUserId"
                                class="btn btn-outline-info"
                                @click="() => { this.edit = !this.edit}"
                            >
                                Đóng
                            </button>
                        </span>
                    </p>
                    <p class="h4"><b-icon icon="envelope-fill" /> Địa chỉ email: {{ user.email }}</p>
                    <p class="h4"><b-icon icon="people-fill" /> Giới tính: {{ user.gender }}</p>
                    <p class="h4"><b-icon icon="phone-fill" /> Điện thoại: {{ user.phone }}</p>
                    <p class="h4"><b-icon icon="calendar2-check-fill" /> Ngày sinh: {{ user.birthday }}</p>
                    <p class="h4"><b-icon icon="hdd-stack-fill" /> Trạng thái:
                        <b :class="user.deleted_at ? 'text-danger' : 'text-success'">{{ user.deleted_at ? `Bị cấm` : `Kích hoạt` }}</b>
                    </p>
                    <div class="mt-2">
                        <Edit v-if="edit" :user="user" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/layouts/Header'
import Edit from '../user/Edit'

import { mapGetters } from 'vuex'
import axios from '../../utils'

export default {
    data() {
        return {
            edit: false,
            user: {},
            id: this.$route.params.id,
            slug: this.$route.params.slug,
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    methods: {
        getUser (id) {
            axios
            .get(`user/${id}`)
            .then(response => {
                if(response.data.status){
                    this.user = response.data.data
                    if(this.slug != this.user.slug)
                        this.$router.push({ name: "home" })
                }
            })
        }
    },
    mounted() {
        if(this.id)
            this.getUser(this.id)
        else 
            this.getUser(this.getUserId)
    },
    components: {
        Header,
        Edit,
    }
}
</script>
<style scoped>

</style>