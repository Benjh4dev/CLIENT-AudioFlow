<template>
    <div class="p-8">

        <h1 class="text-white text-2xl font-semibold pl-1">Busca lo que te apetezca...</h1>
        <div class="bg-[#313030] rounded-full p-2 w-[280px] mt-4 sm:w-[400px]">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 pt-0.5 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0,0,256,256">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path></g></g>
                    </svg>
                </div>
            <input
                v-model="searchTerm"
                @input="handleSearch"
                class="bg-transparent text-white w-full pl-10 pr-4 outline-none"
                placeholder="¿Qué quieres escuchar?"
            />
            </div>
        </div>
        <div class="mt-6 flex space-x-4 transition-all duration-300 ease-in-out">
            <button
                :class="{'bg-[#282828] text-white': activeFilter === 'songs', 'bg-black text-white': activeFilter !== 'songs'}"
                @click="setActiveFilter('songs')"
                class="px-3 py-1 rounded-full transition-all duration-300 ease-in-out"
            >
                Artista/Canción
            </button>
            <button
                :class="{'bg-[#282828] text-white': activeFilter === 'playlists', 'bg-black text-white': activeFilter !== 'playlists'}"
                @click="setActiveFilter('playlists')"
                class="px-3 py-1 rounded-full transition-all duration-300 ease-in-out"
            >
                Playlist
            </button>
        </div>

        <div class="py-6"></div>
        <div v-if="activeFilter == 'songs'">
            <h1 v-if="searchTerm" class="text-white text-2xl font-semibold pl-2">Tu búsqueda...</h1>
            <h1 v-else class="text-white text-2xl font-semibold pl-2">Últimas canciones</h1>

            <div class="pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12">
                <SongCard
                v-if="!searchTerm"
                v-for="song in systemSongs"
                :song="song"/>
                <SongCard
                v-else
                v-for="song in searchResults"
                :song="song"/>
            </div>
        </div>

        <div v-if="activeFilter == 'playlists'">
            <h1 v-if="searchTerm" class="text-white text-2xl font-semibold pl-2">Tu búsqueda...</h1>
            <h1 v-else class="text-white text-2xl font-semibold pl-2">Últimas playlists</h1>

            <div class="gap-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-8 pl-2">
                <PlaylistCard name="Playlist #1" image="https://picsum.photos/id/40/300/300"/>
                <PlaylistCard name="Playlist #2" image="https://picsum.photos/id/45/300/300"/>
                <PlaylistCard name="Playlist #3" image="https://picsum.photos/id/76/300/300"/>
                <PlaylistCard name="Playlist #4" image="https://picsum.photos/id/56/300/300"/>
                <PlaylistCard name="Playlist #5" image="https://picsum.photos/id/25/300/300"/>
                <PlaylistCard name="Playlist #6" image="https://picsum.photos/id/103/300/300"/>
                <PlaylistCard name="Playlist #7" image="https://picsum.photos/id/101/300/300"/>
                <PlaylistCard name="Playlist #8" image="https://picsum.photos/id/120/300/300"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongCard from '@/components/SongCard.vue';
import PlaylistCard from '@/components/PlaylistCard.vue';

import { ref, defineEmits, onMounted } from 'vue';
import { fetchSongs } from '@/api';
import { Song } from '@/interfaces';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const systemSongs = ref<Song[]>([]);

const searchTerm = ref('');
const activeFilter = ref('songs');

const emit = defineEmits(['search']);

let searchResults = ref<Song[]>([]);

const handleSearch = () => {
    searchResults.value = systemSongs.value.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.value.toLowerCase())
    );

    setTimeout(() => {
    emit('search', { searchTerm: searchTerm.value, activeFilter: activeFilter.value });
  }, 1000);
};

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter;
  handleSearch();
};

onMounted(async () => {
  try {
    const response = await fetchSongs('');
    systemSongs.value = response.songs;

    if (playerStore.currentSong === null) {
      playerStore.playSong(systemSongs.value[0]);
    }
  } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
  }
});
</script>