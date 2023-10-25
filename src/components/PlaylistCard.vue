<template>
    <RouterLink to="/library">
        <div
            v-if="randColor.color"
            :style="`background-color: ${randColor.color};`"
            class="
                contrast-[2] 
                brightness-[0.87] 
                rounded-xl 
                aspect-square 
                relative 
                overflow-hidden
                w-[130px]
                sm:w-[200px]
                group
                hover:scale-105
                transition-all
                duration-300 
                ease-in-out
                shadow-2xl
            "
        >
            <div class="text-white pt-3 pl-4 font-semibold text-[23px]">{{ name }}</div>
            <img
                class="
                    absolute 
                    contrast-[0.55]
                    -right-3.5 
                    bottom-0 
                    max-w-[100px] 
                    rotate-[20deg]
                "
                :src="image || ''"
            >
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router';
import uniqolor from 'uniqolor';

interface UniqolorResult {
    color: string;
};

let randColor = ref<UniqolorResult>({ color: '' });
randColor.value = uniqolor.random()

const props = defineProps({ name: String, image: String })
const { name } = toRefs(props)
</script>