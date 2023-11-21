<template>
  <div class="bg-black p-2 flex h-[86vh] sm:h-[86vh] xl:h-[89vh]">
    <Sidebar></Sidebar>

    <div class="bg-[#121212] text-white w-[100vw] ml-2 rounded-lg overflow-auto" id="ViewBlock">
      <TopNav></TopNav>
      <RouterView />
    </div>
        
  </div>
  <footer class="bg-black h-[14vh] sm:h-[14vh] xl:h-[11vh]">
    <MusicPlayer v-if="player.currentSong"/>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TopNav from '@/layouts/TopNav.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import MusicPlayer from '@/layouts/MusicPlayer.vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore();
const player = playerStore.player;

onMounted(() => { player.isPlaying = false })
</script>


<style>
/* Personalización de la barra de desplazamiento */
#ViewBlock::-webkit-scrollbar {
    width: 12px;
}

#ViewBlock::-webkit-scrollbar-track {
    background-color: rgb(40, 40, 40); /* Fondo transparente del scrollbar */
}

#ViewBlock::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6); /* Color de la barra de desplazamiento */
    border-radius: 8px; /* Bordes redondeados */
}

#ViewBlock::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8); /* Color de la barra al hacer hover */
}
</style>