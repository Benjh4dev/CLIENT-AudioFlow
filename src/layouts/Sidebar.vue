<template>
    <UploadSongModal v-if="showUploadSongModal" @close="showUploadSongModal = false"></UploadSongModal>
    <CreatePlaylistModal v-if="showCreatePlaylistModal" @close="showCreatePlaylistModal = false"></CreatePlaylistModal>

    <div class="bg-black w-[80px] md:w-[223px] lg:w-[22%] flex flex-col flex-shrink-0 rounded-lg gap-2">
        <div id="Navigation" class="h-[108px] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-2 gap-y-9">
                <ul class="p-1.5">
                    <SidebarItem
                        pageUrl="/"
                        iconUrl="/images/icons/home-icon.png" 
                        message="Inicio" 
                        ml="ml-[19px]" mt="mt-[10px]" w="w-7" h="h-7" 
                        pl="pl-[16px]" pt="pt-[10px]">
                    </SidebarItem>
                    <SidebarItem
                        pageUrl="/search"
                        iconUrl="/images/icons/search-icon.png" 
                        message="Buscar" 
                        ml="ml-[19px]" mt="mt-[10px]" w="w-7" h="h-7" 
                        pl="pl-[16px]" pt="pt-[8px]">
                    </SidebarItem>
                </ul>
            </div>
        </div>
        <div v-if="mainStore.$state.token" id="Actions" class="h-[108px] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-2 gap-y-9">
                <ul class="p-1.5">
                    <button 
                        @click="openUploadSongModal"
                        class="w-[67px] md:w-[100%] flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg">
                        <SidebarItem 
                            iconUrl="/images/icons/upload-icon.png" 
                            message="Subir Canción" 
                            ml="ml-[17px]" mt="mt-[10px]" w="w-8" h="h-8" 
                            pl="pl-[16px]" pt="pt-[10px]">
                        </SidebarItem>
                    </button>
                    <button
                        @click="openCreatePlaylistModal"
                        class="w-[67px] md:w-[100%] flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg">
                        <SidebarItem 
                            iconUrl="/images/icons/playlist-icon.png" 
                            message="Crear Playlist" 
                            ml="ml-[18px]" mt="mt-[8px]" w="w-8" h="h-8" 
                            pl="pl-[16px]" pt="pt-[8px]">
                        </SidebarItem>
                    </button>
                </ul>
            </div>
        </div>

        <div v-if="mainStore.$state.token" id="Playlists" class="h-screen overflow-y-hidden overflow-x-hidden hover:overflow-y-auto bg-[#121212] rounded-lg">
            <!-- <div class="grid grid-rows-1">
                <ul class="p-1.5">
                    <SidebarItem 
                        iconUrl="/images/icons/library-icon.png" 
                        message="Librería" 
                        ml="ml-[20px]" mt="mt-[12px]" w="w-7" h="h-7" 
                        pl="pl-[20px]" pt="pt-[12px]">
                    </SidebarItem>
                </ul>
            </div> -->
            <div class="grid grid-rows gap-y-9 bg-[#121212] rounded-lg">
                <ul class="p-1.5">
                    <PlaylistItem v-for="playlist in mainStore.playlists" :playlist="playlist"></PlaylistItem>
                </ul>
            </div>
        </div>

        <div v-if="!mainStore.$state.token" id="Guest" class="h-[100%] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-2 gap-y-9">
                <ul class="p-1.5">
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">    
import { ref } from 'vue';

import { useMainStore } from '@/stores/main';

import PlaylistItem from '@/components/PlaylistItem.vue';
import SidebarItem from '@/components/SidebarItem.vue';
import UploadSongModal from '@/components/modal/UploadSongModal.vue';
import CreatePlaylistModal from '@/components/modal/CreatePlaylistModal.vue';

let showUploadSongModal = ref(false);
let showCreatePlaylistModal = ref(false);

function openUploadSongModal() {
    mainStore.verifyTokenValidity()
    showUploadSongModal.value = true
}

function openCreatePlaylistModal() {
    mainStore.verifyTokenValidity()
    showCreatePlaylistModal.value = true
}

const mainStore = useMainStore();
</script>


<style>
/* Personalización de la barra de desplazamiento */
#Playlists::-webkit-scrollbar {
    width: 8px;
}

#Playlists::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6); /* Color de la barra de desplazamiento */
    border-radius: 4px; /* Bordes redondeados */
}

#Playlists::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8); /* Color de la barra al hacer hover */
}
</style>