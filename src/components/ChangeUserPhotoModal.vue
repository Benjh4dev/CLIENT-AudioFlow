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
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white mb-4 text-center">¡Cambia tu foto de perfil!</DialogTitle>
                                    <div class="flex items-center justify-center w-full">
                                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-green-700 dark:hover:border-green-500 dark:hover:bg-gray-950">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-white"><span class="font-semibold">Click para buscar tu imagen</span></p>
                                                <p class="text-xs text-gray-500 dark:text-white">PNG, JPG o JPEG (MAX. 800x400px)</p>
                                            </div>
                                            <input @change="handleFileChange" id="dropzone-file" type="file" class="hidden" accept="image/jpeg, image/png, image/jpg"/>
                                        </label>
                                    </div>
                                    
                                </div>
                                <!-- Bloque Derecho -->
                                <div class="w-1/2 p-4">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white mb-4 text-center">Vista previa</DialogTitle>
                                    <div class="flex items-center justify-center w-full pt-2">
                                        <Avatar 
                                        :size="232"
                                        :src="previewImageUrl || mainStore.$state.user?.picture_url"
                                        color="white"
                                        :username="mainStore.$state.user?.username"
                                        class="cursor-pointer w-1/2"
                                    />
                                    </div>
                                </div>
                            </div>
                            <!-- Bloque de Abajo Full Width -->
                            <div class="w-full flex flex-col items-center">
                                <div class="flex justify-center pb-4">
                                    <p v-if="Object.keys(errors).length > 0" class="text-xs text-red-600 mt-2">{{ errors }}</p>
                                </div>
                                <button @click="uploadPhoto" class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:text-black hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                    Actualizar foto
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
import Avatar from 'vue-avatar/src/Avatar.vue';
import apiClient from '@/services/api.js';

const isOpen = ref<boolean>(true);
const emits = defineEmits(['close']);
function closeModal(): void { 
    isOpen.value = false;
    setTimeout(() => { emits('close'); }, 300);
};

const mainStore = useMainStore();

interface PhotoFile { file: File | null;}
interface Errors { [key: string]: string; }

const photoFile = ref<PhotoFile>({ file: null });
const errors = ref<Errors>({});
const previewImageUrl = ref<string | null>(null);

function handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        photoFile.value.file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
                previewImageUrl.value = e.target.result;
            }
        };
        reader.readAsDataURL(photoFile.value.file);
    }
}

async function uploadPhoto(): Promise<void> {
    errors.value = {};

    try {
        if(!photoFile.value.file?.name) {
            console.log("No hay foto seleccionada");
            return;
        }

        mainStore.verifyTokenValidity();

        const response = await apiClient.patch(`/user/${mainStore.$state.user?.id}/upload`, photoFile.value, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${mainStore.$state.token}`
        }
        });

        mainStore.$state.user = response.data.userWithId;
        closeModal();

    } catch (error: any) {
        console.log(error)
        errors.value = error.response.data.error;
    }
}
</script>