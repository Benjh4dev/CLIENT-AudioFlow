<template>
    <div class="p-8 pl-10 pt-12">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
            Buscar todo
        </button>

        <div class="py-4"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-16">
            <PlaylistCard name="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <PlaylistCard name="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <PlaylistCard name="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <PlaylistCard name="New Release" image="https://picsum.photos/id/56/300/300"/>
            <PlaylistCard name="New Release" image="https://picsum.photos/id/25/300/300"/>
            <PlaylistCard name="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <PlaylistCard name="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <PlaylistCard name="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <PlaylistCard name="New Release" image="https://picsum.photos/id/101/300/300"/>
            <PlaylistCard name="New Release" image="https://picsum.photos/id/120/300/300"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import PlaylistCard from '../components/PlaylistCard.vue';
</script>