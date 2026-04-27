<template>
  <div class="kwitansi-management-layout">
    <Header />

    <div class="kwitansi-management-layout__content">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
  .kwitansi-management-layout {
    @include flex-layout(column);

    &__content {
      min-height: 100vh;
      padding: 48px;
    }
  }
</style>

<script setup>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
</script>
