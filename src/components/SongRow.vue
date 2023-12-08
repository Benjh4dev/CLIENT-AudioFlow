<template>
    <li
        class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
    >
        <div class="flex items-center w-full py-1.5" @click="playSong">
            <ConfirmationModal
            v-if="showConfirmationModal"
            @close="showConfirmationModal = false"
            @confirm="deleteSongAndCloseModal()"
            entityToDelete="canción de la playlist"
            />
            <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
                <Play                
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="playSong"
                />
                <!-- <Play
                    v-else-if="isPlaying && currentSong.name !== song.song"
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="useSong.loadSong(artist, song)"
                />  -->

                <!-- <Pause v-else fillColor="#FFFFFF" :size="25" @click="pauseSong"/>  -->
            </div>
            <div v-else class="text-gray-400 font-semibold w-[40px] ml-5">
                <span>
                    {{ props.index + 1 }}
                </span>
            </div>
            <div>
                <div
                    :class="{'text-green-500': props.song}"
                    class="text-white font-semibold"
                >
                    {{ props.song.name }}
                </div>
                <div class="text-sm font-semibold text-gray-400">{{ props.song.artist }}</div>
            </div>
        </div>
        <div>
            <button type="button">
            <div class="text-xs mx-5 text-gray-400">{{ formatDuration(props.song.duration) }}</div>
            </button>

        </div>
        <button v-if="props.playlistUserId === mainStore.user?.id" type="button" @click="showConfirmationModal = true">
                <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
        </button>

       
    </li>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import { usePlayerStore } from '../stores/player'
import { Song } from '@/interfaces';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import ConfirmationModal from '@/components/modal/ConfirmationModal.vue';
import { removeSongFromPlaylist, fetchUserPlaylists } from '@/backend';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useRouter } from 'vue-router';

import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
const router = useRouter();
const playerStore = usePlayerStore();

const showConfirmationModal = ref(false);
let isHover = ref(false)

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    playlistId: {
        type: String,
        required: true
    },
    playlistUserId: {
        type: String,
        required: true
    }
});



const playSong = async () => {
    playerStore.playSong(props.song);
};

// const pauseSong = async () => {
//     playerStore.player.isPlaying = false;
// };

const formatDuration = (seconds:number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins+':'+secs.toString().padStart(2, '0')
}

const deleteSongAndCloseModal = async () => {
    // errors.value = '';

    try {
        await removeSongFromPlaylist(String(props.playlistId),String(props.song.id));
        showConfirmationModal.value = false;
        // mainStore.deleteSystemPlaylist(String(playlistId));
        //router.push(`/playlist/${props.playlistId}`);
        const userPlaylists = await fetchUserPlaylists();
        mainStore.loadMyPlaylists(userPlaylists);
        router.go(0)
        setTimeout(() => {
            showSuccessToast('Canción removida correctamente correctamente');
        }, 500);
    } catch (error: any) {
        if (error.response) {
            // errors.value = error.response.data.message;
            console.log(error)
        }
        showErrorToast(error);
    }
};

</script>