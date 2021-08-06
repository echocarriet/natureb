<template>
  <Navbar />
  <!-- Banner -->
  <header class="bg-cover bg-position-center indexBanner" :style="indexBg.banner">
    <div class="container d-flex align-items-center justify-content-center h-100">
      <div class="indexBanner-text text-yellow-700 text-center">
        <h2 class="h2">
          NATUREB x ORGANIC
        </h2>
        <h3 class="h5">我們販售的不只是商品，是一種舒適的安心感</h3>
      </div>
    </div>
  </header>
  <main class="py-9 py-lg-10">
    <!-- 特色商品 -->
    <section class="container mb-8 mb-md-10">
      <div class="row align-items-center mb-8 mb-lg-10">
        <div class="col-lg-6 mb-7 mb-lg-0">
          <img
            class="img-cover"
            src="@/assets/stylesheets/images/Homemain_01.jpg"
            alt="Featured Products"
          />
        </div>
        <div class="col-lg-6">
          <span class="divider-separator mb-3">
            <span class="divider-separator-text">FEATURED PRODUCTS</span>
          </span>
          <h3 class="fw-bold mb-3">舒適生活感衣著</h3>
          <p class="text-secondary mb-4">
            natureB
            相信質感與環保是可找到平衡的，本季新品帶來了不同以往的風格與色彩，希望能提供更多元的商品供大家做選擇，歡迎入內感受這些新變化。<br />
            Life at natureB.
          </p>
          <router-link class="btn btn-outline-primary btn-lg" to="/products">立即選購</router-link>
        </div>
      </div>
      <!-- 加入購物車連動navbar cart icon，AJAX 搭配 sweet alert -->
      <ul class="row">
        <template v-for="item in products" :key="item.id">
          <li class="col-sm-6 col-lg-3 mb-4 mb-lg-0" v-if="item.is_featuredProduct">
            <div class="card bg-transparent border-0 ">
              <router-link class="hover-goodsTransform" :to="`/product/${item.id}`">
                <img :src="item.imageUrl" class="card-img-top" />
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
        </template>
      </ul>
    </section>
    <!-- 產品系列 -->
    <section class="container-fluid px-0 mb-8 mb-md-10">
      <div class="row g-0">
        <div class="col-lg-6">
          <a class="d-block position-relative" href="#" @click.prevent="toCategoryProduct('服飾')">
            <div
              class="bg-cover masonryCard-img bg-mask-50 hover-bgMask-80"
              :style="categoryBg.clothingBg"
            ></div>
            <h5 class="masonryCard-text position-absolute text-hv-center text-white fw-bold h4">
              CLOTHING <br />服飾
            </h5>
          </a>
          <div class="row g-0">
            <div class="col-6">
              <a
                class="d-block position-relative"
                href="#"
                @click.prevent="toCategoryProduct('配件')"
              >
                <div
                  class="masonryCard-img bg-cover bg-position-center
                  bg-mask-50 hover-bgMask-80"
                  :style="categoryBg.accessoriesBg"
                ></div>
                <h5 class="masonryCard-text position-absolute text-hv-center text-white fw-bold h4">
                  ACCESSORIES<br />配件
                </h5>
              </a>
            </div>
            <div class="col-6">
              <a
                class="d-block position-relative"
                href="#"
                @click.prevent="toCategoryProduct('禮盒')"
              >
                <div
                  class="masonryCard-img bg-cover bg-position-center
                  bg-mask-50 hover-bgMask-80"
                  :style="categoryBg.giftBg"
                ></div>
                <h5
                  class="masonryCard-text position-absolute
                  text-hv-center text-white fw-bold h4"
                >
                  GIFT SETS<br />禮盒
                </h5>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="row g-0">
            <div class="col-6">
              <a
                class="d-block position-relative"
                href="#"
                @click.prevent="toCategoryProduct('毛毯')"
              >
                <div
                  class="masonryCard-imgStretch bg-cover bg-position-center
                  bg-mask-50 hover-bgMask-80"
                  :style="categoryBg.blanketBg"
                ></div>
                <h5 class="masonryCard-text position-absolute text-hv-center text-white fw-bold h4">
                  BLANKETS<br />毛毯
                </h5>
              </a>
            </div>
            <div class="col-6">
              <a
                class="d-block position-relative"
                href="#"
                @click.prevent="toCategoryProduct('手工玩具')"
              >
                <div
                  class="masonryCard-imgStretch bg-cover bg-position-tc bg-mask-50 hover-bgMask-80"
                  :style="categoryBg.toyBg"
                ></div>
                <h5
                  class="masonryCard-text position-absolute text-hv-center
                  text-white fw-bold h4 w-100"
                >
                  HANDMADE TOYS<br />
                  手工玩具
                </h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- season sale 使用 swiper-->
    <section class="container mb-6 mb-md-10">
      <span class="divider-separator mb-3">
        <span class="divider-separator-text">BEST SELLER</span>
      </span>
      <div class="row mb-9">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <h3 class="h3 fw-bold text-warning">SEASON ON SALE</h3>
          <p class="mb-2 mb-lg-3">回饋季 感謝有您</p>
          <p>
            感謝您的支持造就了我們的茁壯<br />
            我們準備了一系列的熱銷商品回饋給您，更多產品歡迎入內選購。
          </p>
        </div>
        <div class="col-lg-6">
          <router-link class="btn btn-outline-primary float-lg-end" to="/products"
            >觀看更多</router-link
          >
        </div>
      </div>
      <!-- Swiperjs 輪播 -->
      <div class="container">
        <swiper :autoplay="autoplay" :loop="true" :breakpoints="breakpoints" class="mySwiper my-5">
          <template v-for="item in products" :key="item">
            <swiper-slide
              class="d-flex justify-content-center align-items-center"
              v-if="item.is_seasonSale"
            >
              <div class="card bg-transparent border-0 postion-relative">
                <router-link class="hover-goodsTransform" :to="`/product/${item.id}`">
                  <img :src="item.imageUrl" class="card-img-top" />
                  <span
                    class="badgeSale bg-warning rounded-circle p-2 position-absolute"
                    style="top:5px; right:10px;"
                    >Sale</span
                  >
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
            </swiper-slide>
          </template>
        </swiper>
      </div>
    </section>
    <!-- 瑕疵品 BigSale-->
    <section class="container-fluid px-0 mb-8 mb-md-7">
      <div class="row g-0 flex-column-reverse flex-md-row">
        <div class="col-md-6 ">
          <div
            class="d-flex flex-column justify-content-center
            align-items-center h-100 position-md-relative"
          >
            <div
              class="bg-white shadow-xl p-9 p-md-8 p-lg-9 position-md-absolute bigSaleBanner-body"
            >
              <h3 class="h3 fw-bold text-warning mb-4">Sales Up To 50% OFF</h3>
              <p>
                natureB
                為了呈現給消費者最棒的產品，有些運送過程外包裝損傷或是手工製作的小小失誤，都會列為瑕疵商品，但因為有你們的寬心支持，這些小瑕疵商品都有機會找到好歸宿。
              </p>
              <p>歡迎入內尋找有緣的小瑕疵商品。</p>
              <a class="btn btn-primary" @click.prevent="toCategoryProduct('瑕疵品')">
                前往選購
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="@/assets/stylesheets/images/bigSale.jpg"
            alt="瑕疵品圖"
            class="bigSaleBanner img-cover img-position-tc w-100"
          />
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  data() {
    return {
      indexBg: {
        banner: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeBanner_01.jpg')})`,
        },
      },
      categoryBg: {
        clothingBg: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeCategoryClothing.jpg')})`,
        },
        accessoriesBg: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeCategoryAccessories.jpg')})`,
        },
        giftBg: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeCategoryGiftsets.jpg')})`,
        },
        blanketBg: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeCategoryBlankets.jpg')})`,
        },
        toyBg: {
          backgroundImage: `url(${require('@/assets/stylesheets/images/HomeCategoryHandmadetoys.jpg')})`,
        },
      },
      products: [],
      // 單一產品
      tempProduct: {
        imagesUrl: [],
      },
      categories: [], // 分類項目用
      isLoading: false,
      // swiperjs設定
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    };
  },
  components: {
    Navbar,
    Footer,
  },
  inject: ['emitter'],
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.products = response.data.products;
          this.getCategories();
          // this.isLoading = false;
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
    addToCart(id) {
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
            // 按加入購物車按鈕，查看可得 response的訊息顯示已加入購物車，並且 qty會增加。

            // 當有品項加入購物車，就會重新取得購物車一次 (navbar 的cartIcon)
            this.emitter.emit('update-cart');
            this.$swal({
              title: `<p class="h4"> ${response.data.data.product.title} 加入購物車</p>`,
              icon: 'success',
            });
          } else {
            this.$swal({
              title: `<p class="h4"> ${response.data.data.product.title}</p>`,
              icon: 'error',
            });
          }
        })
        .catch(() => {
          this.$swal({
            title: '<p class="h4"> 發生錯誤，請嘗試重新整理此頁面</p>',
            icon: 'error',
          });
        });
    },
    // 點選商品分類跳到對應的商品頁
    toCategoryProduct(Name) {
      this.$router.push({
        name: 'products',
        params: { categoryName: Name },
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
