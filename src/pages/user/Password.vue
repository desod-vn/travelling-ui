<template>
    <section class="login">
        <Header />
        <div class="container">
            <div class="row d-flex flex-column justify-content-center align-items-center">
                <div class="col-sx-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="login--main">
                        <div class="login--title">Đổi mật khẩu</div>

                        <form @submit.prevent="handle()">
                            <div v-if="errors.errors">
                                <div
                                    class="alert alert-danger"
                                    v-for="error in errors.errors"
                                    :key="error.id"
                                >
                                    {{ error[0] }}
                                </div>
                            </div>

                            <div v-else>
                                <div class="alert alert-info" v-if="errors.message">
                                    Đổi mật khẩu không thành công. Mật khẩu cũ không chính xác.
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Mật khẩu cũ: </label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    class="form-control"
                                    v-model="user.oldPassword"
                                />
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Mật khẩu mới: </label>
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    v-model="user.password"
                                />
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Xác nhận mật khẩu mới: </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    class="form-control"
                                    v-model="user.password_confirmation"
                                />
                            </div>

                            <div class="d-flex align-items-center">
                                <button type="submit" class="btn btn-lg btn-success">
                                    Đổi mật khẩu
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Header from '../../components/layouts/Header'

import { mapGetters } from 'vuex'

import axios from "../../utils";

export default {
    data() {
        return {
            user: {
                oldPassword: "",
                password: "",
                password_confirmation: "",

            },
            errors: {},
        };
    },
    computed: {
        ...mapGetters(['getUserSlug' ,'getUserId'])
    },
    components: {
        Header,
    },
    methods: {
        handle () 
        {
            axios
            .post(`user/password/${this.getUserId}`, this.user)
            .then((response) => {
                if (response.data.status) {
                    this.$router.push({ name: "home" });
                }
                else {
                    this.errors = response.data;
                }
            })
            .catch((error) => {
                this.errors = error.response.data;
            });
        },
    },

}
</script>

<style scoped>
.login {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.login--main {
    background: #fff;
    padding: 2rem 2rem 4rem 2rem;
    border-radius: 10px;
}
.login--title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    padding: 2rem 0 2rem;
}
</style>