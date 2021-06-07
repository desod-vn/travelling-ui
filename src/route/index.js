import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
// AUTHENTICATE
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Logout from '../pages/auth/Logout'
// USER
import User from '../pages/user/Profile'
import Avatar from '../pages/user/Avatar'
import Password from '../pages/user/Password'



export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
            meta: {
                title: 'Website hỗ trợ và tổ chức tham gia hoạt động du lịch',
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard',
            meta: {
                title: 'Trang quản trị',
            }
        },
        {
            path: '/user/:id-:slug',
            component: User,
            name: 'user',
            meta: {
                title: 'Thông tin người dùng',
            }
        },
        {
            path: '/user/avatar/',
            component: Avatar,
            name: 'avatar',
            meta: {
                title: 'Thay ảnh đại diện',
            }
        },
        {
            path: '/user/password/',
            component: Password,
            name: 'password',
            meta: {
                title: 'Đổi mật khẩu',
            }
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: {
                title: 'Đăng nhập tài khoản',
            }
        },
        {
            path: '/register',
            component: Register,
            name: 'register',
            meta: {
                title: 'Đăng ký tài khoản',
            }
        },
        {
            path: '/logout',
            component: Logout,
            name: 'logout',
            meta: {
                title: 'Đăng xuất',
            }
        },
    ]
})