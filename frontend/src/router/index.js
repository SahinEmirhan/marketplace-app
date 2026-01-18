import { createRouter, createWebHistory } from 'vue-router'
// Sayfa bileşenlerini (Views) import ediyoruz
import Home from '../Home.vue'
import Login from '../Login.vue'
import Register from '../Register.vue'
import MyProducts from '../MyProducts.vue'
import CreateProduct from '../CreateProduct.vue'
import ProductDetail from '../ProductDetail.vue'
import Chat from '../Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/my-products',
    name: 'MyProducts',
    component: MyProducts
  },
  {
    path: '/create-product',
    name: 'CreateProduct',
    component: CreateProduct,
    props: route => ({ productId: route.query.id })
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/chat/:productId',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
