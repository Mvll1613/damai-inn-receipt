<template>
  <div class="input-message">
    <slot name="input-field" />
    <Message
      severity="error"
      variant="simple"
      size="small"
    >
     {{ props.message }} 
    </Message>
  </div>
</template>

<script setup>
  import Message from 'primevue/message'

  const props = defineProps({
    message: Object
  })
</script>

<style lang="scss" scoped>
  .input-message {
    @include flex-layout(column, 4px);
  }
</style>
