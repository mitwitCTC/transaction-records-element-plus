import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlatelistView from '../views/PlatelistView.vue'

function isBase64Encoded(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:plate',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        // 獲取路由參數 plate 
        const plate = to.params.plate;

        // 判斷參數是否經過 Base64 加密
        const isBase64 = isBase64Encoded(plate);

        if (!isBase64) {
          // 如果未經過加密，則進行加密
          const base64EncodedPlate = btoa(plate);
          // 重新導到加密後的路由
          next({ path: '/' + base64EncodedPlate });
        } else {
          // 如果已經經過加密，則繼續瀏覽
          next();
        }
      },
    },
    {
      path: '/',
      name: 'plateList',
      component: PlatelistView
    }
  ]
})

export default router
