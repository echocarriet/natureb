<template>
  <div class="collapse navbar-collapse" ref="bsCollapse">
    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <router-link class="nav-link" to="/admin">產品</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/orders">訂單</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link" @click="signOut">登出</a>
      </li>
    </ul>
  </div>
</template>
<script>
import CollapseMixin from '@/mixins/CollapseMixin';

export default {
  data() {
    return {
      collapse: '',
    };
  },
  mixins: [CollapseMixin],
  inject: ['$httpMessageState'],
  methods: {
    signOut() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.$httpMessageState(response, '登出');
          // 清除 cookie
          document.cookie = 'carrieHexToken=; expires=; path=/';
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
