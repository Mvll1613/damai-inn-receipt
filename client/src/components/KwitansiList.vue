<template>
  <div class="kwitansi-list">
    <DataTable :value="receiptList">
      <Column
        field="id"
        header="No. kwitansi"
        sortable
      >
        <template #body="{ data }">
          {{ formatId(data.id) }}
        </template>
      </Column>

      <Column
        field="guest_name"
        header="Nama tamu"
        sortable 
      />

      <Column
        field="created_date"
        header="Tanggal pembuatan"
        sortable
      >
        <template #body="{ data }">
          {{ formatDate(data.created_date) }}
        </template>
      </Column>

      <Column
        class="action-column"
        field="name"
        header="Aksi"
      >
        <template #body>
          <Button
            icon="pi pi-trash"
            variant="text"
            severity="danger"
          />
          <Button
            icon="pi pi-pencil"
            variant="text"
            severity="info"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useReceiptStore } from '@/stores/receiptStore'

  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'

  const { receiptList } = storeToRefs(useReceiptStore())
  
  const formatId = (id) => {
    return `DI-${id}`
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }
</script>

<style lang="scss" scoped>
  :deep(.action-column) {
    text-align: center;
  }
  :deep(.action-column > .p-datatable-column-header-content) {
    justify-content: center;
  }
</style>

