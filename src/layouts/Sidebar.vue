<template>
    <div class="flex flex-col flex-shrink-0 h-[850px] w-[80px] md:w-[223px] lg:w-[22%] bg-black rounded-lg gap-2">

        <div id="Navigation" class="h-[108px] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-2 gap-y-9 ">
                <ul class="p-1.5">
                    <RouterLink to="/" class="flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="public\images\icons\home-icon.png" alt="" class="ml-[19px] mt-[10px] w-7 h-7">
                        <h1 class="pl-[16px] pt-[10px] text-lg font-semibold opacity-0 md:opacity-100" :class="textIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'">Inicio</h1>
                    </RouterLink>
                    <RouterLink to="/" class="flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="public\images\icons\search-icon.png" alt="" class="ml-[19px] mt-[10px] w-7 h-7">
                        <h1 class="pl-[16px] pt-[8px] text-lg font-semibold opacity-0 md:opacity-100" :class="textIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'">Buscar</h1>
                    </RouterLink>
                </ul>
            </div>
        </div>
        <div id="Actions" class="h-[108px] bg-[#121212] rounded-lg">
            <div class="grid grid-rows-2 gap-y-9">
                <ul class="p-1.5">
                    <RouterLink to="/profile" class="flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg">
                        <img src="public\images\icons\upload-icon.png" alt="" class="ml-[17px] mt-[10px] w-8 h-8">
                        <h1 class="pl-[16px] pt-[10px] text-lg font-semibold opacity-0 md:opacity-100" :class="textIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'">Subir canción</h1>
                    </RouterLink>
                    <RouterLink to="/profile" class="flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg">
                        <img src="public\images\icons\playlist-icon.png" alt="" class="ml-[18px] mt-[8px] w-8 h-8">
                        <h1 class="pl-[16px] pt-[8px] text-lg font-semibold opacity-0 md:opacity-100" :class="textIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'">Crear playlist</h1>
                    </RouterLink>
                </ul>
            </div>
        </div>

        <div id="Playlists" class="h-screen bg-[#121212] rounded-lg">
            <div class="grid grid-rows-1">
                <ul class="p-1.5">
                    <RouterLink to="/profile" class="flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg">
                        <img src="public\images\icons\library-icon.png" alt="" class="ml-[20px] mt-[12px] w-7 h-7">
                        <h1 class="pl-[20px] pt-[12px] text-lg font-semibold opacity-0 md:opacity-100" :class="textIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'">Librería</h1>
                    </RouterLink>
                </ul>
            </div>
            <div class="grid grid-rows gap-y-9 bg-[#121212] rounded-lg">
                <ul class="p-1.5">
                    <RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="public\images\albumCovers\DiariesOfAHero.png" alt="" class="w-16 h-16 rounded-lg p-2">
                        <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
                            <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="textIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #1</h1>
                            <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
                        </div>
                    </RouterLink>
                    <RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="https://picsum.photos/id/40/300/300" alt="" class="w-16 h-16 rounded-lg p-2">
                        <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
                            <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="textIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #2</h1>
                            <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
                        </div>
                    </RouterLink>
                    <RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="https://picsum.photos/id/45/300/300" alt="" class="w-16 h-16 rounded-lg p-2">
                        <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
                            <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="textIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #3</h1>
                            <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
                        </div>
                    </RouterLink>
                    <RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="https://picsum.photos/id/76/300/300" alt="" class="w-16 h-16 rounded-lg p-2">
                        <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
                            <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="textIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #4</h1>
                            <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
                        </div>
                    </RouterLink>
                    <RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
                        <img src="https://picsum.photos/id/25/300/300" alt="" class="w-16 h-16 rounded-lg p-2">
                        <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
                            <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="textIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #5</h1>
                            <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
                        </div>
                    </RouterLink>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">    
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
let textIsHover = ref<boolean>(false);

function isHover() {
    textIsHover.value = !textIsHover.value;
}
</script>