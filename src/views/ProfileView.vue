<template>
    <EditEmailModal v-if="showEditEmailModal" @close="showEditEmailModal = false"/>
    <ChangeUserPhotoModal v-if="showChangeUserPhotoModal" @close="showChangeUserPhotoModal = false"/>
    <div class="pl-8 pt-4 bg-gradient-to-b from-[#5A7D8E] to-[#2E3F4D] ml-3 rounded-lg w-[97.5%]">
        <div class="flex">
            <div class="relative group hover:bg-opacity-50 cursor-pointer" @mouseover="showPencil = true" @mouseleave="showPencil = false">
                <button @click="openChangeUserPhotoModal">
                    <Avatar 
                    :size="232"
                    color="white"
                    :src="mainStore.$state.user?.picture_url"
                    :username="mainStore.$state.user?.username"
                    class="m-1 hover:opacity-50 shadow-2xl cursor-pointer"
                    />
                    <p v-if="showPencil" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold pointer-events-none">
                        <Pencil class="text-black" :size="46"/>
                    </p>
                </button>
            </div>
            
            <div class="block mt-16 ml-5">
                <h1 class="text-white text-sm text-bold">Perfil</h1>
                <h1 class="text-white text-7xl font-extrabold">{{ mainStore.$state.user?.username }}</h1>
                <div class="flex mt-4">
                    <h6 class="text-white text-bold">{{ mainStore.$state.user?.email }}</h6>
                    <button class="ml-2 " @click="openEditUserModal">
                        <Pencil class="text-white hover:text-gray-950" :size="20"/>
                    </button>
                </div>
                
                <h6 class="text-white mt-7 text-bold">0 Playlists • 0 Canciones </h6>
            </div>
        </div>

        <div class="py-1.5"></div>
    </div>
    <div>
        <h1 class="p-8 text-white text-xl font-bold">Tus canciones</h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import Avatar from 'vue-avatar/src/Avatar.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';
import EditEmailModal from '../components/EditEmailModal.vue';
import ChangeUserPhotoModal from '@/components/ChangeUserPhotoModal.vue';

const mainStore = useMainStore();
const showPencil = ref(false);

let showEditEmailModal = ref(false);
function openEditUserModal() {
    showEditEmailModal.value = true;
}

let showChangeUserPhotoModal = ref(false);
function openChangeUserPhotoModal() {
    showChangeUserPhotoModal.value = true;
}
</script>