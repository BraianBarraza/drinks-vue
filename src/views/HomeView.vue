<script setup>
import {useDrinksStore } from '@/stores/drinks.js'
import Recipes from '@/components/Recipes.vue'

const store = useDrinksStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recipes</h1>

  <p v-if="store.noRecipes"
     class="my-10 text-center text-2xl">No results yet, What are you drinking tonight !?</p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">
    <Recipes v-for="recipe in store.recipes"
    :recipe="recipe"
    :key="recipe.idDrink"/>
  </div>

</template>
