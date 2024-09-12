<template>
  <div class="goods-sku" v-for="(sku, index) in goods" :key="index">
    <template v-if="sku.sex">
      <p>{{ sku.sex }}</p>
      <el-radio-group v-model="skuValues[index]" size="large" @change="handleRadioChange(index)">
        <el-radio-button :label="sku.male" :value="sku.male" />
        <el-radio-button :label="sku.female" :value="sku.female" />
      </el-radio-group>
    </template>
    <template v-else-if="sku.color">
      <p>{{ sku.color }}</p>
      <el-radio-group v-model="skuValues[index]" size="large" @change="handleRadioChange(index)">
        <el-radio-button :label="sku.valueName" :value="sku.valueName" />
      </el-radio-group>
    </template>
  </div>
</template>

<script setup>
import { defineProps, toRefs, defineEmits } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  goods: {
    type: Array,
    default: () => []
  }
});

const { goods } = toRefs(props);

const skuValues = ref(Array(goods.value.length).fill('')); // Initialize skuValues array

const emit = defineEmits(['change']);

const handleRadioChange = (index) => {
  const selectedValues = skuValues.value.filter(value => value !== '');
  if (selectedValues.length === props.goods.length) {
    const selectedSex = selectedValues[0];
    const selectedColor = selectedValues[1];
    emit('change', {
      sex: selectedSex,
      color: selectedColor
    });
  }
};
</script>









<style scoped lang="less">
.goods-sku {

  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>