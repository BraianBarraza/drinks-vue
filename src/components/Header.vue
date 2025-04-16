<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const homePage = computed(() => route.name === 'home')
</script>

<template>
  <header class="bg-slate-800"
  :class="{header: homePage}">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="/img/logo.svg" alt="Logo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4">
          <router-link
            :to="{ name: 'home' }"
            class="text-white font-bold uppercase"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'favorites' }"
            class="text-white font-bold uppercase"
          >
            Favorites
          </router-link>
        </nav>
      </div>

      <form
        v-if="homePage"
        action=""
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
      >
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingredients"
            >Name or Ingredients</label
          >
          <input
            type="text"
            id="ingredients"
            class="bg-white p-3 w-full rounded-lg focus:outline-none"
            placeholder="E.g. Cuba Libre, Vodka, Tequila, etc.."
          />
        </div>
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg">Category</label>
          <select
            for="category"
            id="ingredients"
            class="bg-white p-3 w-full rounded-lg focus:outline-none"
          >
            <option value="">-- Select --</option>
          </select>
        </div>

        <input
          type="submit"
          value="Search Recipes"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold uppercase w-full p-2 rounded-lg"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}

</style>
