<template>
  <TopNav></TopNav>
  <Sidebar></Sidebar>

  <div
  class="
      fixed
      right-0
      top-0
      w-[calc(100%-240px)]
      overflow-auto
      h-full
      bg-gradient-to-b
      from-[#1C1C1C]
      to-black
      "
      >
      <div class="mt-[60px]"></div>
      <RouterView />
      <div class="mb-[90px]"></div>
  </div>
      
  <MusicPlayer v-if="currentTrack"/>
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