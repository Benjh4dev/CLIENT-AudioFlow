<template>
    <EditPasswordModal v-if="showEditPasswordModal" @close="showEditPasswordModal = false"/>
    <Menu as="div" class="relative inline-block text-left mr-6">
        <div>
            <MenuButton
            class="flex items-center h-10 gap-1 rounded-full bg-[#282828] bg-opacity-20 
            text-sm font-medium text-white hover:bg-gray-900 cursor-pointer"
            >
            <avatar 
            :size="25"
            color="white"
            :username="mainStore.$state.user?.username"
            :src="mainStore.$state.user?.picture_url"
            class="m-1"
            />
            {{ mainStore.$state.user?.username }}
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
            class="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md 
            bg-black shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="px-1 py-1">
                    <RouterLink to="/profile">
                    <MenuItem v-slot="{ active } " pageUrl="/profile">
                    <button
                        @click="mainStore.verifyTokenValidity()"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm border-b border-gray-700',
                        ]"
                    >
                        Mi perfil
                        <AccountBox class="ml-3 pl-10"/>
                    </button>
                    </MenuItem>
                    </RouterLink>

                    
                    <MenuItem v-slot="{ active } " >
                    <button
                        @click="openChangePasswordModal()"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm border-b border-gray-700',
                        ]"

                    >
                        Contraseña
                        <ShieldEdit class="ml-3 pl-5"/>
                    </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                    <button
                        @click="logoutUser()"
                        :class="[
                        active ? 'bg-red-950 text-white' : 'text-gray-300',
                        'group flex w-full items-center     px-2 py-2 text-sm',
                        ]"
                    >
                        Cerrar sesión
                        <AccountRemove class="ml-3 pl-2"/>
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import Avatar from 'vue-avatar/src/Avatar.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import AccountBox from 'vue-material-design-icons/AccountBox.vue';
import ShieldEdit from 'vue-material-design-icons/ShieldEdit.vue';
import AccountRemove from 'vue-material-design-icons/AccountRemove.vue';

import EditPasswordModal from '@/components/modal/EditPasswordModal.vue';

import { useMainStore } from '@/stores/main';
import { usePlayerStore } from '@/stores/player';
import { showErrorToast } from '@/utils/toast';

import { togglePlay as togglePlayFS, updateCurrentTime } from '@/firestore';

const mainStore = useMainStore();
const playerStore = usePlayerStore();

let showEditPasswordModal = ref(false);

function openChangePasswordModal() {
    mainStore.verifyTokenValidity()
    showEditPasswordModal.value = true
}

const logoutUser = () => {
    togglePlayFS(playerStore.player.id, false);
    updateCurrentTime(playerStore.player.id, playerStore.player.currentTime);
    
    showErrorToast("Cerrando sesión...", 2000);
    setTimeout(() => {
        playerStore.destorePlayer();
        mainStore.logoutUser();
    }, 2000);
}
</script>