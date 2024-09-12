<script setup>
import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, reactive, } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useAddressStore } from '@/stores/Address'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const addressStore = useAddressStore();

const router = useRouter()
const route = useRoute()

const checkInfo = ref({}) // 订单对象
const curAddress = ref({}) // 默认地址
const selectedItems = ref([])
const selectedData = ref(null)

const getCheckInfo = async () => {
  const res = await getCheckInfoAPI();
  checkInfo.value = res.result;
  if (addressStore.$state.addresses) {
    const storedAddresses = addressStore.$state.addresses;
    storedAddresses.forEach(address => {
      address.isDefault = 0;
      checkInfo.value.userAddresses.push(address);
    });
  }
  const defaultAddress = checkInfo.value.userAddresses.find(item => item.isDefault === 0);
  curAddress.value = defaultAddress;
}

onMounted(() => {
  getCheckInfo()
  selectedData.value = calculateSelectedData()
})

const showDialog = ref(false)
const showAddAddressDialog = ref(false);

const newAddress = reactive({
  receiver: '',
  contact: '',
  address: ''
});
const addressRules = {
  receiver: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
  ],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入收货地址', trigger: 'blur' }
  ]
};
const addressForm = ref(null);
function Address() {
  const valid = addressForm.value.validate();
  if (valid) {
    addressStore.addAddress(newAddress);
    showAddAddressDialog.value = false;
    // 更新 curAddress 为新添加的地址
    curAddress.value = newAddress;
    // 更新 checkInfo.userAddresses 为最新的地址列表
    checkInfo.value.userAddresses.push(newAddress);
  }
}


const switchAddress = (item) => {
  curAddress.value = item;
  showDialog.value = false
}
const createOrder = () => {
  if (!userStore.userInfo.token) {
    ElMessage({ type: 'warning', message: ('请先登录') })
    router.push({
      path: '/login',
    })
  } else {
    router.push({
      path: '/pay',
    })
    const CardStore = useCartStore()
    CardStore.clearCart()
  }

}


const calculateSelectedData = () => {
  if (route.query.selectedItems) {
    const itemsArray = JSON.parse(route.query.selectedItems)
    selectedItems.value = itemsArray
    const itemCount = selectedItems.value.reduce((total, item) => total + item.count, 0)
    const totalPrice = selectedItems.value.reduce((total, item) => total + (item.price * item.count), 0)
    const shippingFee = totalPrice * 0.02
    const totalAmount = totalPrice + shippingFee
    return {
      itemCount,
      totalPrice: totalPrice.toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    }
  }
}
</script>


<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收货人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="showAddAddressDialog = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedItems" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="">
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p class="attr ellipsis">{{ item.sex }} {{ item.color }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ (item.price * item.count).toFixed(2) }}</td>
                <td>&yen;{{ (item.price * item.count).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total" v-if="selectedData">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ selectedData.itemCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ selectedData.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运费：</dt>
              <dd>¥{{ selectedData.shippingFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ selectedData.totalAmount }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" @click="switchAddress(item)" v-for="item in checkInfo.userAddresses" :key="item.id">
        <ul>
          <li><span>收货人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span> {{ item.fullLocation ? item.fullLocation + item.address : item.address }}</li>
        </ul>

      </div>
    </div>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog v-model="showAddAddressDialog" title="添加收货地址" width="30%" center>
    <el-form :model="newAddress" :rules="addressRules" ref="addressForm" label-width="80px">
      <el-form-item label="收货人" prop="receiver">
        <el-input v-model="newAddress.receiver" />
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="newAddress.contact" />
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="newAddress.address" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddAddressDialog = false">取消</el-button>
        <el-button type="primary" @click="Address">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="less">
.xtx-pay-checkout-page {
  width: 1240px;
  margin: 0 auto;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: red;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }

        .attr {
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: red;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: red;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: red;
      background: lighten(red, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>