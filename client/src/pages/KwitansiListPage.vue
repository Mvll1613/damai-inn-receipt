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

    <KwitansiList @on-filter-change="fetchReceiptList" />

    <Paginator
      v-if="receiptPagination?.totalRecords > 10"
      :page="pagination.page"
      :rows="pagination.limit"
      :total-records="receiptPagination?.totalRecords"
      :rows-per-page-options="[10, 50, 100]"
      @page="onPageChange"
    />
  </div>
</template>

<script setup>
  import { onMounted, reactive, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useReceiptStore } from '@/stores/receiptStore'

  import Button from 'primevue/button'
  import Paginator from 'primevue/paginator'
  import KwitansiList from '@/components/KwitansiList.vue'

  const router = useRouter()
  const { getReceiptList } = useReceiptStore()
  const { receiptPagination } = storeToRefs(useReceiptStore())

  const pagination = reactive({
    page: 1,
    limit: 10
  })
  
  const handleCreateReceipt = () => {
    router.push('/kwitansi/add')
  }

  const onPageChange = (event) => {
    pagination.page = event.page + 1
  }

  const fetchReceiptList = (filters) => {
    let payload = {
      ...pagination,
      ...filters
    }

    getReceiptList(payload)
  }

  watch(() => pagination.page, () => {
    fetchReceiptList()
  })

  onMounted(() => {
    fetchReceiptList()
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


