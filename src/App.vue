<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <!-- Logo / Título -->
      <div class="text-xl font-bold text-gray-800">Financ.io</div>

      <!-- Menú horizontal -->
      <ul class="flex items-center gap-6">
        <li>
          <RouterLink to="/news" class="text-gray-700 hover:text-gray-900 transition"
            >News</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/portfolio" class="text-gray-700 hover:text-gray-900 transition"
            >My Portfolio</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/contact" class="text-gray-700 hover:text-gray-900 transition"
            >Contact</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/stocks" class="text-gray-700 hover:text-gray-900 transition"
            >Stocks</RouterLink
          >
        </li>
      </ul>

      <!-- Botones de acción -->
      <div class="flex items-center gap-3">
        <button
          class="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
        >
          Sign In
        </button>
        <button class="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition">
          Register
        </button>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style>
/* Tailwind se encarga de la mayoría del estilo */
</style>
