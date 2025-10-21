<template>
  <div
    class="relative w-72 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition"
  >
    <!-- Marca de agua (blur) -->
    <div
      class="absolute inset-0 opacity-5 bg-[url('your-logo.png')] bg-center bg-contain bg-no-repeat blur-xl"
    ></div>

    <!-- Contenido -->
    <div class="relative z-10 flex flex-col items-center text-center">
      <!-- Logo cuadrado en marco circular -->
      <div
        class="w-20 h-20 rounded-2xl overflow-hidden bg-white/60 shadow-inner mb-3 border border-white/70"
      >
        <img :src="Logo" class="w-full h-full object-cover scale-110" alt="Logo" />
      </div>

      <h2 class="text-xl font-bold text-gray-800">{{ Ticker }}</h2>
      <p class="text-sm text-gray-600">{{ Company }}</p>
      <p class="text-xs text-gray-500 mb-3">{{ Brokerage }}</p>

      <div
        :class="[
          'inline-block px-3 py-1 rounded-full font-semibold text-sm shadow-sm transition',
          Change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        ]"
      >
        {{ Change > 0 ? '+' : '' }}{{ Change }}%
      </div>
      <span class="text-[9px] text-gray-400 mt-1">Potential return %</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  Ticker: string
  Company: string
  Brokerage: string
  TargetTo: number
  Change: number
  Logo: string
}>()
</script>

<style scoped>
@keyframes pulseChange {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.05);
  }
}
</style>
