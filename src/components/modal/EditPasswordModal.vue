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
                    placeholder="contraseña actual"
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
                    placeholder="nueva contraseña"
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
                    placeholder="confirma contraseña"
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
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { ref, defineEmits } from 'vue';
import { useMainStore } from '@/stores/main';
import { changePassword as changeUserPassword } from '@/api/user';
import { mapZodErrors } from '@/utils/utils';
import { ChangePasswordForm, FormErrors } from '@/interfaces'
import { showSuccessToast, showErrorToast } from '@/utils/toast';

const mainStore = useMainStore();

const isOpen = ref<boolean>(true);
const emits = defineEmits(['close']);
const errors = ref<FormErrors>({});
const formData = ref<ChangePasswordForm>({
  currentPassword: '',
  password: '',
  confirmPassword: ''
});

function closeModal(): void {
  isOpen.value = false;
  setTimeout(() => { emits('close'); }, 300);
}

async function submitForm(): Promise<void> {
  errors.value = {};

  try {
    await changeUserPassword(formData.value);
    closeModal();
    showSuccessToast("Contraseña actualizada con éxito", 2000);
    setTimeout(() => { mainStore.logoutUser(); }, 2000);
  
  } catch (error: any) {
      if (error.response && error.response.data.error) {
        const mappedErrors = await mapZodErrors(error)
        errors.value = mappedErrors;
      }
    }
}
</script>