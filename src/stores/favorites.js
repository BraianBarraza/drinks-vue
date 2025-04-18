import { computed, onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDrinksStore } from '@/stores/drinks.js'
import { useModalStore } from '@/stores/modal.js'
import { useNotificationsStore } from '@/stores/notifications.js'

export const useFavoritesStore = defineStore('favorites', () => {
  const drinks = useDrinksStore()
  const modal = useModalStore()
  const notifications = useNotificationsStore()
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
      deep: true
    }
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
    notifications.show = true
    notifications.text = `Added to Favorites`
  }

  function deleteFavorite() {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinks.recipe.idDrink)

    notifications.show = true
    notifications.text = `Deleted from favorites`
  }

  function handleClickFavorite() {
    if (favoriteExists()) {
      deleteFavorite()
    } else {
      addFavorite()
    }
    modal.modal = false
  }

  const noFavorites = computed(() => favorites.value.length === 0)

  return {
    favorites,
    noFavorites,
    handleClickFavorite,
    favoriteExists
  }
})
