import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home')
const Shopcart = () => import('views/shopcart/Shopcart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')

Vue.use(Router)

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/shopcart',
    component: Shopcart
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/profile',
    component: Profile
  }
]

export default new Router({
  routes,
  mode: 'history'
})
