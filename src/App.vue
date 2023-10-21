<template>
  <div class="bg-black p-2 flex min-h-[850px]">
    <Sidebar></Sidebar>

    <div class="bg-[#121212] text-white w-[100%] h-[850px] ml-2 rounded-lg overflow-auto">
      <TopNav></TopNav>
      <RouterView />
    </div>
        
  </div>
  <footer class="bg-black h-[89px]">
    <MusicPlayer v-if="currentTrack"/>
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