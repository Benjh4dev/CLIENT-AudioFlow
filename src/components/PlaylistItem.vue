<template>
<RouterLink to="/profile" class="flex h-18 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" @mouseenter="isHover()" @mouseleave="isHover()">
    <img src="public\images\albumCovers\DiariesOfAHero.png" alt="" class="w-16 h-16 rounded-lg p-2">
    <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out">
        <h1 class="pl-[6%] pt-[8%] text-lg font-semibold w-max" :class="optionIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">Playlist #1</h1>
        <h3 class="text-[#A7A7A7] ml-[6%] text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">Carlo Ignacio</h3>
    </div>
</RouterLink>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

let optionIsHover = ref<boolean>(false);

function isHover() {
    optionIsHover.value = !optionIsHover.value;
}

</script>