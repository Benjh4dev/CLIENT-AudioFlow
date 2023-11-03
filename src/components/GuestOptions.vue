<template>
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />

    <Menu as="div" class="relative inline-block text-left mr-6">
        <div>
            <MenuButton
            class="flex items-center h-10 gap-1 rounded-full bg-[#282828] bg-opacity-40 
            text-sm font-medium text-white hover:bg-gray-900 cursor-pointer"
            >
            <Avatar 
            :size="25"
            color="white"
            username="username"
            class="m-1"
            />
            Usuario Invitado
            <ChevronDown class="pl-1"/>
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
            class="absolute right-0 mt-2 w-38 origin-top-right divide-y divide-gray-100 rounded-md 
            bg-black shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button
                        @click="openLoginModal"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm border-b border-gray-700',
                        ]"
                    >
                        Iniciar sesión
                        <Account class="ml-3 pl-2"/>
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button
                        @click="openRegisterModal"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm',
                        ]"
                    >
                        Registrarse
                        <AccountPlus class="ml-3 pl-4"/>
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import Account from 'vue-material-design-icons/Account.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import Avatar from 'vue-avatar/src/Avatar.vue';

import LoginModal from '../components/LoginModal.vue';
import RegisterModal from '../components/RegisterModal.vue';

let showRegisterModal = ref(false);
let showLoginModal = ref(false);

function openRegisterModal() {
    showRegisterModal.value = true;
}

function openLoginModal() {
    showLoginModal.value = true;
}
</script>