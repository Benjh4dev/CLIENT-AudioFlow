<template>
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />

    <Menu as="div" class="relative pl-1" id="songOptions">
        <div>
            <MenuButton
            class="items-center rounded-full bg-[#282828] bg-opacity-40 
            text-sm font-medium text-white hover:bg-gray-900 cursor-pointer"
            >
            <DotsHorizontal/>
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
            class="absolute right-1 w-40 rounded-md bg-black shadow-2xl "
            >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button
                        @click="addToQueue()"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm border-b border-gray-700',
                        ]"
                    >
                        Agregar a la cola
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button
                        @click="addToPlaylist()"
                        :class="[
                        active ? 'bg-gray-900 text-white' : 'text-gray-300',
                        'group flex w-full items-center px-2 py-2 text-sm',
                        ]"
                    >
                        Agregar a una playlist
                    </button>
                    </MenuItem>
                    <MenuItem v-if="isUserSong" v-slot="{ active }">
                    <button
                        @click="deleteSong()"
                        :class="[
                        active ? 'bg-red-950 text-white' : 'text-red-500',
                        'group flex w-full items-center px-2 py-2 text-sm border-t border-gray-700',
                        ]"
                    >
                        Eliminar canción
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import { usePlayerStore } from '@/stores/player';
import { useMainStore } from '@/stores/main';
import { Song } from '@/interfaces';
import { showSuccessToast } from '@/utils/toast';

const playerStore = usePlayerStore();
const mainStore = useMainStore();

const props = defineProps({
    song: {
        type: Object as () => Song,
        required: true
    }
});

let showLoginModal = ref(false);
const isUserSong = ref(false);

onMounted(() => {
    if (props.song.user_id == mainStore.user?.id) {
        isUserSong.value = true;
    }
})

function openLoginModal() {
    showLoginModal.value = true;
}

const addToQueue = () => {
    playerStore.addToQueue(props.song)
    showSuccessToast("Canción agregada a la cola")
    console.log('Add to queue');
};

const addToPlaylist = () => {
    console.log('Add to playlist WIP');
};

const deleteSong = () => {
    console.log('Delete song');
};

</script>

<style scoped>
#songOptions {
  z-index: 10;
}
</style>