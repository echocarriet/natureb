import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  // 前台
  {
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'faq',
        component: () => import('../views/frontend/Faq.vue'),
      },
      {
        path: 'contactus',
        component: () => import('../views/frontend/ContactUs.vue'),
      },
      {
        path: 'favorite',
        component: () => import('../views/frontend/Favorite.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: 'checkoutform',
        component: () => import('../views/frontend/CheckoutForm.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'paymentsuccess/:orderId',
        component: () => import('../views/frontend/PaymentSuccess.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
    ],
  },
  // 後台登入頁
  {
    path: '/login',
    component: () => import('../views/frontend/Login.vue'),
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
