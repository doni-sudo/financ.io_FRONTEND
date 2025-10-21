<template>
  <div class="min-h-screen bg-black-100">
    <!-- Top Performing Stocks -->
    <section
      class="relative max-w-6xl mx-auto px-6 py-10 bg-gradient-to-b from-white via-gray-50 to-white rounded-3xl shadow-sm"
    >
      <!-- Encabezado -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <!-- 🔥 Gradient Text Title -->
          <h2
            class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent relative inline-block pb-1"
          >
            Top Performing Stocks
            <!-- 💡 Línea más separada y más suave -->
            <span
              class="absolute -bottom-2 left-0 w-48 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 to-green-600 opacity-70"
            ></span>
          </h2>

          <p class="text-gray-500 text-sm mt-3">
            Updated regularly with the top 3 outperforming stocks in the market.
          </p>
        </div>

        <!-- Botón de refrescar -->
        <button
          @click="topStocksStore.fetchTopStocks()"
          class="mt-6 sm:mt-0 flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0119 5"
            />
          </svg>
          Refresh
        </button>
      </div>

      <!-- Loading / Error -->
      <div v-if="topStocksStore.loading" class="text-center py-6 text-gray-500 italic">
        Loading top stocks...
      </div>
      <div v-if="topStocksStore.error" class="text-center py-6 text-red-500 font-medium">
        {{ topStocksStore.error }}
      </div>

      <!-- Cards -->
      <div
        v-if="!topStocksStore.loading && !topStocksStore.error"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        <StockCard
          v-for="(stock, index) in topStocksStore.topStocks"
          :key="stock.Ticker"
          :Ticker="stock.Ticker"
          :Company="stock.Company"
          :Brokerage="stock.Brokerage"
          :TargetTo="stock.TargetTo"
          :Change="stock.Change"
          :Logo="stock.Logo"
          :rank="(index + 1).toString()"
        />
      </div>
    </section>

    <!-- Stock Table -->
    <section class="max-w-6xl mx-auto px-6 pb-12 l overflow-hidden mt-6">
      <StockTable
        :data="stockStore.filteredStocks"
        :currentPage="page"
        :totalPages="stockStore.totalPages"
        @search="onSearch"
        @applyFilters="onApplyFilters"
        @prevPage="page--"
        @nextPage="page++"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import StockCard from '../components/stocksPage/stockCard.vue'
import StockTable from '../components/stocksPage/stocksTable.vue'
import { useStockStore } from '../stores/stocks/stockStore'
import { useTopStocksStore } from '../stores/stocks/topStocksStore'
import { useFilterStore } from '../stores/stocks/filters'

const page = ref(1)
const searchQuery = ref('')

const stockStore = useStockStore()
const topStocksStore = useTopStocksStore()
const filterStore = useFilterStore()

// Controla que la página siempre esté dentro de los límites
watch(page, async (newPage) => {
  if (newPage < 1) page.value = 1
  else if (newPage > stockStore.totalPages) page.value = stockStore.totalPages
  await fetchStocks()
})

// Función para llamar API de tabla
const fetchStocks = async () => {
  await stockStore.fetchStocks(filterStore.filters, searchQuery.value, page.value)
}

// Búsqueda
const onSearch = async (value: string) => {
  searchQuery.value = value
  page.value = 1 // reinicia a la primera página
  await fetchStocks()
}

// Aplicar filtros
const onApplyFilters = async (newFilters: Record<string, any>) => {
  filterStore.setFilters(newFilters)
  page.value = 1 // reinicia a la primera página
  await fetchStocks()
}

// Al cargar la página: trae tabla y top stocks
onMounted(async () => {
  await fetchStocks()
  await topStocksStore.fetchTopStocks()
})
</script>
