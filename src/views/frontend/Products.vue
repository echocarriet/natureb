<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <Navbar />
  <header class="position-relative mb-7 mb-md-9">
    <img
      class="bg-mask-60 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/allProductsBanner.jpg"
      alt="所有商品banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      our products
    </h2>
  </header>
  <div class="window-vh100">
    <nav class="container" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <span v-if="selectCategory == ''">全部產品</span>
          <span v-else>{{ selectCategory }}</span>
        </li>
      </ol>
    </nav>
    <section class="container">
      <div class="row">
        <div class="col-md-3 col-lg-2 mb-4 mb-lg-0">
          <!-- 斷點md下 -->
          <div class="dropdown d-block d-md-none w-100">
            <button
              href="#"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              class="btn btn-secondary dropdown-toggle w-100"
            >
              產品系列
            </button>
            <ul class="dropdown-menu w-100">
              <li
                @click.prevent="selectCategory = ''"
                :class="{ active: selectCategory === '' }"
                ref="bsDropdown"
              >
                <a class="dropdown-item" href="#">所有產品</a>
              </li>
              <li
                v-for="item in categories"
                :key="item"
                :class="{ active: item === selectCategory }"
                @click.prevent="selectCategory = item"
                aria-current="true"
              >
                <a class="dropdown-item" href="#" @click="hideDropdown()">{{ item }}</a>
              </li>
            </ul>
          </div>
          <!-- 斷點md 上 -->
          <div class="sticky-md-top d-none d-md-block" style="top:80px;">
            <div class="list-group">
              <a
                href="#"
                class="list-group-item list-group-item-action"
                @click.prevent="selectCategory = ''"
                :class="{ active: selectCategory === '' }"
                >全部產品</a
              >
              <a
                href="#"
                v-for="item in categories"
                :key="item"
                class="list-group-item list-group-item-action"
                :class="{ active: item === selectCategory }"
                @click.prevent="selectCategory = item"
                aria-current="true"
              >
                {{ item }}
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-lg-10">
          <ul class="row">
            <li class="col-sm-6 col-lg-4 mb-4" v-for="item in filterProducts" :key="item.id">
              <div class="card border-brown-400 hover-goodsTransform">
                <router-link :to="`/product/${item.id}`">
                  <img :src="`${item.imagesUrl[0]}`" class="card-img-top" />
                  <div class="card-body">
                    <span class="h6">{{ item.category }}</span>
                    <h4 class="card-title">{{ item.title }}</h4>
                    <div class="d-flex align-items-center fw-bold">
                      <h5
                        class="mb-0 me-3 text-danger fw-bold"
                        v-if="item.price !== item.origin_price"
                      >
                        NT ${{ $filters.currency(item.price) }}
                      </h5>
                      <span
                        :class="[
                          item.price !== item.origin_price
                            ? ['text-brown-400', 'text-decoration-line-through']
                            : 'text-primary',
                        ]"
                        >NT ${{ $filters.currency(item.origin_price) }}</span
                      >
                    </div>
                  </div>
                </router-link>
                <div class="card-footer border-0 bg-transparent">
                  <button
                    type="button"
                    class="btn btn-outline-warning w-100 hover-text-white"
                    @click.prevent="addToCart(item.id)"
                  >
                    <i class="bi bi-cart-plus-fill h4"></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
import Dropdown from 'bootstrap/js/dist/dropdown';

export default {
  data() {
    return {
      dropdown: '',
      isLoading: false, // 讀取效果
      products: [],
      categories: [], // 分類項目用
      selectCategory: '', // 點選分類的商品
    };
  },
  inject: ['emitter'],
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false;
          console.log(response);
          // 執行程式時要注意順序，先取得所有商品資料 → 取得商品的分類們
          this.products = response.data.products;
          this.getCategories();
          const { categoryName } = this.$route.params;
          if (categoryName) {
            this.selectCategory = categoryName;
          }
        } else {
          console.log(response.data.message);
        }
      });
    },
    getCategories() {
      const categories = new Set();
      this.products.forEach((item) => {
        // 把所有商品的分類加到上方建立的 categories 變數上
        categories.add(item.category);
      });
      // 目前原型是 set ( console.log 可看到是物件形式 ) 要再轉回 Proxy ( 陣列形式 )，可使用 ... ( 類陣列轉純陣列 )。
      // console.log(categories);
      this.categories = [...categories];
    },
    gotopage(item) {
      // 進入單一頁面可使用 this.$router 查詢方法，可使用 push
      // console.log(this.$router);
      this.$router.push(`/product/${item.id}`);
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
            console.log(response);
            // 當有品項加入購物車，就會重新取得購物車一次 (navbar 的cartIcon)
            this.emitter.emit('update-cart');
            this.$swal({
              title: `<p class="h4"> ${response.data.data.product.title} 加入購物車</p>`,
              icon: 'success',
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          this.$swal({ title: '<p class="h4">發生錯誤，請嘗試重新整理此頁面</p>', icon: 'error' });
          console.log(err);
        });
    },
    toggleDropdown() {
      this.dropdown.toggle();
    },
    hideDropdown() {
      this.dropdown.hide();
    },
  },
  computed: {
    filterProducts() {
      // retuen :當選擇的選項和產品相同時會回傳回來。
      return this.products.filter((item) => item.category.match(this.selectCategory));
    },
  },
  mounted() {
    this.getProducts();
    this.dropdown = new Dropdown(this.$refs.bsDropdown, {
      toggle: false,
    });
  },
};
</script>
