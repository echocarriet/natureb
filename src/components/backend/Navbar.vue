<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
    <div class="container">
      <h1 class="navbar-brand fw-bold mb-0" href="#">natureB 後台區</h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="$refs.NavbarModal.toggleCollapse()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- NavbarModal       -->
      <NavbarModal ref="NavbarModal" />
    </div>
  </nav>
</template>
<script>
import NavbarModal from '@/components/backend/NavbarModal.vue';

export default {
  inject: ['emitter'],
  components: {
    NavbarModal,
  },
};
</script>
