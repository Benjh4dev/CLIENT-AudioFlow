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
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-50" />
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
                        leave-to="opacity-0 scale-95">
                        <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black p-6 shadow-xl transition-all">
                            <div class="flex w-full mb-4">
                                
                            <!-- Bloque Izquierdo -->
                            <div class="w-1/2 p-4">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white mb-4 text-center">¡Sube una canción!</DialogTitle>
                                    <div class="mt-4">
                                        <label for="name" class="block text-sm text-gray-400">Nombre de la canción</label>
                                        <input
                                        v-model="formData.name"
                                        :maxlength="30"
                                        type="text"
                                        id="name"
                                        name="name"
                                        autocomplete="off"
                                        placeholder="Thriller"
                                        class="w-[90%] h-10 my-2 py-3 px-4 block border-6 bg-gray-950 text-white border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm ">
                                    </div>

                                    <div class="mt-4">
                                        <label for="artist" class="block text-sm text-gray-400">Nombre del artista</label>
                                        <input
                                        v-model="formData.artist"
                                        :maxlength="30"
                                        type="text"
                                        id="artist"
                                        name="artist"
                                        autocomplete="off"
                                        placeholder="Michael Jackson"
                                        class="w-[90%] h-10 my-2 py-3 px-4 block border-6 bg-gray-950 text-white border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm ">
                                    </div>

                                    <div class="mt-4">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Archivo de canción</label>
                                        <label class="bg-[#121212] w-[90%] pt-[9px] pl-2 block h-10 text-sm text-white border border-gray-200 rounded-lg cursor-pointer relative overflow-hidden">
                                            <input @change="updateSongName" class="absolute w-0 h-0 opacity-0" id="song" type="file" accept="audio/wav, audio/mp3">
                                            {{ songName || 'Selecciona una canción' }}
                                        </label>
                                    </div>

                                    <div class="mt-4">
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen de la canción</label>
                                        <label class="bg-[#121212] w-[90%] pt-[9px] pl-2 block h-10 text-sm text-white border border-gray-200 rounded-lg cursor-pointer relative overflow-hidden" accept="image/jpeg, image/png, image/jpg">
                                            <input @change="updateCoverArt" class="absolute w-0 h-0 opacity-0" id="cover_art" type="file" accept="image/jpeg, image/png, image/jpg">
                                            {{ coverArtName || 'Selecciona una imagen' }}
                                        </label>
                                    </div>

                                </div>

                                <!-- Bloque Derecho -->
                                <div class="w-1/2 p-4">
                                    <DialogTitle as="h3" class="text-white text-lg text-center font-medium leading-6 mb-4 sm:ml-6">Vista previa</DialogTitle>
                                    <div class="flex items-center justify-center w-full pt-16 sm:pt-7">
                                        <img :src="coverArtPreview || 'images/cover-art-default.png'" alt="Cover Art Preview" class="w-36 h-36 sm:w-56 sm:h-56 sm:ml-8 rounded group transition-all duration-300 ease-in-out">
                                    </div>
                                    <div class="block pr-3 sm:pl-7">
                                        <label class="text-white text-sm block pt-7 text-center">{{ formData.name || 'Nombre' }}</label>
                                        <label class="text-gray-500 font-semibold text-sm block text-center">{{ formData.artist || 'Artista' }}</label>

                                    </div>
                                </div>
                            </div>
                            <!-- Bloque de Abajo Full Width -->
                            <div class="w-full flex flex-col items-center">
                                <div class="flex justify-center pb-4">
                                    <!-- <p v-if="Object.keys(errors).length > 0" class="text-xs text-red-600 mt-2">{{ errors }}</p> -->
                                </div>
                                <button @click="uploadSong" class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:text-black hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                    Subir canción
                                </button>
                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { ref, defineEmits } from 'vue';
import { useMainStore } from '@/stores/main';
import { showErrorToast } from '@/utils/toast';
import { UploadSongForm, FormErrors } from '@/interfaces';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const mainStore = useMainStore();

const isOpen = ref<boolean>(true);
const emits = defineEmits(['close']);

const formData = ref<UploadSongForm>({
    name: '',
    artist: '',
    audio_file: null,
    cover_art: null,
});

function closeModal(): void { 
    isOpen.value = false;
    setTimeout(() => { emits('close'); }, 300);
};


const songName = ref<string>('');
const coverArtName = ref<string>('');

const updateSongName = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        songName.value = file.name;
    }
};

const coverArtPreview = ref<string | null>(null);

const updateCoverArt = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
        coverArtName.value = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            coverArtPreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

async function uploadSong(): Promise<void> {
}
</script>