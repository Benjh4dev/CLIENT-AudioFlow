<template>
    <div class="flex flex-col h-screen p-3 bg-black gap-2">

        <div id="NavigationOptions" class="pl-4 w-[240px] bg-[#121212] rounded-lg">
            <RouterLink to="/"  class="flex items-center mt-10">
                <img src="/images/icons/audioflow-logo-nombre.png" class="w-[80%] ml-2.5">
            </RouterLink>
            
            <div class="my-14"></div>
            <ul>
                <RouterLink to="/">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Inicio" iconString="home" pageUrl="/" />
                </RouterLink>
                <RouterLink to="/search">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Buscar" iconString="search" pageUrl="/search" />
                </RouterLink>
                <RouterLink to="/profile" v-if="mainStore.$state.token">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Mis canciones" iconString="library" pageUrl="/library" />
                </RouterLink>
            </ul>
        </div>

        <div id="UserOptions" class="pl-6 w-[240px] bg-[#121212] rounded-lg">
            <h2 v-if="!mainStore.$state.token" class="text-white mt-14 mb-14">¡Inicia sesión para más funcionalidades!</h2>
            <div v-if="mainStore.$state.token">
                <div class="mt-4">
                    <MenuItem :iconSize="24" name="Crear Playlist" iconString="playlist" pageUrl="/playlist" />
                    <MenuItem :iconSize="24" name="Subir Canción" iconString="upload" pageUrl="/addsong" class="ml-[1px]"/>
                </div>
            </div>
        </div>

        <div id="UserPlaylists" class="h-[40%] pl-6 w-[240px] bg-[#121212] rounded-lg">
            <div v-if="mainStore.$state.token"></div>
                <ul v-if="mainStore.$state.token" class="mt-6">
                    <li class="font-semibold text-[15px] mt-3 text-gray-300 hover:text-white">Tu Playlist #1</li>
                    <li class="font-semibold text-[15px] mt-3 text-gray-300 hover:text-white">Tu Playlist #2</li>
                    <li class="font-semibold text-[15px] mt-3 text-gray-300 hover:text-white">Tu Playlist #3</li>
                    <li class="font-semibold text-[15px] mt-3 text-gray-300 hover:text-white">Tu Playlist #4</li>
                </ul>
        </div>

    </div>
</template>

<script setup lang="js">    
import { RouterLink } from 'vue-router'
import MenuItem from '../components/MenuItem.vue';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
</script>