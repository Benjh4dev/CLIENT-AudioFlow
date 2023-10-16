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
              <DialogPanel class="flex w-full max-w-2xl transform overflow-hidden rounded-2xl bg-black p-6 shadow-xl transition-all">
                
                <!-- Bloque Izquierdo -->
                <div class="w-1/2 pr-4">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white mb-4">¡Cambia tu contraseña!</DialogTitle>
                  <form @submit.prevent="submitForm" class="mt-6">

                  <div class="mt-4">
                    <label for="currentPassword" class="block text-sm text-gray-400">Contraseña actual</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      name="currentPassword"
                      autocomplete="off"
                      v-model="formData.currentPassword"
                      class="w-[90%] h-10 my-2 py-3 px-4 block border-6 bg-gray-950 text-white border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm">
                    <p v-if="errors.currentPassword" class="text-xs text-red-600 mt-2">{{ errors.currentPassword[0] }}</p>
                  </div>

                  <div class="mt-4">
                    <label for="password" class="block text-sm text-gray-400">Nueva contraseña</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password"
                      autocomplete="off"
                      v-model="formData.password"
                      class="w-[90%] h-10 my-2 py-3 px-4 block border-6 bg-gray-950 text-white border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm">
                    <p v-if="errors.password" class="text-xs text-red-600 mt-2">{{ errors.password[0] }}</p>
                  </div>

                  <div class="mt-4">
                    <label for="confirmPassword" class="block text-sm text-gray-400">Confirmar nueva contraseña</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      autocomplete="off"
                      v-model="formData.confirmPassword"
                      class="w-[90%] h-10 my-2 py-3 px-4 block border-6 bg-gray-950 text-white border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm">
                    <p v-if="errors.confirmPassword" class="text-xs text-red-600 mt-2">{{ errors.confirmPassword[0] }}</p>
                  </div>

                  <div class="mt-8 flex justify-center pr-8">
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:text-black hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Actualizar
                    </button>
                  </div>

                </form>
                </div>
                
                <!-- Bloque Derecho -->
                <div class="w-1/2 flex items-center justify-center">
                  <img src="/images/icons/audioflow-logo.png" alt="Icono de AudioFlow" class="w-1/2">
                </div>
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import apiClient from '@/services/api.js';
import { useMainStore } from '@/stores/main';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

const isOpen = ref<boolean>(true);
const emits = defineEmits(['close']);
const mainStore = useMainStore();
function closeModal(): void {
  isOpen.value = false;
  setTimeout(() => {
    emits('close');
  }, 300);
}

interface FormData {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

interface Errors {
    [key: string]: string;
}

const errors = ref<Errors>({});

const formData = ref<FormData>({
    currentPassword: '',
    password: '',
    confirmPassword: ''
});

async function submitForm(): Promise<void> {
  errors.value = {};
  //isLoading() ---> ref
  try {
    const response = await apiClient.patch(`/user/${mainStore.$state.user?.id}/changePassword`, formData.value, {
      headers: {
        'Authorization': `Bearer ${mainStore.$state.token}`
      }
    });
    closeModal();
    mainStore.logoutUser();

  } catch (error: any) {
      if (error.response && error.response.data.error) {
        const zodErrors = error.response.data.error.issues;
        const mappedErrors: Record<string, any> = {};
        zodErrors.forEach((err: any) => {
          const fieldName = err.path[0];
          
          if (!mappedErrors[fieldName]) {
            mappedErrors[fieldName] = [];
          }
          mappedErrors[fieldName].push(err.message);
          });
          errors.value = mappedErrors;
      }
    }
}



</script>