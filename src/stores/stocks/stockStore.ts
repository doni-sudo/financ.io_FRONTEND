import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stockService } from '../../services/stockServices'

export const useStockStore = defineStore('stockStore', () => {
  const stocks = ref<any[]>([])
  const totalPages = ref(1)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStocks = async (filters: Record<string, any>, search: string, page: number) => {
    if (page < 1) page = 1 // Evitar página cero

    loading.value = true
    error.value = null
    try {
      const res = await stockService.getStocks(filters, search, page)
      stocks.value = res.data
      totalPages.value = res.totalPages
      if (page > totalPages.value) stocks.value = [] // Evitar pasar la última página
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch stocks'
      stocks.value = []
    } finally {
      loading.value = false
    }
  }

  const filteredStocks = computed(() => stocks.value)

  return { stocks, filteredStocks, totalPages, fetchStocks, loading, error }
})
