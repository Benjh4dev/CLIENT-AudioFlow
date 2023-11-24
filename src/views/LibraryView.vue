<template>
    <div class="p-8 overflow-x-hidden">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer ml-14 sm:ml-0"
        >

        </button>

        <div class="py-1.5"></div>
        <div class="flex items-center w-full relative h-full ml-20 sm:ml-0">
            <!-- <img width="140" :src="artist.albumCover" class="rounded-md">   -->

            <div class="w-full ml-5">

                <div
                    style="font-size: 33px;"
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld
                    opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out"
                >
                    {{ playlistId }}
                </div>

                <div class="text-gray-300 text-[13px] flex
                opacity-0 sm:opacity-100 group transition-all duration-300 ease-in-out">
                    <div class="ml-2 flex">
                    </div>
                    <div class="ml-2 flex">
                        <!-- <div class="circle mt-2 mr-2" /> -->
                        <span class="-ml-0.5">{{ 'Número' }} songs</span>
                    </div>
                </div>

                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <!-- <button class="p-1 rounded-full bg-white" @click="playFunc()">
                        <Play v-if="!isPlaying" fillColor="#181818" :size="25"/>
                        <Pause v-else fillColor="#181818" :size="25"/>
                    </button> -->
                    <button type="button" @click="deleteA(String(playlistId))">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-6"></div>
        <div class="flex items-center justify-between px-5 pt-2">
            <div class="flex items-center justify-between text-gray-400">
                <div class="mr-7">#</div>
                <div class="text-sm">Title</div>
            </div>
            <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/></div>
        </div>
        <div class="border-b border-b-[#2A2A2A] mt-2"></div>
        <!-- <div class="mb-4"></div>
        <ul class="w-full" v-for="track, index in artist.tracks" :key="track">
            <SongRow :artist="artist" :track="track" :index="++index"/>
        </ul> -->
    </div>
</template>

<style scoped>
    .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>


<script setup lang="ts">
import SongRow from '../components/SongRow.vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue';

import { useRoute } from 'vue-router';
import { watch, ref, onMounted } from 'vue';
import { useMainStore } from '../stores/main'
import { deletePlaylist, getUserPlaylists } from '@/backend';
import { Playlist } from '@/interfaces';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const props = defineProps({
    playlist: {
        type: Object as () => Playlist,
        required: true
    }
});
const route = useRoute();
let playlistId = route.params.id;

const mainStore = useMainStore();
const playlist = ref(null);

onMounted( async() => {
    const response = await api.get(`/playlist/${mainStore.$state.user?.id}/${playlistId}`);
    console.log(response.data);
});

watch(() => route.params.id, (newId) => {  
    console.log(playlistId)
    playlistId = newId;
});


const deleteA = async (id : string) => {
    const response = await deletePlaylist(id);
    console.log(response.status);
    if (response.status === 200) {
        console.log('1');
        const userPlaylists = await getUserPlaylists();
        console.log('2');
        mainStore.loadUserPlaylists(userPlaylists);
        router.push('/');
    } else {
        console.log(response);
    }

};
// const props = defineProps({
//     playlistName: String,
//     playlistCover: String,
//     playlistTracks: Array
// });

// const useSong = useSongStore()
// const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

// const playFunc = () => {
//     if (currentTrack.value) {
//         useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
//         return
//     } 
//     useSong.playFromFirst()
// }
</script>