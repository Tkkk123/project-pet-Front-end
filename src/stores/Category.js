import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/category'

export const useCategoryStore = defineStore('category', () => {
    const categoryList = reactive([])
    const getCategory = async () => {
        // 清空 categoryList
        categoryList.splice(0)
        // 或者 categoryList.length = 0

        const { data } = await getCategoryAPI()
        categoryList.push(...data)
        // console.log(categoryList)
    }

    return {
        categoryList,
        getCategory
    }
})
