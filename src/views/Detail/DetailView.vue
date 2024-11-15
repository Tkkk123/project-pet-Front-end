<template>
    <div class="xtx-goods-page">
        <div class="container">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item to="/">
                        {{ ifData.ifmatchDataName }}
                    </el-breadcrumb-item>

                    <el-breadcrumb-item to="/">
                        {{ ifData.ifchildrenDataName }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区，增加骨架屏 -->
                            <div v-if="!children.picture" class="skeleton-loader">
                                <!-- 占位符加载 -->
                                <div class="skeleton-image">加载中....</div>
                            </div>
                            <img v-else :src="children.picture" alt="" class="product-image" />

                            <!-- 统计数量 -->
                            <ul class="goods-sales">
                                <li>
                                    <p>销量人气</p>
                                    <p>
                                        {{ ifData.ifrandomList1 }}
                                        {{ ifData.ifadd }}
                                    </p>

                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>商品评价</p>
                                    <p>{{ ifData.ifrandomList2 }} {{ ifData.ifadd }}</p>

                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏人气</p>
                                    <p>{{ ifData.ifrandomList3 }} {{ ifData.ifadd }}</p>

                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>剩余宠物</p>
                                    <p v-if="children.picture && children.orderNum">
                                        {{ children.orderNum }}+
                                    </p>
                                    <p v-else-if="!children.picture">加载中....</p>
                                    <p v-else>{{ randomList.Number4 }}+</p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>剩余数量</p>
                                </li>
                            </ul>
                        </div>

                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name">{{ children.name }}</p>
                            <p class="g-price">
                                <span v-show="children.picture">{{ children.price }}</span>
                                <span>{{ ifData.ifPrice }}</span>
                            </p>
                            <div class="g-service">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>2024年新宠优惠，App领券购买直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>血统纯正</span>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                            <!-- sku组件 -->
                            <Sku :goods="goods.sku" @change="skuChange"></Sku>
                            <!-- 数据组件 -->
                            <el-input-number v-model="count" @change="countChange" />
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                                <el-button size="large" class="btn" @click="$router.push('/cartlist')">
                                    去购物车结算
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <!-- 商品详情 -->
                    <div class="goods-footer" v-if="children && randomList">
                        <div class="goods-article">
                            <div class="goods-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="goods-detail" v-for="(img, index) in images" :key="index">
                                    <img v-lazy="imagePaths(img.src)" alt="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RandomList } from "@/apis/detail";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { useCartStore } from "@/stores/cartStore";
import Sku from "@/components/Sku/index.vue";
import { useCategoryStore } from '@/stores/Category';
const categoryStore = useCategoryStore();
// 引用 Pinia store 中的数据
const cartStore = useCartStore();
const route = useRoute();
const goods = ref({});
const children = reactive({});
const randomList = RandomList();
const matchData = reactive({});

const images = [
    { src: "商品详情1.webp", alt: "商品1" },
    { src: "商品详情2.webp", alt: "商品2" },
    { src: "商品详情3.webp", alt: "商品3" },
];
const getGoods = async () => {
    //接口设计问题，实际获取的是全部数据，并不是单个宠物数据
    const categoryList = categoryStore.categoryList;
    if (categoryList.length === 0) {
        // 如果 categoryList 为空，返回
        console.log('categoryList 数据为空，请等待数据加载');
        return;
    }
    const dataWithChildren = categoryList.filter((item) => item.children); //过滤出children
    console.log(dataWithChildren);
    //找到与宠物id对应的children模块
    const data = dataWithChildren.find((item) =>
        item.children.some((child) => child.id === route.params.id)
    );
    Object.assign(matchData, data);
    goods.value = matchData.children.find((item) => item.id === route.params.id);
    //合并对象进行面包屑渲染
    Object.assign(children, goods.value);
};
let skuObj = {};
const skuChange = (sku) => {
    skuObj = sku; //接收sku组件传出的数据
};
const addCart = () => {
    if (skuObj.sex && skuObj.color) {
        //确认规格全选
        cartStore.addCart({
            //将全部数据将入
            id: goods.value.id,
            name: goods.value.name,
            picture: goods.value.picture,
            price: goods.value.price,
            count: count.value,
            sex: skuObj.sex,
            color: skuObj.color,
        });
        ElMessage.success("加入成功！");
    } else {
        ElMessage.warning("请选择规格");
    }
};
const count = ref(1);
const countChange = (value) => {
    if (value < 1) {
        count.value = 1;
    } else {
        count.value = value;
    }
};
onMounted(() => {
    getGoods();
});
const ifData = computed(() => {
    return {
        ifmatchDataName:
            children.picture && randomList ? matchData.name : "加载中...",
        ifchildrenDataName:
            children.picture && randomList ? children.name : "加载中...",
        ifrandomList1:
            children.picture && randomList ? randomList.Number1 : "加载中...",
        ifrandomList2:
            children.picture && randomList ? randomList.Number2 : "加载中...",
        ifrandomList3:
            children.picture && randomList ? randomList.Number3 : "加载中...",
        ifadd: children.picture && randomList ? "+" : "",
        ifPrice:
            children.picture && randomList
                ? randomList.OldPrice + children.price
                : "加载中...",
    };
});

const imagePaths = (name) => {
    return new URL(`../../assets/${name}`, import.meta.url).href;
};

</script>

<style scoped lang="less">
.xtx-goods-page {
    width: 1240px;
    margin: 0 auto;

    .goods-info {
        background: #fff;
        display: flex;
        justify-content: space-around;

        .media {
            img {
                width: 500px;
            }
        }

        .spec {
            padding: 0 30px 0 0;

            .el-input-number {
                margin-top: 20px;
            }
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: red;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: red;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: red;
                    }
                }
            }
        }
    }

    .goods-sales {
        display: flex;
        width: 500px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: red;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: red;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: red;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;
}

.bread-container {
    padding: 25px 0;
}

/* 骨架屏样式 */
.skeleton-loader {
    background-color: #f0f0f0;
    height: 200px;
    width: 100%;
    animation: loading 1.5s infinite linear;

}

.skeleton-image {
    background-color: #ccc;
    width: 100%;
    height: 100%;
}

@keyframes loading {
    0% {
        background-position: -200px 0;
    }

    100% {
        background-position: 200px 0;
    }
}

.product-image {
    width: 100%;
    height: auto;
}
</style>