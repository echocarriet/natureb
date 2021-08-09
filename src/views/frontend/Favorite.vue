<template>
  <Navbar />
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <header class="position-relative">
    <img
      class="bg-mask-60 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/whishlist.jpg"
      alt="收藏banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      my whishlist
    </h2>
  </header>
  <div class="window-vh100">
    <div class="container py-7 py-md-9" v-if="favoriteProduct.length > 0">
      <h3 class="h3 fw-bold mb-4 mb-md-6">收藏清單</h3>
      <table class="table table-striped mb-4 mb-md-6">
        <thead>
          <tr class="text-center bg-brown-400 d-none d-md-table-row">
            <th class="border-bottom-0" style="width:15%;"></th>
            <th class="border-bottom-0" style="width:25%;">名稱</th>
            <th class="text-start border-bottom-0" style="width:20%;">金額</th>
            <th class="border-bottom-0" style="width:20%;">加入購物車</th>
            <th class="border-bottom-0" style="width:15%;">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in favoriteProduct" :key="item" class="align-middle text-center">
            <th class="d-none d-sm-table-cell">
              <img :src="item.product.imageUrl" :alt="item.product.title" style="width:100px;" />
            </th>
            <td>
              <p class="mb-2 mb-md-0">{{ item.product.title }}</p>
            </td>
            <td class="text-start">
              <p
                class="me-3 fw-bold mb-0 mb-sm-2"
                style="font-size:17px"
                v-if="item.product.price !== item.product.origin_price"
              >
                ${{ $filters.currency(item.product.price) }}
              </p>
              <span
                :class="[
                  item.product.price !== item.product.origin_price
                    ? ['text-brown-400', 'text-decoration-line-through']
                    : ['text-primary', 'h4', 'fw-bold'],
                ]"
                >${{ $filters.currency(item.product.origin_price) }}</span
              >
            </td>
            <td>
              <button
                type="button"
                class="btn btn-warning d-none d-md-block mx-auto"
                @click.prevent="addToCart(item.product.id)"
              >
                加入購物車
              </button>
              <button
                type="button"
                class="btn text-warning d-block d-md-none"
                @click.prevent="addToCart(item.product.id)"
              >
                <!-- <i class="bi bi-cart-plus h4"></i> -->
                <i class="bi bi-cart-plus-fill h4"></i>
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn hover-text-brown-400"
                :disabled="status.loadingItem === item.id"
                @click.prevent="removeFavoriteItem(item)"
              >
                <i class="bi bi-trash h4"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        <router-link class="btn btn-primary text-white" to="/products">前往商店</router-link>
      </div>
    </div>
    <!-- 購物車無商品 -->
    <div class="container text-center py-7 py-md-9" v-else>
      <p>
        收藏清單目前尚無商品唷 ! <br />
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
import localStorage from '@/mixins/localStorage';

export default {
  data() {
    return {
      isLoading: false, // 讀取效果
      status: {
        loadingItem: '',
      },
      myFavorite: [], // 收藏清單(我的最愛)
      favoriteProduct: [],
    };
  },
  inject: ['emitter'],
  mixins: [localStorage],
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getFavorite() {
      this.myFavorite = this.getLocalStorage() || [];
      this.favoriteProduct = [];
      this.isLoading = true;
      if (this.myFavorite.length > 0) {
        this.myFavorite.forEach((item) => {
          const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${item}`;
          this.$http
            .get(url)
            .then((response) => {
              if (response.data.success) {
                this.favoriteProduct.push(response.data);
                this.isLoading = false;
              } else {
                this.isLoading = false;
              }
            })
            .catch(() => {
              this.$swal({
                title: '<p class="h4"> 發生錯誤，請重新整理此頁面</p>',
                icon: 'error',
              });
            });
        });
      } else {
        this.isLoading = false;
      }
    },
    addToCart(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        // product_id: this.tempProduct.id,
        product_id: id,
        qty: 1,
      };
      this.$http
        .post(api, { data: cart })
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            // 按加入購物車按鈕，查看可得 response的訊息顯示已加入購物車，並且 qty會增加。
            // 當有品項加入購物車，就會重新取得購物車一次 (navbar 的cartIcon)
            this.emitter.emit('update-cart');
            this.$swal({
              title: `<p class="h4"> ${response.data.data.product.title} 加入購物車</p>`,
              icon: 'success',
            });
          } else {
            this.$swal({
              title: '<p class="h4">發生錯誤，請重新把商品加入購物車</p>',
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4">${err} 發生錯誤，請嘗試重新整理此頁面</p>`,
            icon: 'error',
          });
        });
    },
    removeFavoriteItem(item) {
      this.myFavorite.splice(this.myFavorite.indexOf(item.id), 1);
      this.saveLocalStorage(this.myFavorite);
      this.emitter.emit('update-favorite');
      this.isLoading = true;
      this.$swal({
        title: '<p class="h4">商品已從收藏中移除</p>',
        icon: 'success',
      });
      this.getFavorite();
    },
  },
  mounted() {
    this.getFavorite();
  },
};
</script>
