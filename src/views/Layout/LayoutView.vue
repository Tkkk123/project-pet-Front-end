<template>
        <HeaderView />
        <NavView />
        <RouterView />
        <FooterView />
</template>

<script setup>
import HeaderView from './components/HeaderView.vue';
import NavView from './components/NavView.vue';
import FooterView from './components/FooterView.vue';
</script>

<style lang="less">
* {
        margin: 0;
        padding: 0;
        list-style-type: none;
        text-decoration: none;
}
</style>