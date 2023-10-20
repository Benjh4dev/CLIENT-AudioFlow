<template>
    <RouterLink to="library">
        <div class="bg-black hover:bg-[#282828] p-4 rounded-md m-2 shadow-xlhover:bg-[#252525] cursor-pointer h-[250px] w-[180px] group transition-all duration-300 ease-in-out">
            <div class="flex justify-center items-center relative h-[150px] w-[148px]">
                <img class="rounded-md shadow-2xl" :src="pic_url" alt="">
                <img class="absolute bottom-0 right-0 h-[45px] w-[45px] rounded-md shadow-2xl hover:scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out mb-3 mr-2" src="public\images\icons\play-icon.png" alt="">
            </div>
            <div class="text-white font-semibold text-[17px] pt-4 pl-1">{{ name }}</div>
            <div class="text-gray-400 font-semibold text-[14px] pt-1 pb-3 pl-1">
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

const props = defineProps({
    pic_url: String,
    name: String,
    artist: String
})
const { pic_url, name, artist } = toRefs(props)
</script>