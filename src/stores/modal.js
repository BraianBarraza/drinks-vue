import {defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.js'
import { useDrinksStore } from '@/stores/drinks.js'

export const useModalStore = defineStore('modal', ()=>{

  const favorites = useFavoritesStore()
  const drinks = useDrinksStore()
  const modal = ref(false)

  function handleClickModal(){
    modal.value = !modal.value
  }

  const buttonText = computed(() => {
    return favorites.favoriteExists(drinks.recipe.idDrink)
      ? 'Delete Favorite'
      : 'Add Favorite'
  })

  return {
    modal,
    buttonText,
    handleClickModal,
  }
})
