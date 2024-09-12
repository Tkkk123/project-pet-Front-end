<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const cartStore = useCartStore()
const router = useRouter()

// 单选回调
const singleCheck = (item, selected) => {
  // 除了 selected 补充一个用来筛选的参数 - skuId
  cartStore.singleCheck(item.id, item.sex, item.color, selected)
}

const countChange = (value, item) => {
  const minValue = 1;
  if (value < minValue) {
    item.count = minValue;
  } else {
    item.count = value;
  }
}

const allCheck = (selected) => {
  cartStore.allCheck(selected)
}

const goToCheckout = () => {
  const selectedItems = cartStore.cartList.filter(item => item.selected)
  if (selectedItems.length > 0) {
    // 至少选择了一个商品，可以使用 selectedItems 作为结算内容
    // 将 selectedItems 对象转换为 JSON 字符串
    const selectedItemsJSON = JSON.stringify(selectedItems)
    // 导航到结算页面，传递 JSON 字符串作为查询参数
    router.push({ path: '/checkout', query: { selectedItems: selectedItemsJSON } })
  } else {
    // 没有选中商品，提示用户
    ElMessage.warning('请至少选择一个商品进行结算')
  }
}


</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="item in cartStore.cartList" :key="item.id">
              <td>
                <!-- 单选框 -->
                <el-checkbox :model-value="item.selected" @change="(selected) => singleCheck(item, selected)" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="'/detail/' + item.id"><img :src="item.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>
                    <p class="attr ellipsis">{{ item.sex }} {{ item.color }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="item.count" @change="value => countChange(value, item)" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="确认删除吗?" cancel-button-text="取消" confirm-button-text="确认"
                    @confirm="cartStore.delCart(item.id)">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <!-- 购物车列表为空时 -->
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="goToCheckout">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>





<style scoped lang="less">
.xtx-cart-page {
  // margin-top: 20px;
  width: 1240px;
  margin: 0 auto;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: red;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      color: #626161;

      &:hover {
        color: orange;
      }
    }

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 235px;
      font-size: 16px;


      .attr {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

}
</style>