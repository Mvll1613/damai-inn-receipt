<template>
  <div
    class="header"
    :class="{
      'bordered': !isLandingPage
    }"
  >
    <Button
      v-if="!isLandingPage"
      icon="pi pi-angle-left"
      label="Kembali"
      severity="primary"
      variant="text"
      @click="goToLandingPage"
    />

    <img
      src="/damai-inn-logo-full.png"
      :class="{ 'img-small': !isLandingPage }"
      alt="damai-inn-logo"
    >
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import Button from 'primevue/button'

  const route = useRoute()
  const router = useRouter()

  const isLandingPage = computed(() => route.name === 'LandingPage')

  const goToLandingPage = () => {
    router.push({ name: 'LandingPage' })
  }
</script>

<style lang="scss" scoped>
  .header {
    @include flex-layout();
    align-items: center;
    justify-content: space-between;
    padding: 28px;

    img {
      width: 240px;
    }

    .img-small {
      width: 135px;
      height: 30px;
    }
  }

  .bordered {
    border-bottom: 3px solid #CBD5E1;
    box-shadow: 0px 2px 2px #0000000D;
  }
</style>
