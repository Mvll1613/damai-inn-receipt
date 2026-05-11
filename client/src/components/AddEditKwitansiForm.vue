<template>
  <div class="add-edit-form">
    <div class="add-edit-form__input-field">
      <div class="add-edit-form__header">
        <!-- <div class="kwitansi-number">
          <span class="label">No. kwitansi:</span>
          <span class="value">D-000001</span>
        </div> -->
  
        <div class="recipient-detail">
          <div class="recipient-detail__container">
            <span class="label required">Tanggal pembuatan</span>
            <DatePicker
              v-model="formData.createdDate"
              showIcon
              iconDisplay="input"
              dateFormat="dd MM yy"
              placeholder="Pilih tanggal"
            />
          </div>
          <div class="recipient-detail__container">
            <span class="label required">Nama tamu</span>
            <InputText
              v-model="formData.guestName"
              placeholder="Nama lengkap"
            />
          </div>
        </div>
      </div>
  
      <KwitansiInputTable
        :receipt-data="formData.receiptData"
      />
    </div>

    <KwitansiPriceSummary
      :receipt-data="formData.receiptData"
    />
  </div>
</template>

<script setup>
  import { toRef } from 'vue';

  import DatePicker from 'primevue/datepicker'
  import InputText from 'primevue/inputtext'

  import KwitansiInputTable from './KwitansiInputTable.vue'
  import KwitansiPriceSummary from './KwitansiPriceSummary.vue'

  const props = defineProps({
    formData: Object
  })

  const formData = toRef(props, 'formData')
</script>

<style lang="scss" scoped>
  .add-edit-form {
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    
    &__input-field {
      padding: 24px 24px 0;
    }

    &__header {
      @include flex-layout(column, 32px);
      margin-bottom: 32px;

      .kwitansi-number {
        @include flex-layout(row, 8px);
        align-items: center;
      }

      .recipient-detail {
        @include flex-layout(row, 40px);

        &__container {
          @include flex-layout(column, 8px);
          min-width: 420px;
        }
      }

      .label {
        @include font('heading-4');
      }
      
      .label.required::after {
        content: '*';
        color: red;
      }
    }
  }
</style>
