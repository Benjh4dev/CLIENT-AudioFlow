<template>
    <RouterLink 
      :to="`/playlist/${playlist.id}`"
      class="w-[67px] md:w-[100%] flex h-[65px] hover:bg-[#1A1A1A] transition-all duration-300 ease-in-out rounded-lg" 
      @mouseenter="isHover" 
      @mouseleave="isHover">
      
      <img 
        src="/images/icons/defaultPlaylistImg.png" 
        alt="Cover Image" 
        class="w-16 h-16 rounded-lg p-2">
      
      <div class="opacity-0 md:opacity-100 transition-all duration-300 ease-in-out truncate">
        <h1 
          class="ml-1 pt-2 text-md font-semibold w-[100%]"
          :class="optionIsHover ? 'text-green-500 transition-all duration-300 ease-in' : 'text-white transition-all duration-300 ease-out'">
          {{ playlist.name }}
        </h1>
        <h3
          @click=""
          class="text-[#A7A7A7] ml-1 text-xs pt-1 w-max hover:underline hover:text-white transition-all duration-300 ease-in-out">
          {{ mainStore.user?.username }}
        </h3>
        

      </div>
    </RouterLink>
    
</template>
  
<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import { Playlist } from '@/interfaces';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  playlist: {
    type: Object as () => Playlist,
    required: true
  }
});

const emit = defineEmits(['request-delete']);
let optionIsHover = ref<boolean>(false);

function isHover() {
  optionIsHover.value = !optionIsHover.value;
}

function emitDeleteEvent() {
  emit('request-delete', props.playlist.id);
}

const mainStore = useMainStore();
</script>