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

        <div class="py-6 transition-opacity duration-500" :class="{'opacity-100': !isFetching, 'opacity-0': isFetching}">
            <div v-if="activeFilter == 'songs'">
                <h1 v-if="searchTerm" class="text-white text-2xl font-semibold pl-2">Tu búsqueda...</h1>
                <h1 v-else class="text-white text-2xl font-semibold pl-2">Últimas canciones</h1>
    
                <div class="pt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-12">
                    <SongCard
                    v-if="!searchTerm"
                    v-for="song in mainStore.systemSongs"
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

        <div role="status" class="flex items-center justify-center h-[30vh] transition-opacity duration-300" :class="{'visible': isFetching, 'hidden': !isFetching}">
            <svg aria-hidden="true" class="w-40 h-40 text-gray-600 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import { Song } from '@/interfaces';

import SongCard from '@/components/SongCard.vue';
import PlaylistCard from '@/components/PlaylistCard.vue';

import { usePlayerStore } from '@/stores/player';
import { useMainStore } from '@/stores/main';

import { fetchSongs } from '@/api';
import { setSong } from '@/firestore';

const playerStore = usePlayerStore();
const mainStore = useMainStore();
const isFetching = ref(true);

const searchTerm = ref('');
const activeFilter = ref('songs');

const emit = defineEmits(['search']);

let searchResults = ref<Song[]>([]);

const handleSearch = () => {
    searchResults.value = mainStore.systemSongs.filter((song) =>
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

const getSongs = async () => {
    try {
        const response = await fetchSongs('');
        isFetching.value = false;
        mainStore.loadSongs(response.songs);

        if(playerStore.player?.currentSong === null || playerStore.player?.currentSong == undefined) {
            playerStore.player.currentSong = mainStore.systemSongs[0];
            if(mainStore.user) setSong(playerStore.player.id, mainStore.systemSongs[0]);
        }
        console.log(response);
    } catch (error) {
    console.error('Hubo un error al hacer fetch:', error);
    }
};

onMounted(async () => {
    mainStore.clearSystemSongs();
    getSongs();
});
</script>