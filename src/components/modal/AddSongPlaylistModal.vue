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
              <DialogPanel class="flex w-full max-w-sm transform overflow-hidden rounded-2xl bg-black p-6 shadow-xl transition-all">
            
                <div class="w-full mx-auto pr-4 gap-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white mb-4">¡Agrega la canción a una Playlist!</DialogTitle>
                  <label for="playlists" class="block mb-2 text-sm font-medium text-gray-400">Selecciona una Playlist:</label>
                  <select id="playlists" v-model="selectedPlaylist"
                  class="border text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 bg-black border-gray-600 text-white"
                  :class="{ 'border-red-500': errors }">
                    <option v-for="playlist in playlists" :key="playlist.id" :value="playlist">{{ playlist.name }}</option>
                  </select>
                  <p v-if="errors" class="text-xs text-red-600 mt-2">{{ errors }}</p>

                  <div class="mt-8 flex justify-center">
                      <button @click=submitForm type="submit" :disabled="isLoading" :class="{'bg-red-600 hover:bg-red-200': isLoading}" class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:text-black hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                          Agregar a la Playlist
                      </button>
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
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { addSongToPlaylist } from '@/backend/playlist';
import { Playlist, Song } from '@/interfaces';

import { showErrorToast, showSuccessToast } from '@/utils/toast';

import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();

const isOpen = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const errors = ref<string>('');

const props = defineProps({
  song: {
        type: Object as () => Song,
        required: true
    }
}) 

const playlists = mainStore.myPlaylists;
const selectedPlaylist = ref<Playlist>(playlists[0]);

const emits = defineEmits(['close']);

function closeModal(): void {
  isOpen.value = false;
  setTimeout(() => { emits('close'); }, 300);
}

async function submitForm(): Promise<void> {
  errors.value = '';
  isLoading.value = true;

  if(selectedPlaylist.value === null) {
        showErrorToast('Debes seleccionar una playlist!');
        return;
    };

  try {
    if (selectedPlaylist.value !== null && props.song){
      await addSongToPlaylist(selectedPlaylist.value.id, props.song.id.toString());
      closeModal();
      showSuccessToast('Canción agregada con éxito');
    }
  }
  catch (error: any) {
    errors.value = (error.response.data.message)
    isLoading.value = false;
  } 
};
</script>