<template>
    <RouterLink to="library">
        <div class="bg-[#181818] hover:bg-[#282828] p-4 rounded-md m-2 shadow-xlhover:bg-[#252525] cursor-pointer h-[260px] w-[130px] sm:w-[180px] group transition-all duration-300 ease-in-out">
            <div class="flex justify-center items-center relative h-[150px] w-[100px] sm:w-[148px] transition-all duration-300 ease-in-out">
                <img class="rounded-md shadow-2xl" :src="coverURL" alt="">
                <img class="absolute bottom-0 right-0 mb-8 mr-1 h-[35px] w-[35px] rounded-md shadow-2xl
                sm:mb-3 sm:mr-2 sm:h-[45px] sm:w-[45px]
                hover:scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" src="/images/icons/play-icon.png" alt="">
            </div>
            <div class="text-white font-semibold text-[15px] sm:pt-4 pl-1">{{ name }}</div>
            <div class="text-gray-400 font-semibold text-[12px] sm:pt-1 pb-3 pl-1">
                <h6 class="hover:underline">
                    {{ artist }}
                </h6>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router';
import { useSongStore } from '@/stores/song';
import { Song } from '@/interfaces';

const songStore = useSongStore();

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    }
});

const { coverURL, name, artist, audioURL } = toRefs(props.song);
</script>