<template>
  <div class="collapse navbar-collapse" ref="bsCollapse" id="navbarNav">
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <router-link class="nav-link" to="/products">所有產品</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/faq">常見問題</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/contactus">聯絡我們</router-link>
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
};
</script>
