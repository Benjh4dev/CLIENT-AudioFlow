<template>
  <div class="bg-black p-2 flex">
    <Sidebar></Sidebar>

    <div class="bg-[#121212] text-white w-[100%] h-[850px] ml-2 rounded-lg overflow-auto">
      <TopNav></TopNav>
      <RouterView />
    </div>
        
  </div>
  <footer class="bg-black h-[89px]">
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