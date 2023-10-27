<template>
    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Todas las canciones
        </h1>

        <div class="pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard
            v-for="song in systemSongs"
            :song="song"/>
        </div>
    </div>
</template>


<script setup lang="ts">
import SongCard from '@/components/SongCard.vue';
import { fetchSongs } from '@/api';
import { onMounted, ref } from 'vue';
import { Song } from '@/interfaces';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const systemSongs = ref<Song[]>([]);

onMounted(async () => {
    try {
    const response = await fetchSongs('');
    systemSongs.value = response.songs;

    if(playerStore.currentSong === null) {
        playerStore.playSong(systemSongs.value[0]);
    }
    
    console.log(response);
    } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
    }
});
</script>