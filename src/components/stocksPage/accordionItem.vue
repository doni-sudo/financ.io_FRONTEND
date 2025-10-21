<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]"
  >
    <!-- Header -->
    <button
      @click="$emit('toggle')"
      class="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300"
    >
      <div class="flex items-center gap-3">
        <!-- Company Logo -->
        <img
          v-if="Logo"
          :src="Logo"
          alt="logo"
          class="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-sm"
        />
        <div
          v-else
          class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200"
        >
          <LucideUser class="w-4 h-4 text-gray-400" />
        </div>

        <!-- Company + Brokerage Info -->
        <div>
          <h2 class="font-semibold text-gray-800 text-base leading-tight">
            {{ Company }}
          </h2>
          <p class="text-xs text-gray-500 tracking-wide mt-0.5">
            {{ Ticker }}
            <span class="text-gray-400"> • {{ Brokerage }}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <!-- Target Change % -->
        <span
          :class="[
            'font-bold text-xs px-2.5 py-1 rounded-full shadow-sm transition-all duration-300',
            Change >= 0
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200',
          ]"
        >
          {{ Change > 0 ? '+' : '' }}{{ Change }}%
        </span>
        <span class="text-[9px] text-gray-400 mt-0.5"> Expected upside/downside </span>
      </div>
    </button>

    <!-- Body -->
    <transition name="accordion">
      <div
        v-if="open"
        class="px-5 py-5 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
          <!-- Brokerage -->
          <div class="flex items-start gap-2">
            <LucideUser class="w-4.5 h-4.5 text-blue-500 mt-0.5" />
            <div>
              <p class="text-gray-500 text-[11px] uppercase tracking-wide">Brokerage</p>
              <p class="font-medium text-gray-800">{{ Brokerage }}</p>
            </div>
          </div>

          <!-- Action -->
          <div class="flex items-start gap-2">
            <LucideFlame class="w-4.5 h-4.5 text-red-500 mt-0.5" />
            <div>
              <p class="text-gray-500 text-[11px] uppercase tracking-wide">Action</p>
              <p :class="ActionColor" class="font-medium">{{ Action }}</p>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex items-start gap-2">
            <LucideStar class="w-4.5 h-4.5 text-yellow-500 mt-0.5" />
            <div>
              <p class="text-gray-500 text-[11px] uppercase tracking-wide">Rating</p>
              <p :class="RatingFromColor" class="font-medium">
                {{ RatingFrom }} →
                <span :class="RatingToColor">{{ RatingTo }}</span>
              </p>
            </div>
          </div>

          <!-- Price Target -->
          <div class="flex items-start gap-2">
            <LucideTarget class="w-4.5 h-4.5 text-green-600 mt-0.5" />
            <div>
              <p class="text-gray-500 text-[11px] uppercase tracking-wide">Price Target</p>
              <p class="font-medium">
                From {{ TargetFrom }} →
                <span
                  :class="[
                    'font-semibold',
                    TargetTo >= TargetFrom ? 'text-green-600' : 'text-red-600',
                  ]"
                >
                  ${{ TargetTo }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="mt-5 text-[11px] text-gray-500 border-t border-gray-200 pt-3 flex justify-between items-center italic"
        >
          <span>Last updated: {{ formattedEventTime }}</span>
          <span class="font-medium text-gray-400">Brokerage opinion</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { LucideUser, LucideStar, LucideTarget, LucideFlame } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  Company: string
  Ticker: string
  Change: number
  Brokerage: string
  Action: string
  RatingTo: string
  RatingFrom: string
  TargetFrom: number
  TargetTo: number
  EventTime: Date
  Logo: string
}>()

defineEmits(['toggle'])

// Fecha formateada
const formattedEventTime = computed(() => {
  const date = new Date(props.EventTime)
  if (isNaN(date.getTime())) return 'Invalid Date'
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
})

// Clasificación de rating
const getRatingType = (rating: string) => {
  if (!rating) return 'neutral'
  const r = rating.toLowerCase()
  if (['buy', 'strong buy', 'overweight', 'outperform', 'positive'].includes(r)) return 'positive'
  if (['sell', 'strong sell', 'underweight', 'underperform', 'negative'].includes(r))
    return 'negative'
  return 'neutral'
}

const RatingToColor = computed(() => {
  const type = getRatingType(props.RatingTo)
  if (type === 'positive') return 'text-green-600'
  if (type === 'negative') return 'text-red-600'
  return 'text-gray-500'
})

const RatingFromColor = computed(() => {
  const type = getRatingType(props.RatingFrom)
  if (type === 'positive') return 'text-green-600'
  if (type === 'negative') return 'text-red-600'
  return 'text-gray-500'
})

// Clasificación de acción
const getActionType = (Action: string) => {
  if (!Action) return 'neutral'
  const a = Action.toLowerCase()
  if (a.includes('raised') || a.includes('upgraded')) return 'positive'
  if (a.includes('lowered') || a.includes('downgraded')) return 'negative'
  if (a.includes('set')) return 'neutral-blue'
  if (a.includes('reiterated')) return 'neutral'
  if (a.includes('initiated')) return 'initiated'
  return 'neutral'
}

const ActionColor = computed(() => {
  const type = getActionType(props.Action)
  switch (type) {
    case 'positive':
      return 'text-green-600'
    case 'negative':
      return 'text-red-600'
    case 'neutral-blue':
      return 'text-blue-600'
    case 'initiated':
      return 'text-amber-600'
    default:
      return 'text-gray-500'
  }
})
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
