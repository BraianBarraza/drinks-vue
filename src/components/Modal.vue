<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '@/stores/modal.js'
import { useDrinksStore } from '@/stores/drinks.js'
import { useFavoritesStore } from '@/stores/favorites.js'

const modal = useModalStore()
const drinks = useDrinksStore()
const favorite = useFavoritesStore()

const showIngredients = () => {
  const ingredientsDiv = document.createElement('div')
  for (let i = 1; i <= 15; i++) {
    if (drinks.recipe[`strIngredient${i}`]) {
      const ingredient = drinks.recipe[`strIngredient${i}`]
      const quantity = drinks.recipe[`strMeasure${i}`]

      const ingredientQuantity = document.createElement('p')
      ingredientQuantity.classList.add('text-lg')
      ingredientQuantity.textContent = `${ingredient} - ${quantity}`

      ingredientsDiv.appendChild(ingredientQuantity)
    }
  }
  return ingredientsDiv
}
</script>

<template>
  <TransitionRoot as="template" :show="modal.modal">
    <Dialog as="div" class="relative z-10" @close="modal.handleClickModal()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ drinks.recipe.strDrink }}
                  </DialogTitle>

                  <img
                    :src="drinks.recipe.strDrinkThumb"
                    :alt="drinks.recipe.strDrink"
                    class="mx-auto w-96"
                  />

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Ingredients & Quantities
                  </DialogTitle>

                  <div v-html="showIngredients().outerHTML"></div>

                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Instructions
                  </DialogTitle>

                  <p class="text-lg text-gray-500">{{ drinks.recipe.strInstructions }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="w-full rounded bg-gray-600 p-3 font-bold text-white uppercase shadow hover:bg-gray-500"
                  @click="modal.handleClickModal()"
                >
                  Close
                </button>

                <button
                  type="button"
                  class="w-full rounded bg-orange-600 p-3 font-bold text-white uppercase shadow hover:bg-orange-500"
                  @click="favorite.handleClickFavorite()"
                >
                  {{modal.buttonText}}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
