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
      <h1 class="logoText">
        <router-link class="navbar-brand fw-bold mb-0" style="font-size:27px;" to="/"
          >natureB</router-link
        >
      </h1>
      <!-- 斷點 lg 以下 cart Icon -->
      <router-link class="position-relative d-flex d-block d-lg-none ms-auto nav-link" to="/cart">
        <i class="bi bi-cart text-warning h3"></i>
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
    };
  },
  inject: ['emitter'],
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
    // 監聽，當收到事件就重新取得購物車數量一次，再到商品那邊發起事件。
    this.emitter.on('update-cart', () => {
      this.getCart();
    });
  },
  // 有使用 emitter.on 來接收資料時，記得 unmounted 對 emitter 事件使用 emitter.off() 來關閉 emitter 事件的監聽
  // 有使用 window 監聽 scroll 事件時，在 unmounted 生命週期時使用 removeEventListener 來移除監聽事件
  unmounted() {
    this.emitter.off('update-cart');
    window.removeEventListener('scroll', () => {
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
  },
};
</script>
<style lang="scss">
#navbar-top {
  transition: 0.6s background-color;
}
.logoText {
  font-family: 'Playfair Display';
}
</style>
