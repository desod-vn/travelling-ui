<template>
    <section class="login">
        <div class="container">
            <div class="row d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div class="col-sx-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="login--main">
                        <div class="login--title">Đăng ký</div>

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
                                    Không thể đăng ký tài khoản. Vui lòng thử lại sau.
                                </div>
                            </div>


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

                            <div class="form-group">
                                <label class="form-control-label">Xác nhận mật khẩu: </label>
                                <span v-if="user.password != ''">
                                    <span
                                    v-if="user.password_confirmation == user.password"
                                    class="h5 text-white float-right"
                                    >
                                        <b-icon icon="check" class="rounded-circle bg-primary">
                                        </b-icon>
                                    </span>

                                    <span v-else class="h5 text-white float-right">
                                        <b-icon icon="exclamation" class="rounded-circle bg-danger">
                                        </b-icon>
                                    </span>
                                </span>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    class="form-control"
                                    v-model="user.password_confirmation"
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

                            <div class="d-flex align-items-center">
                                <div class="mr-auto">
                                    <router-link :to="{ name: 'login' }">
                                        <b-icon icon="arrow-left"></b-icon> Đã có tài khoản
                                    </router-link>
                                </div>

                                <button type="submit" class="btn btn-lg btn-primary">
                                    Đăng ký
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
import axios from "../../utils";

export default {
    data() {
        return {
            user: {
                email: "",
                name: "",
                password: "",
                password_confirmation: "",
                gender: "",
            },
            errors: {},
        };
    },

    methods: {
        handle () 
        {
            axios
            .post("register", this.user)
            .then((response) => {
                if (response.data.status) {
                    localStorage.setItem("token", response.data.token);
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