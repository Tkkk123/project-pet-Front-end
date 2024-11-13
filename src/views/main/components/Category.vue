<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/Category'
const categoryStore = useCategoryStore()
const categoryList = categoryStore.categoryList;
onMounted(async () => {
  if (categoryList.length === 0) {
    await categoryStore.getCategory(); // 调用 store 中的方法获取数据
  }
})
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/">
          {{ item.name }}
          <el-icon v-if="item.children">
            <ArrowRight />
          </el-icon>
        </RouterLink>
        <!-- 弹层layer位置 -->
        <div class=" layer" v-if="item.children">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.children" :key="i.id">
              <router-link :to="`/detail/${i.id}`">
                <img :src="i.picture" alt="" />
                <div class="info">
                  {{ i.name }}
                  <i class="iconfont icon-renminbi">{{ i.price }}元</i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='less'>
.home-category {
  width: 240px;
  height: 440px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 80px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: #905656;
      }

      a {
        display: flex;
        align-items: center;
        margin-right: 4px;
        color: #fff;
      }

      .layer {
        width: 990px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 240px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 50px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;

          flex-wrap: wrap;

          li {
            width: 310px;
            height: 118px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            padding-left: 0;


            a {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-around;
              transition: all .5s;

              &:hover {
                transform: translate3d(0, -3px, 0);
                box-shadow: 0 3px 8px rgb(0 0 0 / 20%);

              }

              .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: black;

                :nth-child(1) {
                  font-size: 16px;
                  color: red;
                }
              }

              img {
                width: 60%;
                height: 100%;
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>