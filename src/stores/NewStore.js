import { defineStore } from "pinia";
import { NewApi } from "@/apis/new";
import { reactive, ref } from "vue";
const title = ref("");
const subtitle = ref("");
const NewList = reactive([]);
export const NewStore = defineStore(
  "New",
  () => {
    const getNew = async () => {
      const res = await NewApi();
      title.value = res.title;
      subtitle.value = res.subtitle;
      NewList.push(...res.data);
    };

    return {
      getNew,
      title,
      subtitle,
      NewList,
    };
  },
  {
    persist: true,
  }
);
