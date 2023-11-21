<template>
    <TransitionRoot as="template" :show="isAddSongModalOpen">
        <Dialog as="div" class="relative z-10" @close="closeAddSongModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>
  
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                Añadir canción a playlist
                            </DialogTitle>
                            <form @submit.prevent="submitAddSong">
                                <div class="mt-2">
                                    <label for="song" class="block text-sm font-medium text-gray-700">Selecciona una canción</label>
                                    <select id="song" v-model="selectedSongId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                                        <option disabled value="">Por favor selecciona una canción</option>
                                        <option v-for="song in songs" :key="song.id" :value="song.id">{{ song.name }}</option> 
                                    </select>
                                </div>
                                <div class="mt-4">
                                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                                        Añadir Canción
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { addSongToPlaylist } from '@/backend/playlist';
  
const isAddSongModalOpen = ref(false);
const selectedSongId = ref(null);
const songs = ref([]); // rellenar canciones desde el backend
  
function openAddSongModal() {
    isAddSongModalOpen.value = true;
    // cargar canciones si es necesario
}
  
function closeAddSongModal() {
    isAddSongModalOpen.value = false;
}
  
async function submitAddSong() {
    if (!selectedSongId.value) {
      // error de no seleccionar canción
        console.error('No se seleccionó ninguna canción');
        return;
    }
  
    try {
      const playlistId = 1;
      await addSongToPlaylist(playlistId, selectedSongId.value);
      closeAddSongModal();
      // actualiza lista de canciones
    } catch (error) {
      console.error('Hubo un error al añadir la canción', error);
      // error en interfaz
    }
}
</script>
  