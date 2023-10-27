<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-[50]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-80" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="flex transform overflow-hidden rounded-2xl bg-black p-6 shadow-xl transition-all">
                <div class="bg-black p-4 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold text-white">¿Estás seguro de que deseas eliminar esta canción?</h2>
                    <div class="mt-4 flex justify-end">
                        <button @click="closeModal" class="px-3 py-1 mr-2 bg-green-500 text-gray-700 rounded hover:bg-green-300">Cancelar</button>
                        <button @click="confirmModal" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400">Confirmar</button>
                    </div>
                </div>
  
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
    
<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { ref, defineEmits } from 'vue';

const isOpen = ref<boolean>(true);
const emits = defineEmits(['close', 'confirm']);

function closeModal(): void {
    isOpen.value = false;
    emits('close');
}

function confirmModal(): void {
    isOpen.value = false;
    emits('confirm');
}
</script>
    