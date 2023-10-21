<template>
    <div class="flex flex-col flex-shrink-0 h-[850px] w-[80px] md:w-[223px] lg:w-[22%] bg-black rounded-lg gap-2">
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
                    <SidebarItem 
                        iconUrl="/images/icons/upload-icon.png" 
                        message="Subir Canción" 
                        ml="ml-[17px]" mt="mt-[10px]" w="w-8" h="h-8" 
                        pl="pl-[16px]" pt="pt-[10px]">
                    </SidebarItem>
                    <SidebarItem 
                        iconUrl="/images/icons/playlist-icon.png" 
                        message="Crear Playlist" 
                        ml="ml-[18px]" mt="mt-[8px]" w="w-8" h="h-8" 
                        pl="pl-[16px]" pt="pt-[8px]">
                    </SidebarItem>
                </ul>
            </div>
        </div>

        <div v-if="mainStore.$state.token" id="Playlists" class="h-[100%] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-1">
                <ul class="p-1.5">
                    <SidebarItem 
                        iconUrl="/images/icons/library-icon.png" 
                        message="Librería" 
                        ml="ml-[20px]" mt="mt-[12px]" w="w-7" h="h-7" 
                        pl="pl-[20px]" pt="pt-[12px]">
                    </SidebarItem>
                </ul>
            </div>
            <div class="grid grid-rows gap-y-9 bg-[#121212] rounded-lg">
                <ul class="p-1.5">
                    <PlaylistItem imageUrl="/images/albumCovers/DiariesOfAHero.png" playlistName="Playlist 1#" creatorName="Carlo Ignacio"></PlaylistItem>
                    <PlaylistItem imageUrl="https://picsum.photos/id/40/300/300" playlistName="Playlist 2#" creatorName="Carlo Ignacio"></PlaylistItem>
                    <PlaylistItem imageUrl="https://picsum.photos/id/45/300/300" playlistName="Playlist 3#" creatorName="Carlo Ignacio"></PlaylistItem>
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
import PlaylistItem from '@/components/PlaylistItem.vue';
import SidebarItem from '@/components/SidebarItem.vue';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
</script>