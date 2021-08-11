<template>
  <nav
    class="navbar navbar-expand-lg fixed-top"
    :class="[
      isActive
        ? [classList.navbarTop, classList.navbarInner, classList.navbarShadow]
        : 'navbar-dark',
    ]"
    id="navbar-top"
  >
    <div class="container">
      <h1 class="logoText mb-0 d-flex align-items-center">
        <router-link class="navbar-brand fw-bold mb-0" style="font-size:27px;" to="/"
          >natureB</router-link
        >
      </h1>
      <!--斷點 lg 以下 Favrite icon -->
      <router-link
        class="position-relative d-flex d-block d-lg-none ms-auto nav-link"
        to="/favorite"
      >
        <i class="bi bi-heart text-warning h3 mb-0"></i>
        <span
          class="position-absolute d-flex justify-content-center align-items-center
      rounded-circle text-white bg-primary h7"
          style="top:11px; right:12px; width:20px;"
          >{{ myFavorite.length }}</span
        >
      </router-link>
      <!-- 斷點 lg 以下 cart Icon -->
      <router-link class="position-relative d-flex d-block d-lg-none nav-link" to="/cart">
        <i class="bi bi-cart text-warning h3 mb-0"></i>
        <span
          class="position-absolute d-flex justify-content-center align-items-center
      rounded-circle text-white bg-primary h7"
          style="top:11px; right:12px; width:20px;"
          >{{ cart.length }}</span
        >
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="mobileBtn"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- NavbarModal       -->
      <NavbarModal ref="NavbarModal" />
      <!--斷點 lg 以上 Favrite icon -->
      <router-link class="position-relative d-flex d-none d-lg-block nav-link" to="/favorite">
        <i class="bi bi-heart text-warning h3"></i>
        <span
          class="position-absolute d-flex justify-content-center align-items-center
      rounded-circle text-white bg-primary h7"
          style="top:11px; right:12px; width:20px;"
          >{{ myFavorite.length }}</span
        >
      </router-link>
      <!--斷點 lg 以上 cart icon -->
      <router-link class="position-relative d-flex d-none d-lg-block nav-link" to="/cart">
        <i class="bi bi-cart text-warning h3"></i>
        <span
          class="position-absolute d-flex justify-content-center align-items-center
      rounded-circle text-white bg-primary h7"
          style="top:11px; right:12px; width:20px;"
          >{{ cart.length }}</span
        >
      </router-link>
    </div>
  </nav>
</template>
<script>
import NavbarModal from '@/components/frontend/NavbarModal.vue';
import localStorage from '@/mixins/localStorage';

export default {
  data() {
    return {
      // 用來判斷超過某個scroll就執行設定的class
      isActive: false,
      classList: {
        navbarTop: '',
        navbarInner: '',
        navbarShadow: '',
      },
      innerWidth: '',
      cart: {}, // 加入購物車的商品數量
      myFavorite: this.getLocalStorage() || [], // 收藏清單(我的最愛)
    };
  },
  inject: ['emitter'],
  mixins: [localStorage],
  components: {
    NavbarModal,
  },
  methods: {
    // 取得購物車列表 API
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.cart = response.data.data.carts;
        } else {
          this.$swal({
            title: `<p class="h4"> ${response.message}</p>`,
            icon: 'error',
          });
        }
      });
    },
    mobileBtn() {
      const NavbarComponent = this.$refs.NavbarModal;
      NavbarComponent.toggleCollapse();
      if (NavbarComponent.openCollapse) {
        this.isActive = true;
        this.classList = {
          navbarTop: 'bg-transparent-white90', // 'bg-white',
          navbarInner: 'navbar-light',
          navbarShadow: 'shadow-sm',
        };
      }
    },
    getFavorite() {
      this.myFavorite = this.getLocalStorage() || [];
      this.favoriteProduct = [];
      if (this.myFavorite.length > 0) {
        this.myFavorite.forEach((item) => {
          const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${item}`;
          this.$http
            .get(url)
            .then((response) => {
              if (response.data.success) {
                this.favoriteProduct.push(response.data.product);
              }
            })
            .catch(() => {
              this.$swal({
                title: '<p class="h4"> 發生錯誤，請重新整理此頁面</p>',
                icon: 'error',
              });
            });
        });
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      // 目前滾動位置
      const windowY = window.scrollY;
      if (windowY > 80) {
        this.isActive = true;
        this.classList = {
          navbarTop: 'bg-transparent-white90', // 'bg-white',
          navbarInner: 'navbar-light',
          navbarShadow: 'shadow-sm',
        };
      } else {
        // 往回滾動時回到原來狀態
        this.isActive = false;
        this.classList = {
          navbarTop: '',
          navbarInner: 'navbar-dark',
        };
      }
    });
    this.getCart();
    this.getFavorite();
    // 監聽，當收到事件就重新取得購物車數量一次，再到商品那邊發起事件。
    this.emitter.on('update-cart', () => {
      this.getCart();
    });
    this.emitter.on('update-favorite', () => {
      this.myFavorite = this.getLocalStorage();
      this.getFavorite();
    });
  },
  unmounted() {
    this.emitter.off('update-cart');
    this.emitter.off('update-favorite');
    window.removeEventListener('scroll', () => {
      // 目前滾動位置
      const windowY = window.scrollY;
      if (windowY > 80) {
        this.isActive = true;
        this.classList = {
          navbarTop: 'bg-transparent-white90',
          navbarInner: 'navbar-light',
          navbarShadow: 'shadow-sm',
        };
      } else {
        // 往回滾動時回到原來狀態
        this.isActive = false;
        this.classList = {
          navbarTop: '',
          navbarInner: 'navbar-dark',
        };
      }
    });
  },
};
</script>
