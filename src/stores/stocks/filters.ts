// src/stores/filters.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filterStore', () => {
  const filters = ref({
    brokerage: '',
    sector: '',
    action: '',
    rating: '',
    dateOrder: '',
  })

  const setFilters = (newFilters: any) => {
    filters.value = { ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      brokerage: '',
      sector: '',
      action: '',
      rating: '',
      dateOrder: '',
    }
  }

  return { filters, setFilters, resetFilters }
})
