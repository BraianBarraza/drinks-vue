<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useDrinksStore } from '@/stores/drinks.js'
import { useNotificationsStore } from '@/stores/notifications.js'

const route = useRoute()
const store = useDrinksStore()
const notifications = useNotificationsStore()

const homePage = computed(() => route.name === 'home')

const handleSubmit = () =>{
  if (Object.values(store.search).includes('')){
    notifications.$patch({
      text : 'All fields must been filled',
      show : true,
      error : true
    })
    return
  }

  store.getRecipes()
}
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

        <nav class="text-white flex gap-4">
          <router-link
            :to="{ name: 'home' }"
            class="font-bold uppercase"
            active-class="text-orange-500"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'favorites' }"
            class="font-bold uppercase"
            active-class="text-orange-500"
          >
            Favorites
          </router-link>
          <router-link
            :to="{ name: 'ai' }"
            class="font-bold uppercase"
            active-class="text-orange-500"
          >
            Generate with AI
          </router-link>
        </nav>
      </div>

      <form
        v-if="homePage"
        action=""
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
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
            v-model="store.search.name"
          />
        </div>
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg">Category</label>
          <select
            id="ingredients"
            class="bg-white p-3 w-full rounded-lg focus:outline-none"
            v-model="store.search.category"
          >
            <option value="">-- Select --</option>
            <option
            v-for="category in store.categories" :key="category.strCategory" :value="category.strCategory">
              {{ category.strCategory }}
            </option>
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
