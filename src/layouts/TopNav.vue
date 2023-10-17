<template>
    <div 
        id="TopNav"
        class="
        w-[calc(100%-240px)] 
        h-[60px] 
        fixed 
        right-0 
        z-50 
        bg-[#101010] 
        bg-opacity-80 
        flex 
        items-center 
        justify-between
        "
    >
        <div class="flex items-center ml-6">
            <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
                <ChevronLeft fillColor="#FFFFFF" :size="30" />
            </button>
            <button type="button" class="rounded-full bg-black p-[1px] hover:bg-[#] ml-4 cursor-pointer">
                <ChevronRight fillColor="#FFFFFF" :size="30" />
            </button>
        </div>

        <GuestOptions v-if="!mainStore.$state.token"/>
        <UserOptions v-if="mainStore.$state.token"/>

    </div>
</template>

<script setup lang="ts">
import GuestOptions from '@/components/GuestOptions.vue';
import UserOptions from '@/components/UserOptions.vue'

import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();
</script>