<script setup lang="ts">
import { ref } from 'vue';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Avatar from 'vue-avatar/src/Avatar.vue';
import Account from 'vue-material-design-icons/Account.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';

import LoginModal from '../components/LoginModal.vue';
import RegisterModal from '../components/RegisterModal.vue';

import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

let showRegisterModal = ref(false);
let showLoginModal = ref(false);

function openRegisterModal() {
    showRegisterModal.value = true;
}

function openLoginModal() {
    showLoginModal.value = true;
}
</script>

<template>
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    <div 
        id="TopNav"
        class="
        w-[calc(100%-256px)] 
        h-[60px] 
        fixed 
        right-4 
        z-50 
        bg-[#101010] 
        bg-opacity-80 
        flex 
        items-center 
        justify-between
        "
    >
        <div class="flex items-center ml-6">
            <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
                <ChevronLeft fillColor="#FFFFFF" :size="30" />
            </button>
            <button type="button" class="rounded-full bg-black p-[1px] hover:bg-[#] ml-4 cursor-pointer">
                <ChevronRight fillColor="#FFFFFF" :size="30" />
            </button>
        </div>

        <Menu as="div" class="relative inline-block text-left mr-5">
            <div>
                <MenuButton
                class="flex items-center h-10 gap-1 rounded-full bg-black bg-opacity-20 
                text-sm font-medium text-white hover:bg-[#282828] cursor-pointer"
                >
                <avatar 
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
                bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button
                        @click="openLoginModal"
                        :class="[
                        active ? 'bg-[#3E3D3D] text-white' : 'text-gray-400',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
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
                        active ? 'bg-[#3E3D3D] text-white' : 'text-gray-400',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
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
    </div>
</template>