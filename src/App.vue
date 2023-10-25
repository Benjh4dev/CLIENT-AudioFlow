<template>
  <div class="bg-black p-2 flex h-[86vh] sm:h-[86vh] xl:h-[89vh]">
    <Sidebar></Sidebar>

    <div class="bg-[#121212] text-white w-[100vw] ml-2 rounded-lg overflow-auto">
      <TopNav></TopNav>
      <RouterView />
    </div>
        
  </div>
  <footer class="bg-black h-[14vh] sm:h-[14vh] xl:h-[11vh]">
    <MusicPlayer v-if="currentSong"/>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MusicPlayer from './components/MusicPlayer.vue'

import { usePlayerStore } from './stores/player'
import { storeToRefs } from 'pinia';

import TopNav from './layouts/TopNav.vue';
import Sidebar from './layouts/Sidebar.vue';

const playerStore = usePlayerStore();
const { currentSong } = storeToRefs(playerStore)

onMounted(() => { playerStore.isPlaying = false })
</script>