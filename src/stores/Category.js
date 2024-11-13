import { reactive } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/category";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = reactive([]);
  const getCategory = async () => {
    const { data } = await getCategoryAPI();
    categoryList.push(...data);
  };

  return {
    categoryList,
    getCategory,
  };
});
