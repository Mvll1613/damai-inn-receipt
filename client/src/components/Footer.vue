<template>
  <div class="footer">
    <div class="footer__copyright">&copy; Damai Inn</div>
    <div class="footer__address">Jln. Jend. Sudirman No. 19 Pangkalpinang - Bangka</div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .footer {
    @include flex-layout();
    justify-content: space-between;
    background-color: #262626;
    padding: 16px 84px;
    color: #FFFF;

    &__copyright {
      @include font('heading-4');
    }

    &__address {
      @include font('body-medium');
    }
  }
</style>
