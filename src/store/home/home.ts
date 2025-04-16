import { defineStore } from "pinia";
import { getEstatesData } from "@/service/home/home";
import { toValue } from "vue";

interface Estate {
  id: number | string;
  [key: string]: any; // 允许任意属性
}

const useHomeStore = defineStore("home", {
  state: () => ({
    estates: [] as Estate[],
    total: 0,
  }),

  actions: {
    // 应该修改为：
    async fetchGetEstatesData(page = 1, pageSize = 10) {
      try {
        console.log("请求API，页码:", page);
        const estatesResult = await getEstatesData(page, pageSize);
        console.log("API返回数据:", estatesResult);

        if (page === 1) {
          // 第一页，替换数据
          this.estates = estatesResult.data.data;
        } else {
          // 其他页，追加数据
          this.estates = [...this.estates, ...estatesResult.data.data];
        }

        // 更新总数
        this.total = this.estates.length;
        console.log("store中数据更新后:", this.estates.length, "条");
        return true;
      } catch (error) {
        console.error("API请求失败:", error);
        return false;
      }
    },
  },
});

export default useHomeStore;
