<template>
  <view class="index">
    <view><span>首页广告</span></view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useLoginStore from "@/store/login/login";
onMounted(async () => {
  // 使用本地存储判断是否首次加载
  const isFirstLoad = !uni.getStorageSync("hasLaunched");
  const loginStore = useLoginStore();

  if (isFirstLoad) {
    // 首次加载，设置标记并延迟跳
    console.log(loginStore);
    // 显示欢迎页或引导页
    console.log("首次加载应用");

    // 延迟后跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: "../home/index",
        fail: () => {
          // 降级处理 - 使用reLaunch而非navigateTo
          uni.reLaunch({ url: "/pages/home/index" });
        },
      });
    }, 300);
  } else {
    // 非首次加载，直接跳转
    console.log("重复加载应用");

    setTimeout(() => {
      uni.switchTab({
        url: "../home/index",
        fail: () => {
          // 降级处理 - 使用reLaunch而非navigateTo
          uni.reLaunch({ url: "/pages/home/index" });
        },
      });
    }, 300);
  }
});
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
}
</style>
