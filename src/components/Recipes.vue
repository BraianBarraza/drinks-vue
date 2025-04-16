<script setup>
import { useDrinksStore } from '@/stores/drinks.js'

const store = useDrinksStore()

defineProps({
  recipe: {
    type: Object,
  },
})
</script>

<template>
  <div class="border border-gray-500 rounded-lg shadow-lg overflow-hidden">
    <div class="overflow-hidden">
      <img
        class="hover:scale-125 transition-transform hover:rotate-2"
        :src="recipe.strDrinkThumb"
        :alt="recipe.strDrink"
      />
    </div>

    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      <button
        type="button"
        class="bg-orange-500 mt-5 w-full p-3 cursor-pointer text-lg hover:bg-orange-300 text-white font-bold"
        @click="store.selectDrink(recipe.idDrink)"
      >
        Show Recipe
      </button>
    </div>
  </div>
</template>
