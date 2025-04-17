import { defineStore } from 'pinia'
import { useDrinksStore } from '@/stores/drinks.js'
import { onMounted, ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const drinks = useDrinksStore()
  const favorites = ref([])

  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? []
  })

  watch(
    favorites,
    () => {
      syncLocalStorage()
    },
    {
      deep: true,
    },
  )

  function syncLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function favoriteExists() {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites')) ?? []
    return favoritesLocalStorage.some((favorite) => favorite.idDrink === drinks.recipe.idDrink)
  }

  function addFavorite() {
    favorites.value.push(drinks.recipe)
  }

  function deleteFavorite() {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinks.recipe.idDrink,
    )
  }

  function handleClickFavorite() {
    if (favoriteExists()) {
      deleteFavorite()
    } else {
      addFavorite()
    }
  }

  return {
    favorites,
    handleClickFavorite,
    favoriteExists,
  }
})
