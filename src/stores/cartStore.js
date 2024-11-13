import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    // 定义添加商品到购物车的方法
    const addCart = (goods) => {
      const { id, name, picture, price, count, sex, color } = goods;
      const itemIndex = cartList.value.findIndex(
        (item) => item.id === id && item.sex === sex && item.color === color
      );
      if (itemIndex !== -1) {
        // 商品已存在于购物车中，更新数量
        cartList.value[itemIndex].count += count;
      } else {
        // 商品不存在于购物车中，将其添加到购物车
        cartList.value.push({
          id,
          name,
          picture,
          price,
          count,
          sex,
          color,
        });
      }
    };

    // 删除购物车
    const delCart = (id) => {
      const idx = cartList.value.findIndex((item) => item.id === id);
      cartList.value.splice(idx, 1);
    };

    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    // 单选功能
    const singleCheck = (id, sex, color, selected) => {
      const item = cartList.value.find(
        (item) => item.id === id && item.sex === sex && item.color === color
      );
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 计算属性
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      addCart,
      delCart,
      singleCheck,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
