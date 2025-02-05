<template>
    <el-carousel :interval="5000" height="440px">
        <router-link to="/">
            <el-carousel-item v-for="item in 4" :key="item">
            </el-carousel-item>
        </router-link>
    </el-carousel>
</template>

<style scoped lang="less">
.el-carousel {
    position: absolute;
    width: 1000px;
    right: 0;

    .el-carousel__item {
        background: url(@/assets/Carousel.png) no-repeat 100%;
    }
}
</style>