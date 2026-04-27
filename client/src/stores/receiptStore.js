import { ref } from 'vue'
import { defineStore } from 'pinia'
import httpRequest from '@/api/http-methods'
import apiPath from '@/api/api-path'

export const useReceiptStore = defineStore('receipt', () => {
  const receiptList = ref([])

  const getReceiptList = async () => {
    try {
      const res = await httpRequest.getDataViaApi(apiPath.getReceipt)
      receiptList.value = res
    } catch (error) {
      console.error(error)
    }
  }

  const addReceipt = async (data) => {
    try {
      const res = await httpRequest.postDataViaApi(apiPath.addReceipt, data)
      return res
    } catch (error) {
      console.error(error)
    }
  }
  
  return {
    getReceiptList,
    receiptList,
    addReceipt
  }
})
