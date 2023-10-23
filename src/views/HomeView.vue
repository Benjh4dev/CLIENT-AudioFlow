<template>
    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Tus canciones
        </h1>

        <div class="pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard 
                v-for="song in systemSongs" 
                :key="song.id" 
                :coverURL="song.coverURL" 
                :name="song.name" 
                :artist="song.artist" 
                :audioURL="song.audioURL"
            />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recientemente añadidas
        </h1>
        <div class="py-2"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard coverURL="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recomendados
        </h1>
        <div class="py-2"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard coverURL="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard coverURL="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>
</template>


<script setup lang="ts">
import SongCard from '@/components/SongCard.vue';
import { fetchSongs } from '@/api';
import { onMounted, ref } from 'vue';
import { Song } from '@/interfaces';

const systemSongs = ref<Song[]>([]);

onMounted(async () => {
      try {
        const response = await fetchSongs();
        systemSongs.value = response;
        console.log(response);
      } catch (error) {
        console.error('Hubo un error al hacer fetch:', error);
      }
    });
</script>