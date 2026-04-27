<template>
  <div class="add-edit-kwitansi-page">
    <div class="add-edit-kwitansi-page__header">
      <span class="page-title">Buat Kwitansi</span>
      <div class="button-section">
        <Button
          v-for="button in buttonList"
          class="button-section__button"
          raised
          :class="{'disabled': isButtonDisabled(button)}"
          :key="button.id"
          :label="button.label"
          :severity="button.severity"
          :variant="button.variant"
          :disabled="isButtonDisabled(button)"
          @click="handleBtnClick(button)"
        />
      </div>
    </div>

    <AddEditKwitansiForm
      :form-data="formData"
    />
  </div>

  <ConfirmationModal
    :visible-modal="visibleModal"
    :modal-type="modalType"
    @on-close="toggleConfirmationModal"
    @on-confirm="handleConfirm"
  />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useReceiptStore } from '@/stores/receiptStore'
  import constants from '@/constants'

  import Button from 'primevue/button'
  import AddEditKwitansiForm from '@/components/AddEditKwitansiForm.vue'
  import ConfirmationModal from '@/components/base/ConfirmationModal.vue'

  const buttonList = constants.addEditButtonList

  const { addReceipt } = useReceiptStore()

  const visibleModal = ref(false)
  const modalType = ref('')
  const formData = reactive({
    createdDate: '',
    guestName: '',
    receiptData: [
      {
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        pricePerNight: '',
        stayDuration: '',
        extraBeds: ''
      }
    ]
  })

  const isButtonDisabled = button => button.id !== 'cancel' && isFormDataIncomplete()

  const isFormDataIncomplete = () => {
    let isReceiptDataEmpty = formData.receiptData.some(receipt => isReceiptIncomplete(receipt))
    return !formData.createdDate || !formData.guestName || isReceiptDataEmpty
  }

  const isReceiptIncomplete = receipt => Object.values(receipt).some(v => v === '' || v == null)

  const handleBtnClick = button => {
    let btnId = button.id

    if (btnId === 'save' || btnId === 'cancel') {
      modalType.value = btnId
      toggleConfirmationModal()
    }
  }

  const toggleConfirmationModal = () => {
    visibleModal.value = !visibleModal.value
  }

  const handleConfirm = async () => {
    try {
      await addReceipt(formData)
    } catch (error) {
      console.error(error)
    } finally {
      toggleConfirmationModal()
    }
  }
</script>

<style lang="scss" scoped>
  .add-edit-kwitansi-page {
    @include flex-layout(column, 32px);

    &__header {
      @include flex-layout();
      justify-content: space-between;
      align-items: center;

      .page-title {
        @include font('heading-1');
      }

      .button-section {
        @include flex-layout(row, 24px);
  
        &__button {
          width: 144px;
          height: 48px;
        }

        .disabled {
          cursor: not-allowed
        }
      }
    }
  }
</style>
