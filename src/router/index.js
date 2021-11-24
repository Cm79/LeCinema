import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import SavedMovie from '../views/SavedMovie.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'Movie Detail',
    component: MovieDetail
  },
  {
    path: '/saved',
    name: 'Saved Movie',
    component: SavedMovie
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
