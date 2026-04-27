<template>
  <div class="kwitansi-input-table">
    <div class="kwitansi-input-table__add-btn">
      <Button
        icon="pi pi-plus"
        size="small"
        label="Tambah"
        variant="outlined"
        raised
        @click="addTableRow"
      />
    </div>

    <table>
      <tr>
        <th class="required">No. Kamar</th>
        <th class="required">Tipe Kamar</th>
        <th class="required">Check-In</th>
        <th class="required">Check-Out</th>
        <th class="required">Harga per malam</th>
        <th class="required">Durasi Inap</th>
        <th>
          <div class="extra-bed-header">
            <span class="required">Extra bed</span>
            <span
              v-tooltip.top="'Masukkan angka 0 jika pengunjung tidak memesan extra bed'"
              class="pi pi-info-circle"
              style="color: #737373;"
            />
          </div>
        </th>
        <th>Aksi</th>
      </tr>

      <!-- Input row -->
      <tr
        v-for="(data, index) in receiptData"
        :key="index"
      >
        <td id="room-number">
          <InputMessage>
            <template #input-field>
              <InputText
                v-model="data.roomNumber"
                placeholder="No. kamar"
                fluid
              />
            </template>
          </InputMessage>
        </td>
        <td id="room-type">
          <InputMessage>
            <template #input-field>
              <Select
                v-model="data.roomType"
                :options="roomTypeOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Pilih tipe kamar"
                fluid
              />
            </template>
          </InputMessage>
        </td>
        <td id="check-in">
          <InputMessage>
            <template #input-field>
              <DatePicker
                v-model="data.checkIn"
                showIcon
                iconDisplay="input"
                dateFormat="dd M yy"
                placeholder="Pilih tanggal"
              />
            </template>
          </InputMessage>
        </td>
        <td id="check-out">
          <InputMessage>
            <template #input-field>
              <DatePicker
                v-model="data.checkOut"
                showIcon
                iconDisplay="input"
                dateFormat="dd M yy"
                placeholder="Pilih tanggal"
              />
            </template>
          </InputMessage>
        </td>
        <td id="price-per-night">
          <InputMessage>
            <template #input-field>
              <InputNumber
                v-model="data.pricePerNight"
                placeholder="Masukkan harga"
                fluid
                mode="currency"
                inputId="currency-indonesia"
                currency="IDR"
                locale="id-ID"
              />
            </template>
          </InputMessage>
        </td>
        <td id="stay-duration">
          <InputMessage>
            <template #input-field>
              <InputNumber
                v-model="data.stayDuration"
                placeholder="Berapa malam?"
                fluid
                suffix=" malam"
              />
            </template>
          </InputMessage>
        </td>
        <td id="extra-beds">
          <InputMessage>
            <template #input-field>
              <InputNumber
                v-model="data.extraBeds"
                placeholder="Berapa extrabed?"
                fluid
                suffix=" pcs"
              />
            </template>
          </InputMessage>
        </td>
        <td id="delete-btn">
          <Button
            icon="pi pi-trash"
            variant="text"
            severity="danger"
            rounded
            :disabled="isBtnDisabled"
            :class="{ 'btn-disabled': isBtnDisabled }"
            @click="deleteTableRow(index)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
  import { computed, toRef } from 'vue'
  import constants from '@/constants'
  
  import Select from 'primevue/select'
  import DatePicker from 'primevue/datepicker'
  import InputText from 'primevue/inputtext'
  import InputNumber from 'primevue/inputnumber'
  import Button from 'primevue/button'

  import InputMessage from './base/InputMessage.vue'

  const roomTypeOptions = constants.roomTypeOptions


  const props = defineProps({
    receiptData: Object
  })

  const receiptData = toRef(props, 'receiptData')

  const isBtnDisabled = computed(() => receiptData.value?.length === 1)

  const addTableRow = () => {
    receiptData.value.push({
      roomNumber: '',
      roomType: '',
      checkIn: '',
      checkOut: '',
      pricePerNight: '',
      stayDuration: '',
      extraBeds: ''
    })
  }

  const deleteTableRow = index => {
    receiptData.value.splice(index, 1)
  }
</script>

<style lang="scss" scoped>
  .kwitansi-input-table {
    @include flex-layout(column, 8px);
    align-items: flex-end;

    table {
      min-width: 100%;
      border-collapse: collapse;
    }

    th {
      @include font('small-bold');
      padding: 8px;
      background-color: #DBEAFE;
      text-align: left;

      &:nth-child(1) {
        width: 10%;
      }
      &:nth-child(2) {
        width: 13%;
      }
      &:nth-child(3) {
        width: 15%;
      }
      &:nth-child(4) {
        width: 15%;
      }
      &:nth-child(5) {
        width: 17%;
      }
      &:nth-child(6) {
        width: 12%;
      }
      &:nth-child(7) {
        width: 13%;
      }
      &:nth-child(8) {
        width: 5%;
        text-align: center;
      }

      & .extra-bed-header {
        @include flex-layout(row, 8px);
        align-items: center;
      }
    }

    .required::after {
      content: ' *';
      color: red;
    }

    td {
      padding: 16px 8px;
      border-bottom: 2px solid #D4D4D4;

      &:nth-child(8) {
        text-align: center;
      }
    }

    .btn-disabled {
      cursor: not-allowed;
    }
  }
</style>
