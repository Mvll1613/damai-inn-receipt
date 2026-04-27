<template>
  <div class="price-summary">
    <div class="price-summary__item">
      <span class="label">
        Total harga kamar
      </span>
      <span class="price">
        Rp {{ formatPrice(totalRoomPrice) }}
      </span>
    </div>

    <div class="price-summary__item">
      <span class="label">
        Extra bed
        <i>(Rp 70.000 per unit)</i>
      </span>
      <span class="price">
        Rp {{ formatPrice(totalExtraBeds) }}
      </span>
    </div>

    <div class="price-summary__item price-before-tax">
      <span class="main-value">
        TOTAL HARGA
        <i>(Sebelum pajak)</i>
      </span>
      <span class="label">
        Rp {{ formatPrice(totalPriceBeforeTax) }}
      </span>
    </div>
    
    <div class="price-summary__item">
      <span class="label">
        Pajak (10%)
      </span>
      <span class="price">
        Rp {{ formatPrice(totalTax) }}
      </span>
    </div>

    <div class="price-summary__item">
      <span class="main-value">
        GRAND TOTAL
      </span>
      <span class="main-value">
        Rp {{ formatPrice(grandTotal) }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import { computed, toRef } from 'vue'
  import { formatPrice } from '@/utils/price-formats'

  const props = defineProps({
    receiptData: Object
  })

  const receipts = toRef(props?.receiptData)

  const totalRoomPrice = computed(() => {
    let result = receipts.value?.reduce((total, receipt) => {
      return total + countTotalRoomPrice(receipt.pricePerNight, receipt.stayDuration)
    }, 0)

    return result || 0
  })

  const totalExtraBeds = computed(() => {
    let result = receipts.value?.reduce((total, receipt) => {
      return total + countExtraBedPrice(receipt.extraBeds)
    }, 0)

    return result || 0
  })

  const totalPriceBeforeTax = computed(() => totalRoomPrice.value + totalExtraBeds.value)
  const totalTax = computed(() => totalPriceBeforeTax.value * 0.1)
  const grandTotal = computed(() => totalPriceBeforeTax.value + totalTax.value)

  const countTotalRoomPrice = (pricePerNight, duration) => {
    return parseInt(pricePerNight) * parseInt(duration)
  }

  const countExtraBedPrice = extraBeds => {
    return 70000 * parseInt(extraBeds)
  }
</script>

<style lang="scss" scoped>
  .price-summary {
    @include flex-layout(column, 24px);
    padding: 28px;
    margin-top: 40px;
    background-color: white;
    border-radius: 0 0 8px 8px;

    &__item {
      @include flex-layout(row);
      justify-content: space-between;
      align-items: flex-end;

      & .label {
        @include font('heading-4');
      }

      & .main-value {
        @include font('heading-3');
      }

      & .price {
        @include font('body-regular');
        font-size: 20px;
      }
    }

    & .price-before-tax {
      padding-bottom: 24px;
      border-bottom: 2px dashed #D4D4D4;
    }
  }

  i {
    @include font('body-medium');
  }
</style>
