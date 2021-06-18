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
import My from '../pages/user/My'
// BOX
import ChatBox from '../pages/box/Chat'
import CreateBox from '../pages/box/Create'
import EditBox from '../pages/box/Edit'
import AllBox from '../pages/box/All'

// PLACE
import OnePlace from '../pages/place/One'
import AllPlace from '../pages/place/All'



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

        // USER 
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
                path: '/user/my/',
                component: My,
                name: 'myBox',
                meta: {
                    title: 'Nhóm của tôi',
                }
            },
        
        // BOX CHAT
            {
                path: '/box/:id-:slug',
                component: ChatBox,
                name: 'chatBox',
                meta: {
                    title: 'Cuộc trò chuyện',
                }
            },
            {
                path: '/box/create',
                component: CreateBox,
                name: 'createBox',
                meta: {
                    title: 'Tạo nhóm chát',
                }
            },
            {
                path: '/box/edit/:id-:slug',
                component: EditBox,
                name: 'editBox',
                meta: {
                    title: 'Sửa cuộc trò chuyện',
                }
            },
            {
                path: '/box',
                component: AllBox,
                name: 'allBox',
                meta: {
                    title: 'Tất cả nhóm trò chuyện',
                }
            },

            // PLACE
            {
                path: '/place/:id-:slug',
                component: OnePlace,
                name: 'onePlace',
                meta: {
                    title: 'Địa điểm',
                }
            },
            {
                path: '/place',
                component: AllPlace,
                name: 'allPlace',
                meta: {
                    title: 'Tất cả địa điểm',
                }
            },
        
    ]
})