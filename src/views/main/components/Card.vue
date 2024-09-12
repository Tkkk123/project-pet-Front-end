<template>
    <!-- card组件模块 -->
    <RouterLink :to="`/detail/${cards.id}`" class="card">
        <i class="iconfont icon-03DMS_cuxiaoguanli" v-if="cards.discount"></i> <!-- 判断是否有折扣进行图标渲染 -->
        <img :src="cards.picture" alt="">
        <p>{{ cards.name }}</p>
        <i class="iconfont icon-renminbi">{{ cards.price }}元</i>
        <p>数量：<span>{{ cards.orderNum }}</span></p>
    </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cards: {
        type: Object,
        default: () => []
    }

});

</script>


<style lang="less" scoped>
.card {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .5s;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

        span {
            transition: all .7s;
            color: red;
        }
    }

    p {
        color: black;


    }

    .icon-03DMS_cuxiaoguanli {
        color: var(--el-color-danger);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 3em;
    }

    .icon-renminbi {
        color: var(--el-color-danger);
        margin: 10px 0;
    }

    img {
        width: 240px;
        height: 180px;
        margin-bottom: 20px;
    }
}
</style>