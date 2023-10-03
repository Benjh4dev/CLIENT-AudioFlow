<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import MenuItem from '../components/MenuItem.vue';
</script>

<template>
    <div class="flex flex-col h-screen">
        <div id="UserOptions" class="h-[50%] pl-6 w-[240px] bg-black">
            <RouterLink to="/">
                <img width="125" src="/images/icons/audioflow-logo.png" class="pl-10 ml-2 mt-14">
            </RouterLink>
            <div class="my-8 pt-1"></div>
            <ul>
                <RouterLink to="/">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Inicio" iconString="home" pageUrl="/" />
                </RouterLink>
                <RouterLink to="/search">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Buscar" iconString="search" pageUrl="/search" />
                </RouterLink>
                <RouterLink to="/library">
                    <MenuItem class="ml-[1px]" :iconSize="26" name="Tus canciones" iconString="library" pageUrl="/library" />
                </RouterLink>
                <div class="border-b border-b-gray-700 mt-1"></div>
                <div class="my-4">
                    <MenuItem :iconSize="24" name="Crear Playlist" iconString="playlist" pageUrl="/playlist" />
                    <MenuItem :iconSize="24" name="Subir Canción" iconString="playlist" pageUrl="/liked" class="pb-0"/>
                </div>
                <div class="border-b border-b-gray-700"></div>
            </ul>
        </div>
        <div id="UserPlaylists" class="h-[50%] pl-6 w-[240px] bg-black">
            <span class="text-white">Mis playlists</span>
                <ul>
                    <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">Mi Playlist #1</li>
                    <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">Mi Playlist #2</li>
                    <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">Mi Playlist #3</li>
                    <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">Mi Playlist #4</li>
                </ul>
        </div>
    </div>
</template>