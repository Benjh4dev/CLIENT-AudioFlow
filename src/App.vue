<template>
  <div class="bg-black p-2 flex">
    
    <!-- <TopNav></TopNav> -->
    <Sidebar></Sidebar>
  
    <div
    class="
        text-white
        w-[100%]
        ml-2
        rounded-lg
        overflow-auto
        h-[850px]
        bg-[#121212]
        "
        >
        TOPBAR AQUI
        <RouterView />
        <div class="right-0 w-[88%] text-white">
        </div>
        <div class="mb-[90px]"></div>
    </div>
        
    <MusicPlayer v-if="currentTrack"/>
  </div>
  <footer class="text-white bg-black h-[89px]">
    Reproductor
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MusicPlayer from './components/MusicPlayer.vue'

import { useSongStore } from './stores/song.js'
import { storeToRefs } from 'pinia';

import TopNav from './layouts/TopNav.vue';
import Sidebar from './layouts/Sidebar.vue';

const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

onMounted(() => { isPlaying.value = false })
</script>