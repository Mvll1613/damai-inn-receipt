<template>
  <div class="landing-page">
    <Header />

    <div class="landing-page__content">
      <span class="title">Halo, silakan pilih menu berikut:</span>
      <Button
        variant="outlined"
        :raised="true"
        @click="goToAddEditKwitansiPage"
      >
        <span class="button-label">Buat kwitansi</span>
      </Button>
      <Button
        severity="secondary"
        disabled
        :raised="true"
        :pt="{
          root: {
            style: 'cursor: not-allowed'
          }
        }"
      >
        <span class="button-label">Lihat kwitansi</span>
      </Button>
    </div>

    <Footer />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  import Button from 'primevue/button'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  const router = useRouter()

  const goToAddEditKwitansiPage = () => {
    router.push({ name: 'AddEditKwitansiPage' })
  }
</script>

<style lang="scss" scoped>
  .landing-page {
    @include flex-layout(column);
    min-height: 100vh;
    justify-content: space-between;

    &__content {
      @include flex-layout(column, 48px);
      width: 100%;
      align-items: center;
      margin-bottom: 28px;

      & .title {
        @include font('heading-1')
      }

      & .button-label {
        @include font('heading-2')
      }
    }

    :deep(.p-button) {
      width: 570px;
      height: 80px;
    };
  }
</style>
