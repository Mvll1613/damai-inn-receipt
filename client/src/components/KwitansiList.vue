<template>
  <div class="kwitansi-list">
    <DataTable
      v-model:filters="filters"
      filterDisplay="row"
      :value="receiptList"
      @update:filters="onFilterChange"
    >
      <template #empty>
        Tidak ada data
      </template>
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
        :showFilterMenu="false" 
      >
        <template #body="{ data }">
          {{ data.guest_name }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <IconField>
            <InputText
              v-model="filterModel.value"
              placeholder="Masukkan nama tamu"
              @keypress.enter="filterCallback()"
            />
            <InputIcon
              v-if="filterModel.value"
              class="cursor-pointer"
              @click="handleClearText(filterModel, filterCallback)"
            >
              <i class="pi pi-times" />
            </InputIcon>
          </IconField>
        </template>
      </Column>

      <Column
        field="created_date"
        header="Tanggal pembuatan"
        sortable
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ formatDate(data.created_date) }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <DatePicker
            v-model="filterModel.value"
            showIcon
            showClear
            @update:modelValue="filterCallback()"
          />
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
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useReceiptStore } from '@/stores/receiptStore'
  import { FilterMatchMode } from '@primevue/core/api'
  import { toDateString } from '@/utils/time-formats'


  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Button from 'primevue/button'
  import DatePicker from 'primevue/datepicker'
  import InputText from 'primevue/inputtext'
  import IconField from 'primevue/iconfield'
  import InputIcon from 'primevue/inputicon'

  const { receiptList } = storeToRefs(useReceiptStore())

  const emit = defineEmits(['on-filter-change'])

  const filters = ref({
    created_date: {
      value: null,
      matchMode: FilterMatchMode.EQUALS
    },
    guest_name: {
      value: null,
      matchMode: FilterMatchMode.EQUALS
    }
  })

  const buildFilterPayload = computed(() => {
    const rawFilters = {}

    if (filters.value?.created_date?.value) {
      rawFilters.createdDate = toDateString(filters.value.created_date.value)
    }
    if (filters.value?.guest_name?.value) {
      rawFilters.guestName = filters.value.guest_name.value
    }

    return rawFilters
  })
  
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

  const handleClearText = (filterModel, filterCallback) => {
    filterModel.value = null
    filterCallback()
  }

  const onFilterChange = () => {
    emit('on-filter-change', buildFilterPayload.value)
  }
</script>

<style lang="scss" scoped>
  :deep(.action-column) {
    text-align: center;
  }
  :deep(.action-column > .p-datatable-column-header-content) {
    justify-content: center;
  }
  :deep(.p-iconfield) {
    width: fit-content;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>

