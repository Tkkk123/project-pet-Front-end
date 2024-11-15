<script setup>
import { NewStore } from '@/stores/NewStore'
import { onMounted } from 'vue';
import Panel from './Panel.vue';
const getNew = NewStore()
onMounted(() => {
    if (getNew.NewList.length === 0) {
        getNew.getNew();
    }

});
</script>
<template>
    <div class="container">
        <Panel :title="getNew.title" :subTitle="getNew.subtitle">
            <el-scrollbar>
                <div class="scrollbar-flex-content">
                    <ul v-for="item in getNew.NewList" :key="item.id" class="scrollbar-demo-item">
                        <li>
                            <router-link to="/">
                                <div class="card">
                                    <i class="iconfont icon-03DMS_cuxiaoguanli" v-if="item.discount"></i>
                                    <img v-lazy="item.picture" alt="">
                                    <p>{{ item.name }}</p>
                                    <i class="iconfont icon-renminbi">{{ item.price }}元</i>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </el-scrollbar>
        </Panel>
    </div>
</template>

<style scoped lang="less">
.container {
    margin-top: 20px;



    .scrollbar-flex-content {
        display: flex;

        :first-child {
            margin-left: 1px;
        }

        a {
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;

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
                    width: 180px;
                    height: 150px;
                    margin-bottom: 20px;
                }
            }
        }



    }

    .scrollbar-demo-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 250px;
        margin: 10px 5px;
        text-align: center;
        border-radius: 4px;
        background: #fff;
        color: var(--el-color-danger);
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

            p {
                color: red;
            }
        }



    }
}
</style>