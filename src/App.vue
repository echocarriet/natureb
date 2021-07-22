<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <ToastMessages />
  <router-view />
</template>
<script>
import emitter from './methods/eventBus';
import $httpMessageState from './methods/pushMessageState';
import ToastMessages from './components/ToastMessages.vue';

export default {
  provide() {
    return {
      emitter,
      $httpMessageState,
    };
  },
  components: {
    ToastMessages,
  },
};
</script>
<style lang="scss">
@import './assets/stylesheets/all';
// 推薦使用 CDN，因為 svg 不一定可以從 node_modules 導出
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css');
</style>
