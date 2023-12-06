<template>
    <div role="status" class="flex items-center justify-center h-[70vh] xl:h-[80vh] transition-opacity duration-300" :class="{'visible': isLoading, 'hidden': !isLoading}">
        <svg aria-hidden="true" class="w-40 h-40 text-gray-600 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    </div>

    <div class="p-8 overflow-x-hidden" :class="{'visible': !isLoading, 'hidden': isLoading}">
        <ConfirmationModal
        v-if="showConfirmationModal"
        @close="showConfirmationModal = false"
        @confirm="deletePlaylistAndCloseModal()"
        entityToDelete="playlist"
        />
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer ml-14 sm:ml-0"
        >

        </button>

        <div class="py-1.5"></div>
        <div class="flex items-center w-full relative h-full ml-20 sm:ml-0">
            <img width="140" src="/images/icons/defaultPlaylistImg.png" class="rounded-md" alt="Imagen de la playlist">  

            <div class="w-full ml-5">

                <div
                    v-if="playlist"
                    style="font-size: 33px;"
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld
                    opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out"
                >
                    {{ playlist.name }}
                </div>

                <div class="text-gray-300 text-[13px] flex opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out">
                    <div class="ml-1">
                    </div>
                    <div class="block">
                        <span v-if="playlist" class="hover:underline">
                            {{ playlist.username }}
                        </span>
                    </div>
                    <div class="text-gray-300 text-[13px] flex opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out">
                        <div class="ml-2 flex">
                            <div class="circle mt-2 mr-2" />
                            <span v-if="playlist">{{ playlist?.songs.length || 0  }} Canciones</span>
                        </div>
                    </div>
                </div>


                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <button class="p-1 rounded-full bg-white" @click="addToQueue">
                        <Play fillColor="#181818" :size="25"/>
                    </button>
                    <button type="button" @click="showConfirmationModal = true">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-6"></div>
        <div class="flex items-center justify-between px-5 pt-2">
            <div class="flex items-center justify-between text-gray-400">
                <div class="mr-7">#</div>
                <div class="text-sm">Título</div>               
            </div>
            <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/></div>
        </div>
        <div class="border-b border-b-[#2A2A2A] mt-2"></div>
        <div class="mb-4"></div>      
        
        <ul class="w-full"> 
            <SongRow
            v-for="(song, index) in playlist.songs"
            :key="song.id"  
            :song="song" 
            :index="index"/>
        </ul> 
    </div>
    
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue';

import SongRow from '../components/SongRow.vue'
import ConfirmationModal from '@/components/modal/ConfirmationModal.vue';

import { Playlist, Song } from '@/interfaces';

import { deletePlaylist, fetchPlaylistById } from '@/backend';

import { useMainStore } from '@/stores/main'
import { usePlayerStore } from '@/stores/player';

import { clearQueue, addPlaylistToQueue as addToQueueFS } from '@/firestore';

import { showErrorToast, showSuccessToast } from '@/utils/toast';

const router = useRouter();
const route = useRoute();

const mainStore = useMainStore();
const playerStore = usePlayerStore();

const errors = ref<string>('');

let playlistId = route.params.id;
const playlist = ref<Playlist>({
    id: 'playlist_id',
    user_id: 'user_id',
    username: 'username',
    name: 'playlist_name',
    image: '/images/icons/defaultPlaylistImg.png',
    songs: []
});

const showConfirmationModal = ref(false);
const isLoading = ref(false);

const fetchPlaylist = async () => {
    errors.value = '';

    isLoading.value = true;
    try {
        const response = await fetchPlaylistById(String(playlistId));
        playlist.value = response.playlist;
        isLoading.value = false;
    } catch (error: any) {
        isLoading.value = false;
        errors.value = error.response.data.message;
        showErrorToast(errors.value);
    }
};

const addToQueue = () => {
    if(playlist.value.songs.length > 0){
        playerStore.addPlaylistToQueue(playlist.value.songs);
        if(mainStore.user){
            addToQueueFS(playerStore.player.id, playlist.value.songs);
            console.log('hola')
        };
        showSuccessToast("Reproduciendo Playlist " + playlist.value.name);
    }
    else{
        showErrorToast('¡La Playlist está vacia!')
    }

};

onMounted(async() => {
    playlistId = route.params.id;
    fetchPlaylist();
});

watch(() => route.params.id, (newId) => {  
    playlistId = newId;
    fetchPlaylist();
});

const deletePlaylistAndCloseModal = async () => {
    errors.value = '';

    try {
        await deletePlaylist(String(playlistId));
        showConfirmationModal.value = false;
        mainStore.deleteSystemPlaylist(String(playlistId));
        router.push('/');
        setTimeout(() => {
            showSuccessToast('Playlist eliminada correctamente');
        }, 500);
    } catch (error: any) {
        if (error.response) {
            errors.value = error.response.data.message;
        }
        showErrorToast(errors.value);
    }
};
</script>

<style scoped>
.circle {
    width: 4px;
    height: 4px;
    background-color: rgb(189, 189, 189);
    border-radius: 100%;
}
</style>