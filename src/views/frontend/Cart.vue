<template>
  <Navbar />
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <header class="position-relative">
    <img
      class="bg-mask-60 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/checkout.jpg"
      alt="購物車banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      cart
    </h2>
  </header>
  <div class="window-vh100">
    <div class="container py-7 py-md-9" v-if="cart.final_total > 0">
      <h3 class="h3 fw-bold mb-4 mb-md-6">購物車</h3>
      <table class="table table-striped mb-4 mb-md-6">
        <thead>
          <tr class="text-center bg-brown-400">
            <th class="border-bottom-0 d-none d-md-table-cell" style="width:15%;"></th>
            <th class="border-bottom-0">名稱</th>
            <th class="cartQrt border-bottom-0 d-none d-md-table-cell">數量</th>
            <th class="border-bottom-0">單價</th>
            <th class="border-bottom-0">金額</th>
            <th class="border-bottom-0">刪除</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item" class="align-middle text-center">
              <th class="d-none d-md-table-cell">
                <img :src="item.product.imageUrl" :alt="item.product.title" style="width:100px;" />
              </th>
              <td>
                <p class="mb-2 mb-md-0">{{ item.product.title }}</p>
                <div class="input-group d-md-none">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-primary rounded-end-0 d-flex align-items-center"
                      type="button"
                      :disabled="item.qty === 1"
                      @click="updateCart(item.id, item.qty - 1)"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>
                  <span class="form-control text-center">{{ item.qty }}</span>
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary d-flex align-items-center rounded-start-0"
                      type="button"
                      @click="updateCart(item.id, item.qty + 1)"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td class="d-none d-md-table-cell">
                <!-- 數量按鈕 -->
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-primary rounded-end-0 d-flex align-items-center"
                      type="button"
                      :disabled="item.qty === 1"
                      @click="updateCart(item.id, item.qty - 1)"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>
                  <span class="form-control text-center">{{ item.qty }}</span>
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary d-flex align-items-center rounded-start-0"
                      type="button"
                      @click="updateCart(item.id, item.qty + 1)"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td class="text-end">${{ $filters.currency(item.product.price) }}</td>
              <td class="text-end">${{ $filters.currency(item.product.price * item.qty) }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- 優惠碼 & 總金額 -->
      <div class="row mb-6">
        <div class="col-md-6">
          <p class="h6 text-secondary mb-2">➤ 開店慶輸入優惠碼 happybaby 即可享九折優惠</p>
          <!-- 優惠券輸入 -->
          <div class="input-group mb-3 input-group">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <button class="btn btn-secondary text-white" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <!-- 總金額 -->
          <p class="h4 fw-bold text-end mb-3">總金額 : NT ${{ $filters.currency(cart.total) }}</p>
          <p class="h4 fw-bold text-end" v-if="cart.final_total !== cart.total">
            <span class="text-end text-danger"
              >折扣價 : NT ${{ $filters.currency(cart.final_total) }}</span
            >
          </p>
        </div>
      </div>
      <hr />
      <div class="text-end">
        <router-link class="btn btn-outline-secondary me-4" to="/products">繼續購物</router-link>
        <router-link class="btn btn-warning text-white" to="/checkoutform">前往結帳</router-link>
      </div>
    </div>
    <!-- 購物車無商品 -->
    <div class="container text-center py-7 py-md-9" v-else>
      <p>
        購物車目前尚無商品唷 ! <br />
        歡迎至賣場逛逛
      </p>
      <router-link class="btn btn-primary" to="/products">商品列表</router-link>
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  data() {
    return {
      isLoading: false, // 讀取效果
      status: {
        loadingItem: '',
      },
      cart: {},
      coupon_code: '',
    };
  },
  inject: ['emitter'],
  components: {
    Navbar,
    Footer,
  },
  methods: {
    // 取得購物車列表 API
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false;
          this.cart = response.data.data;
        }
      });
    },
    updateCart(id, qty) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .put(url, { data: cart })
        .then((response) => {
          if (response.data.success) {
            this.$swal({
              title: `<p class="h4"> ${response.data.message}</p>`,
              icon: 'success',
            });
            this.isLoading = false;
            this.getCart();
          } else {
            this.$swal({
              title: `<p class="h4"> ${response.data.message}</p>`,
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4"> ${err}</p>`,
            icon: 'error',
          });
        });
    },
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          if (response.data.success) {
            this.$swal({
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'success',
            });
            this.status.loadingItem = '';
            this.isLoading = false;
            this.getCart();
          } else {
            this.$swal({
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'error',
            });
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4"> ${err}</p>`,
            icon: 'error',
          });
        });
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          this.$swal({
            title: `<p class="h4">此商品${response.data.message}</p>`,
            icon: 'success',
          });
          this.isLoading = false;
          this.coupon_code = '';
          this.getCart();
        } else {
          this.$swal({
            title: `<p class="h4">${response.data.message}</p>`,
            icon: 'error',
          });
          this.isLoading = false;
          this.getCart();
        }
      });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
<style lang="scss">
@import '@/assets/stylesheets/all';

.cartQty {
  min-width: 30%;
}
@include media-breakpoint-up(lg) {
  .cartQty {
    min-width: 15%;
  }
}
</style>
