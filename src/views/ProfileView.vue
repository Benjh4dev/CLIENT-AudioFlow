<template>
    <EditEmailModal v-if="showEditEmailModal" @close="showEditEmailModal = false"/>
    <ChangeUserPhotoModal v-if="showChangeUserPhotoModal" @close="showChangeUserPhotoModal = false"/>
    <div class="pl-8 pt-1.5 bg-gradient-to-b from-[#505a88] to-[#2d373f]">
        <div class="flex pl-8 sm:p-0">
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
            
            <div class="mt-10 ml-5 opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out">
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
    </div>
    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Tus canciones
        </h1>
        <div class="py-2"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <!-- <SongCard coverURL="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import Avatar from 'vue-avatar/src/Avatar.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';
import EditEmailModal from '../components/EditEmailModal.vue';
import ChangeUserPhotoModal from '@/components/ChangeUserPhotoModal.vue';
import SongCard from '../components/SongCard.vue';

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