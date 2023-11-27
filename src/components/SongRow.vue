<template>
    <li
        class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
    >
        <div class="flex items-center w-full py-1.5">
            <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
                <Play
                    v-if="!isPlaying"
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="useSong.playOrPauseThisSong(artist, track)"
                />
                <Play
                    v-else-if="isPlaying && currentTrack.name !== track.name"
                    fillColor="#FFFFFF"
                    :size="25"
                    @click="useSong.loadSong(artist, track)"
                />

                <Pause v-else fillColor="#FFFFFF" :size="25" @click="useSong.playOrPauseSong()"/>
            </div>
            <div v-else class="text-white font-semibold w-[40px] ml-5">
                <span :class="{'text-green-500': currentTrack && currentTrack.name === track.name}">
                    {{ index }}
                </span>
            </div>
            <div>
                <div
                    :class="{'text-green-500': currentTrack && currentTrack.name === track.name}"
                    class="text-white font-semibold"
                >
                    {{ track.name }}
                </div>
                <div class="text-sm font-semibold text-gray-400">{{ artist }}</div>
            </div>
        </div>
        <div>
            <button type="button" v-if="isHover">
            <div class="text-xs mx-5 text-gray-400">{{ formatDuration(track.duration) }}</div>
            </button>
        </div>
       
    </li>
</template>

<script setup>
import { ref, toRefs, defineProps } from 'vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';

const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

let isHover = ref(false)

const props = defineProps({
    track: Object,
    artist: String,
    index: Number,
})

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return minutes+':'+seconds.toString().padStart(2, '0')
}

const { track, artist, index } = toRefs(props)

</script>