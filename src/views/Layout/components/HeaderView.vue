<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const confirm = () => {

    // 退出登录业务逻辑实现
    // 1.清除用户信息 触发action
    userStore.clearUserInfo()
    // 2.跳转到登录页
    router.push('/')
}
</script>
<template>
    <header class="app-top">
        <div class="container">
            <el-row>
                <el-col :span="6" :offset="1">
                    <div class="grid-content title"><router-link to="/">欢迎来到宠物帮帮居-您的宠物生活，我们的责任</router-link> </div>
                </el-col>
                <el-col :span="5" :offset="1" class="box">
                    <template v-if="userStore.userInfo.token">
                        <li>
                            <router-link to="/member">
                                <i class=" iconfont icon-icon_user"></i>
                                {{ userStore.userInfo.account }}
                            </router-link>
                        </li>
                        <li>
                            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                                cancel-button-text="取消">
                                <template #reference>
                                    <a href="#">退出登录</a>
                                </template>
                            </el-popconfirm>
                        </li>
                    </template>
                    <template v-else>
                        <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                        <li><a href="javascript:;">帮助中心</a></li>
                        <li><a href="javascript:;">关于我们</a></li>
                    </template>


                </el-col>
            </el-row>
        </div>
    </header>
</template>



<style lang="less" scoped>
.app-top {

    background: orange;

    .el-row {
        height: 53px;
        justify-content: space-around;
        align-items: center;

        .box {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .el-col {
            .grid-content {
                font-size: 15px;
                color: #333;
            }
        }
    }
}
</style>