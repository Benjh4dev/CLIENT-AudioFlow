<template>

    <div @contextmenu.prevent="doSomething">
        <div class="bg-[#181818] hover:bg-[#282828] pr-4 pl-4 rounded-md m-2 shadow-xlhover:bg-[#252525] cursor-pointer h-[260px] w-[130px] sm:w-[180px] sm:pt-4 group transition-all duration-300 ease-in-out">
            <div class="flex justify-center items-center relative h-[150px] w-[100px] sm:w-[148px] transition-all duration-300 ease-in-out">
                <img class="rounded-md shadow-2xl" :src="props.song.coverURL" alt="">
                <img @click="playSong"
                class="absolute bottom-0 right-0 mb-8 mr-1 h-[35px] w-[35px] rounded-md shadow-2xl
                sm:mb-3 sm:mr-2 sm:h-[45px] sm:w-[45px]
                hover:scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" src="/images/icons/play-icon.png" alt="">
            </div>
            <div class="text-white font-semibold text-[15px] sm:pt-4 pl-1">{{ props.song.name }}</div>
            <div class="flex justify-between">
                <div class="text-gray-400 font-semibold text-[12px] sm:pt-1 pb-3 pl-1">
                    <h6 class="hover:underline">
                        {{ props.song.artist }}
                    </h6>
                </div>
                <SongCardOptions :song="props.song"/>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { Song } from '@/interfaces';
import { usePlayerStore } from '@/stores/player';
import SongCardOptions from './SongCardOptions.vue';

const playerStore = usePlayerStore();

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    }
});

const { coverURL, name, artist } = toRefs(props.song);

const playSong = () => {
    console.log("play song")
    playerStore.playSong(props.song);
};


const doSomething = () => {
    console.log('do something', props.song.user_id);
};
</script>