import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stockService } from '../../services/stockServices'

export const useTopStocksStore = defineStore('topStocksStore', () => {
  const stocks = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTopStocks = async () => {
    loading.value = true
    error.value = null
    try {
      stocks.value = await stockService.getTopStocks()
    } catch (err) {
      console.error(err)
      error.value = 'Failed to fetch top stocks'
      stocks.value = []
    } finally {
      loading.value = false
    }
  }

  const topStocks = computed(() => stocks.value)

  return { stocks, topStocks, fetchTopStocks, loading, error }
})
