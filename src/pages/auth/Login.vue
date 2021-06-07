<template>
    <section class="login">
        <div class="container">
            <div class="row d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div class="col-sx-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="login--main">
                        <div class="login--title">Đăng nhập</div>

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
                                    Tên tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Địa chỉ email: </label>
                                <input
                                    type="email"
                                    name="email"
                                    class="form-control"
                                    v-model="user.email"
                                />
                            </div>

                            <div class="form-group">
                                <label class="form-control-label">Mật khẩu: </label>
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    v-model="user.password"
                                />
                            </div>

                            <div class="d-flex align-items-center">
                                <button type="submit" class="btn btn-lg btn-success">
                                    Đăng nhập
                                </button>

                                <div class="ml-auto">
                                    <router-link :to="{ name: 'register' }">
                                    Tạo tài khoản mới <b-icon icon="arrow-right"></b-icon>
                                    </router-link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "../../utils";

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            errors: {},
        };
    },

    methods: {
        handle () 
        {
            axios
            .post("login", this.user)
            .then((response) => {
                if (response.data.status) {
                    const data = response.data;
                    localStorage.setItem("token", data.token);
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
    background: url("../../assets/default/login.jpg");
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