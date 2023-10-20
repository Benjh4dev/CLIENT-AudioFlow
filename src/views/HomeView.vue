<script setup lang="ts">
    import HomeCard from '../components/HomeCard.vue';
</script>

<template>
    <div class="p-8">
        <div class="py-2"></div>
        <h1 class="text-white text-2xl font-semibold pl-2">
            Tus canciones
        </h1>
        <div class="py-2"></div>

        <div class="flex items-center gap-7">
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recientemente añadidas
        </h1>
        <div class="py-2"></div>

        <div class="flex items-center gap-7">
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>

    <div class="p-8">
        <h1 class="text-white text-2xl font-semibold pl-2">
            Recomendados
        </h1>
        <div class="py-2"></div>

        <div class="flex items-center gap-7">
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="md:block hidden" pic_url="https://picsum.photos/id/65/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="lg:block hidden" pic_url="https://picsum.photos/id/67/300/300" name="name is here" artist="artist is here" />
            <HomeCard class="xl:block hidden" pic_url="https://picsum.photos/id/100/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/30/300/300" name="name is here" artist="artist is here" />
            <HomeCard pic_url="https://picsum.photos/id/45/300/300" name="name is here" artist="artist is here" />
        </div>
    </div>
</template>
