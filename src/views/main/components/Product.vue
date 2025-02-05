<script setup>
import Panel from './Panel.vue';
import Card from './Card.vue';
import { useCategoryStore } from '@/stores/Category';
const categoryStore = useCategoryStore();
const categoryList = categoryStore.categoryList; // 引用全部分类中的数据
</script>

<template>
  <div class="home-product">
    <!-- 只渲染前两个标题 -->
    <Panel v-for="cate in categoryList.slice(0, 2)" :key="cate.id" :title="cate.name" :subTitle="cate.subName">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazy="cate.picture" />
        </RouterLink>
        <ul class="goods-list">
          <!-- 只渲染8张宠物卡片数据 -->
          <li v-for="card in cate.children.slice(0, 8)" :key="card.id">
            <Card :cards="card" />
          </li>
        </ul>
      </div>
    </Panel>
  </div>
</template>


<style scoped lang='less'>
.home-product {
  background: #fff;
  margin-top: 20px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: red;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }


  }
}
</style>