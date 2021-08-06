<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <Navbar />
  <header class="position-relative">
    <img
      class="bg-mask-60 img-cover pageBanner w-100"
      src="@/assets/stylesheets/images/ProductBanner.jpg"
      alt="商品banner"
    />
    <h2 class="position-absolute text-hv-center h2 fw-bold text-white-50 pageBanner-text">
      product
    </h2>
  </header>
  <div class="container py-7 py-md-9">
    <nav aria-label="breadcrumb mb-7">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/products">所有產品</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <span>{{ product.title }}</span>
        </li>
      </ol>
    </nav>
    <div class="row mb-9 mb-lg-10">
      <!-- 商品圖 -->
      <div class="col-md-5 mb-4 mb-md-0">
        <div class="row flex-column">
          <div class="col-6 w-100 mb-4">
            <img :src="img" alt="product.title" class="w-100 img-cover bg-white" />
          </div>
          <div class="col-6 d-flex justify-content-center w-100">
            <img
              class=" img-cover bg-white cursor-pointer shadow-sm mx-1"
              @click="img = product.imageUrl"
              :src="product.imageUrl"
              alt="product.title"
              style="width:30%;"
            />
            <img
              class=" img-cover cursor-pointer shadow-sm mx-1"
              v-for="item in product.imagesUrl"
              :key="item"
              @click="img = item"
              :src="item"
              alt="product.title"
              style="width:30%;"
            />
            <!-- <div class="row">
              <div class="col-4">
                <img
                  class="w-100 img-cover bg-white cursor-pointer shadow-sm"
                  @click="img = product.imageUrl"
                  :src="product.imageUrl"
                  alt="product.title"
                />
              </div>
              <div class="col-4">
                <img
                  class="w-100 img-cover cursor-pointer shadow-sm"
                  v-for="item in product.imagesUrl"
                  :key="item"
                  @click="img = item"
                  :src="item"
                  alt="product.title"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <!-- 商品資訊 -->
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h3 class="h3 fw-bold">{{ product.title }}</h3>
        <p class="h6 text-secondary mb-2">產品類別 : {{ product.category }}</p>
        <p class="text-secondary">尺寸 : {{ product.size }}</p>
        <div class="d-flex align-items-center fw-bold">
          <p class="h4 mb-0 me-3 text-danger fw-bold" v-if="product.price !== product.origin_price">
            NT ${{ $filters.currency(product.price) }}
          </p>
          <span
            :class="[
              product.price !== product.origin_price
                ? ['text-brown-400', 'text-decoration-line-through']
                : ['text-primary', 'h4', 'fw-bold'],
            ]"
            >NT ${{ $filters.currency(product.origin_price) }}</span
          >
        </div>
        <hr />
        <ol class="decimal-ListStyle text-secondary h6 lh-base">
          <li>全館單筆購物滿 NT $ 2,000 免運費。</li>
          <li>今日下單，5 天出貨不含下單當天、例假日、離島。</li>
          <li>商品退換請於收貨後，7日內向客服人員反應。</li>
          <li>
            商品享有商品到貨日起 10
            天猶豫期，猶豫期內，可無條件退費。猶豫期並非試用期，所以，您所退回的商品必須是包裝完整、保存良好的狀態。
          </li>
        </ol>
        <!-- 數量按鈕 & 加入購物車 -->
        <div class="d-flex align-items-center">
          <div class="input-group w-50 me-6">
            <div class="input-group-prepend">
              <button
                class="btn btn-primary rounded-end-0 d-flex align-items-center"
                type="button"
                :disabled="qty === 1"
                @click="qty -= 1"
              >
                <i class="bi bi-dash"></i>
              </button>
            </div>
            <span class="form-control text-center">{{ qty }}</span>
            <div class="input-group-append">
              <button
                class="btn btn-primary d-flex align-items-center rounded-start-0"
                type="button"
                @click="qty += 1"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary w-50"
            @click.prevent="addToCart(product.id, qty)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>

    <!-- Nav 商品資訊 -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          產品資訊
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          洗滌方式
        </button>
      </li>
    </ul>
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <ul>
          <li>
            <h3 class="h4 fw-bold">材質</h3>
            <p>{{ product.description }}</p>
          </li>
          <li>
            <h3 class="h4 fw-bold">資訊</h3>
            <p>{{ product.content }}</p>
          </li>
        </ul>
      </div>
      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <ul v-if="product.category !== '手工玩具'">
          <li>+ 深淺色衣物請分開洗滌；</li>
          <li>+ 請勿長時間浸泡、濕放，以防染色。</li>
          <li>+ 衣物洗滌請使用中性洗劑清洗，水溫請低於30℃。</li>
          <li>+ 請將衣物翻面再放入大小適中之細網洗衣袋細中弱速水洗，以保持商品型態。</li>
          <li>+ 如需整燙，請以低溫墊布熨燙，溫度不可超過110℃。</li>
        </ul>
        <ul v-else>
          <li>+ 淺污漬可以清水沖洗後，用毛巾擦乾於陰涼處晾乾即可。</li>
          <li>+ 深污漬可以中性清潔劑搭配軟毛刷清洗後，用毛巾擦乾於陰涼處晾乾即可。</li>
        </ul>
      </div>
    </div>
    <!-- 相似產品 -->
  </div>
  <Footer />
</template>
<script>
import 'bootstrap/js/dist/tab';
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  data() {
    return {
      isLoading: false, // 讀取效果
      product: {},
      cart: {},
      img: '', // 商品的其他附圖
      tab: '',
      qty: 1,
    };
  },
  inject: ['emitter'],
  components: {
    Navbar,
    Footer,
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      // console.log 內的 this.$route → 路由屬性、this.$router → 路由方法
      // console.log(this.$route); 得知 this.$route.params.id 可取出單一產品的 id
      // 下方寫法等同 const id = this.$roude.params.id ;
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(api)
        .then((response) => {
          if (response.data.success) {
            this.isLoading = false;
            this.product = response.data.product;
            this.img = this.product.imageUrl;
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4">${err} 發生錯誤，請重新整理頁面</p>`,
            icon: 'error',
          });
        });
    },
    addToCart(id, qty) {
      this.isLoading = true;
      this.qty = qty;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
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
              title: `<p class="h4">${response.data.message}</p>`,
              icon: 'error',
            });
          }
        })
        .catch((err) => {
          this.$swal({
            title: `<p class="h4">${err} 發生錯誤，請重新整理頁面</p>`,
            icon: 'error',
          });
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
