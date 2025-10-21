<template>
  <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4 text-gray-800">Filters</h2>

      <div class="space-y-4">
        <!-- Brokerage -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Brokerage</label>
          <select
            v-model="localFilters.brokerage"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Any</option>
            <option v-for="broker in brokerages" :key="broker" :value="broker">
              {{ broker }}
            </option>
          </select>
        </div>
        <!-- sector -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">sector</label>
          <select
            v-model="localFilters.sector"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Any</option>
            <option v-for="sector in sectors" :value="sector">
              {{ sector }}
            </option>
          </select>
        </div>

        <!-- Action -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Action</label>
          <select
            v-model="localFilters.action"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Any</option>
            <option value="Target Raised By">Target Raised By</option>
            <option value="Target Lowered By">Target Lowered By</option>
            <option value="Reiterated By">Reiterated By</option>
            <option value="Upgraded By">Upgraded By</option>
            <option value="Downgraded By">Downgraded By</option>
            <option value="Initiated By">Initiated By</option>
          </select>
        </div>

        <!-- Rating -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Rating</label>
          <select
            v-model="localFilters.rating"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Any</option>
            <option value="Buy">Buy</option>
            <option value="Hold">Hold</option>
            <option value="Sell">Sell</option>
          </select>
        </div>

        <!-- Fecha -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Date</label>
          <select
            v-model="localFilters.dateOrder"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Any</option>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex justify-between mt-6">
        <button
          @click="resetFilters"
          class="px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition"
        >
          Reset
        </button>

        <div class="flex gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            @click="apply"
            class="px-4 py-2 rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFilterStore } from '../../stores/stocks/filters'

const props = defineProps<{
  brokerages: string[]
  sectors: string[]
}>()

const emit = defineEmits(['close', 'apply', 'reset'])

const filterStore = useFilterStore()

const localFilters = ref<Record<string, any>>({ ...filterStore.filters })

// sincroniza con el store si cambia desde otro lado
watch(
  () => filterStore.filters,
  (val) => {
    localFilters.value = { ...val }
  },
)

const apply = () => {
  filterStore.setFilters({ ...localFilters.value })
  emit('close')
}

const resetFilters = () => {
  localFilters.value = {}
  filterStore.resetFilters()
  emit('close')
}
</script>
