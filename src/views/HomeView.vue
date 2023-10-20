<script setup lang="ts">
    import SongCard from '../components/SongCard.vue';
</script>

<template>
    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Tus canciones
        </h1>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recientemente añadidas
        </h1>
        <div class="py-2"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recomendados
        </h1>
        <div class="py-2"></div>

        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <SongCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <SongCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <SongCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <SongCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <SongCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>
</template>
