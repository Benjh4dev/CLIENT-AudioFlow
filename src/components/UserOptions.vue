<template>
    <ChangePasswordModal v-if="showChangePasswordModal" @close="showChangePasswordModal = false"/>
    <Menu as="div" class="relative inline-block text-left mr-5">
        <div>
            <MenuButton
            class="flex items-center h-10 gap-1 rounded-full bg-black bg-opacity-20 
            text-sm font-medium text-white hover:bg-[#282828] cursor-pointer"
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
            bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
            <div class="px-1 py-1">
                <RouterLink to="/profile">
                <MenuItem v-slot="{ active } " pageUrl="/profile">
                <button
                    @click="mainStore.verifyTokenValidity()"
                    :class="[
                    active ? 'bg-[#3E3D3D] text-white' : 'text-gray-400',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                >
                    Mi perfil
                    <AccountBox class="ml-3 pl-10"/>
                </button>
                </MenuItem>
                </RouterLink>

                
                <MenuItem v-slot="{ active } " >
                <button
                    @click="mainStore.verifyTokenValidity(), openChangePasswordModal()"
                    :class="[
                    active ? 'bg-[#3E3D3D] text-white' : 'text-gray-400',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"

                >
                    Contraseña
                    <ShieldEdit class="ml-3 pl-5"/>
                </button>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                <button
                    @click="mainStore.logoutUser()"
                    :class="[
                    active ? 'bg-red-950 text-white' : 'text-gray-400',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
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
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Avatar from 'vue-avatar/src/Avatar.vue';
import AccountRemove from 'vue-material-design-icons/AccountRemove.vue';
import AccountBox from 'vue-material-design-icons/AccountBox.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import { useMainStore } from '@/stores/main';
import ChangePasswordModal from '@/components/ChangePasswordModal.vue';
import { ref } from 'vue';
import ShieldEdit from 'vue-material-design-icons/ShieldEdit.vue';

let showChangePasswordModal = ref(false)
function openChangePasswordModal() {
    showChangePasswordModal.value = true
}

const mainStore = useMainStore();
</script>