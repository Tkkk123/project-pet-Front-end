import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "@/views/Layout/LayoutView.vue";
import DetailView from "@/views/Detail/DetailView.vue";
import mainView from "@/views/main/mainView.vue";
import CartList from "@/views/CartList/index.vue";
import Checkout from "@/views/Checkout/index.vue";
import Pay from "@/views/Pay/index.vue";
import Login from "@/views/Login/index.vue";
import Member from "@/views/Member/index.vue";
import UserInfo from "@/views/Member/components/UserInfo.vue";
import UserOrder from "@/views/Member/components/UserOrder.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LayoutView,
      children: [
        {
          path: "",
          component: mainView,
        },
        {
          path: "detail/:id",
          component: DetailView,
        },
        {
          path: "cartlist",
          component: CartList,
        },
        {
          path: "checkout",
          component: Checkout,
        },
        {
          path: "pay",
          component: Pay,
        },
        {
          path: "member",
          component: Member,
          children: [
            {
              path: "",
              component: UserInfo,
            },
            {
              path: "order",
              component: UserOrder,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 每次跳转时都滚动到顶部
    return { top: 0 };
  },
});

export default router;
