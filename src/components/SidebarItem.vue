<template>
    <RouterLink 
        v-if="pageUrl"
        :to="pageUrl || '/'"
        class="w-[67px] md:w-[100%] flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" 
        @mouseenter="isHover" 
        @mouseleave="isHover">
        
        <img 
            :src="iconUrl" 
            alt="Icon Image" 
            :class="`${ml} ${mt} ${w} ${h}`">
        
        <h1 
            :class="`${pl} ${pt} text-lg font-semibold opacity-0 md:opacity-100 ${optionIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'}`">
            {{ message }}
        </h1>
    </RouterLink>

    <div 
        v-if="!pageUrl"
        class="w-[67px] md:w-[100%] flex h-12 hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg cursor-pointer" 
        @mouseenter="isHover" 
        @mouseleave="isHover">
        
        <img 
            :src="iconUrl" 
            alt="Icon Image" 
            :class="`${ml} ${mt} ${w} ${h}`">
        
        <h1 
            :class="`${pl} ${pt} text-lg font-semibold opacity-0 md:opacity-100 ${optionIsHover ? 'text-white transition-all duration-300 ease-in' : 'text-[#A7A7A7] transition-all duration-300 ease-out'}`">
            {{ message }}
        </h1>
    </div>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'

const props = defineProps({
    pageUrl: String,
    iconUrl: String,
    message: String,
    ml: String,
    mt: String,
    w: String,
    h: String,
    pl: String,
    pt: String
});

let optionIsHover = ref<boolean>(false);

function isHover() {
    optionIsHover.value = !optionIsHover.value;
}
</script>
