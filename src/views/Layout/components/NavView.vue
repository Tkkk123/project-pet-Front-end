<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useCategoryStore } from '@/stores/Category'
import HeaderCart from './HeaderCart.vue';
const categoryStore = useCategoryStore()
const input3 = ref('')
</script>
<template>
    <nav class='app-nav'>
        <div class="container">
            <el-row>
                <el-col :span="5">
                    <RouterLink to="/" class="logo">宠物帮帮居</RouterLink>
                </el-col>
                <el-col :span="15">
                    <div class="mt-4">
                        <el-input v-model="input3" size="large" style="max-width: 1200px" placeholder="请输入内容"
                            class="input-with-select">
                        </el-input>
                        <el-button type="danger" :icon="Search" size="large">搜索</el-button>

                    </div>
                    <div class="NewDog">
                        <ul v-for="(hot, index) in categoryStore.categoryList" :key="hot.id">
                            <li>
                                <RouterLink to="/">{{ hot.name }}</RouterLink>
                                <i class="iconfont icon-fengefu"
                                    v-if="index !== categoryStore.categoryList.length - 1"></i>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="2">
                    <HeaderCart />
                </el-col>
            </el-row>

        </div>
    </nav>
</template>

<style scoped lang='less'>
.app-nav {
    width: 1240px;
    margin: 0 auto;
    background: #FFFFFF;

    .container {
        height: 114px;
    }

    .el-row {
        padding-top: 20px;
        margin: 0 auto;
        justify-content: space-between;
        // align-items: center;

        .mt-4 {
            display: flex;
        }

        .NewDog {
            display: flex;
            margin-top: 10px;

        }

        .logo {
            position: relative;
            overflow: hidden;
            z-index: 1;
            display: block;
            height: 80px;
            text-indent: -9999px;
            background: url('@/assets/宠物帮帮居.png') no-repeat 15px/ contain;
        }

        .logo::before,
        .logo::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border-radius: 100%;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            animation: pulse 2s infinite;
        }

        .logo::after {
            animation-duration: 3s;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(232, 58, 0, 0.7);
            }

            70% {
                box-shadow: 0 0 0 20px rgba(9, 142, 237, 0);
            }

            100% {
                box-shadow: 0 0 0 0 rgba(38, 227, 9, 0);
            }
        }



        .search {
            display: flex;

            .icon-search {
                font-size: 18px;
            }


        }


    }


}
</style>