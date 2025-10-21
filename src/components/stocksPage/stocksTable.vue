<template>
  <div
    class="p-6 w-full max-w-5xl mx-auto bg-gradient-to-b from-white via-gray-50 to-white rounded-3xl shadow-sm border border-gray-100"
  >
    <!-- 🔍 Header con buscador y botón de filtros -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
      <h2
        class="text-2xl font-bold bg-gradient-to-r from-slate-600 via-gray-700 to-zinc-900 bg-clip-text text-transparent"
      >
        Stock Recommendations
      </h2>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative flex-1 sm:flex-none sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search company..."
            class="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-sm transition-all"
            @keyup.enter="fetchData"
          />
          <button
            @click="fetchData"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
          >
            <LucideSearch class="w-5 h-5" />
          </button>
        </div>

        <button
          @click="showFilters = true"
          class="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
        >
          <LucideSlidersHorizontal class="w-5 h-5" />
          <span class="text-sm font-medium hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>

    <!-- 📊 Loading / Error states -->
    <div v-if="stockStore.loading" class="text-center py-8 text-gray-500 italic">
      Loading stocks...
    </div>

    <div
      v-if="stockStore.error"
      class="text-center py-6 bg-red-50 text-red-600 font-medium rounded-lg border border-red-100"
    >
      {{ stockStore.error }}
    </div>

    <!-- 📈 Lista de acordeones -->
    <div v-if="!stockStore.loading && !stockStore.error" class="space-y-3">
      <AccordionItem
        v-for="(item, index) in stockStore.filteredStocks"
        :key="item.symbol"
        v-bind="item"
        :open="openIndex === index"
        @toggle="openIndex = openIndex === index ? null : index"
      />

      <div
        v-if="stockStore.filteredStocks.length === 0"
        class="text-center text-gray-400 py-8 border border-dashed border-gray-200 rounded-xl"
      >
        No stocks found with current filters.
      </div>
    </div>

    <!-- 📄 Paginación -->
    <div
      class="flex justify-between items-center mt-8 text-sm text-gray-600 border-t border-gray-200 pt-4"
    >
      <button
        @click="prevPage"
        :disabled="currentPage <= 1"
        class="px-3 py-1.5 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>
      <span class="font-medium text-gray-700"> Page {{ currentPage }} / {{ totalPages }} </span>
      <button
        @click="nextPage"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1.5 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>

    <!-- ⚙️ Popup de filtros -->
    <FilterPopup
      v-if="showFilters"
      :brokerages="['Morgan Stanley', 'Goldman Sachs', 'Barclays']"
      :sectors="['Technology', 'Banking', 'Autocomponents']"
      :activeFilters="filterStore.filters"
      @close="onFilterClose"
      @apply="onApplyFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LucideSearch, LucideSlidersHorizontal } from 'lucide-vue-next'
import AccordionItem from './accordionItem.vue'
import FilterPopup from './filterPopUp.vue'
import { useStockStore } from '../../stores/stocks/stockStore'
import { useFilterStore } from '../../stores/stocks/filters'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits(['prevPage', 'nextPage'])

const searchQuery = ref('')
const showFilters = ref(false)
const openIndex = ref<number | null>(null)

const stockStore = useStockStore()
const filterStore = useFilterStore()

// Llama al store de stocks con filtros, búsqueda y página actual
const fetchData = async () => {
  await stockStore.fetchStocks(filterStore.filters, searchQuery.value, props.currentPage)
}

// Control de paginación
const prevPage = () => {
  if (props.currentPage > 1) emit('prevPage')
}

const nextPage = () => {
  if (props.currentPage < stockStore.totalPages) emit('nextPage')
}

// Al cerrar el popup de filtros
const onFilterClose = () => {
  showFilters.value = false
  fetchData()
}

// Aplicar filtros desde popup
const onApplyFilters = async (newFilters: Record<string, any>) => {
  filterStore.setFilters(newFilters)
  showFilters.value = false
  emit('prevPage') // reinicia a página 1
  await fetchData()
}

// Escucha cambios de búsqueda y reinicia página 1
watch(searchQuery, async (newVal, oldVal) => {
  if (newVal === '') await fetchData()
})
</script>
