<template>
    <div class="container">
        <Carousel />
        <Category />
        <ScrollbarNew />
        <Product />
    </div>

</template>

<script setup>
import Carousel from './components/Carousel.vue';
import Category from './components/Category.vue';
import ScrollbarNew from './components/ScrollbarNew.vue';
import Product from './components/Product.vue';


</script>

<style lang="less" scoped>
.container {
    position: relative;
    width: 1240px;
    margin: 0 auto;
}
</style>