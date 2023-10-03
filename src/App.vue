<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RouterView } from 'vue-router'
  import MusicPlayer from './components/MusicPlayer.vue'

  import { useSongStore } from './stores/song'
  import { storeToRefs } from 'pinia';

  import TopNav from './layouts/TopNav.vue';
  import Sidebar from './layouts/Sidebar.vue';

  const useSong = useSongStore()
  const { isPlaying, currentTrack } = storeToRefs(useSong)

  onMounted(() => { isPlaying.value = false })

  let openMenu = ref(false)
</script>

<template>
    <div>
        <TopNav></TopNav>
        <Sidebar></Sidebar>
    </div>

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
        <div class="mt-[70px]"></div>
        <RouterView />
        <div class="mb-[100px]"></div>
    </div>

    <MusicPlayer v-if="currentTrack"/>
</template>