<template>
  <div class="kwitansi-list-page">
    <div class="kwitansi-list-page__header">
      <span class="page-title">Daftar Kwitansi</span>
      <Button
        class="kwitansi-list-page__header__button"
        label="Buat Kwitansi"
        severity="info"
        icon="pi pi-plus"
        @click="handleCreateReceipt"
      />
    </div>
    <KwitansiList />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useReceiptStore } from '@/stores/receiptStore'

  import Button from 'primevue/button'
  import KwitansiList from '@/components/KwitansiList.vue'

  const router = useRouter()
  const { getReceiptList } = useReceiptStore()
  
  const handleCreateReceipt = () => {
    router.push('/kwitansi/add')
  }

  onMounted(() => {
    getReceiptList()
  })
</script>

<style lang="scss" scoped>
  .kwitansi-list-page {
    @include flex-layout(column);
    min-height: 100vh;

    &__header {
      @include flex-layout();
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;

      & .page-title {
        @include font('heading-1')
      }

      &__button {
        height: 48px;
      }
    }
  }
</style>

