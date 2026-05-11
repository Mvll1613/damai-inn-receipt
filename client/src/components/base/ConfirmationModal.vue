<template>
  <Dialog
    v-model:visible="props.visibleModal"
    modal
    :header="headerText"
    :closable="false"
    :draggable="false"
    :style="{ width: '320px' }"
  >
    <div class="confirmation-modal">
      <div
        v-html="descriptionText"
        class="confirmation-modal__desc"
      />
  
      <div class="confirmation-modal__btn-section">
        <Button
          class="action-btn"
          severity="secondary"
          outlined
          @click="close"
        >
          Tidak
        </Button>
        <Button
          class="action-btn"
          severity="info"
          @click="handleConfirmClick"
        >
          Ya
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import modalConstant from '@/constants/modal-data'

  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'

  const emit = defineEmits(['on-close'])
  const props = defineProps({
    visibleModal: Boolean,
    modalType: String
  })

  const router = useRouter()

  const modalType = computed(() => props?.modalType)
  const modalWording = computed(() => modalConstant?.confirmationModalWording[modalType.value])
  const headerText = computed(() => (modalWording.value?.header))
  const descriptionText = computed(() => modalWording.value?.desc)

  const close = () => {
    emit('on-close')
  }

  const handleConfirmClick = () => {
    if (modalType.value === 'cancel') {
      router.push({ name: 'LandingPage' })
      return
    }
    emit('on-confirm')
  }
</script>

<style lang="scss" scoped>
  .confirmation-modal {
    @include flex-layout(column, 28px);

    &__btn-section {
      @include flex-layout(row, 8px);
      justify-content: flex-end;

      .action-btn {
        width: 84px;
      }
    }
  }
</style>
