<template>
  <view class="hot-section">
    <slot name="title">
      <view class="section-header">
        <view class="title-divider"></view>
        <text class="section-title">热门房源</text>
        <view class="title-divider"></view>
      </view>
    </slot>

    <!-- 定义其他插槽 -->
    <slot name="filter"></slot>

    <view class="waterfall-container">
      <!-- 左列 -->
      <view class="waterfall-column">
        <template v-for="item in leftItems" :key="item.id">
          <EstatesItem :property="item" @click="handleClick" />
        </template>
      </view>
      <!-- 右列 -->
      <view class="waterfall-column">
        <view class="waterfall-item" v-for="item in rightItems" :key="item.id">
          <EstatesItem :property="item" @click="handleClick" />
        </view>
      </view>
    </view>

    <uni-load-more
      :status="loadMoreStatus"
      :showIcon="true"
      iconType="circle"
      :iconSize="24"
      color="#3c9cff"
      :contentText="contentText"
      :contentBgStyle="contentBgStyle"
      @clickLoadMore="loadMore"
    />
  </view>
</template>

<script lang="ts" setup>
import useHomeStore from "@/store/home/home";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import EstatesItem from "@/componets/EstatesItem/EstatesItem.vue";
import { onReachBottom } from "@dcloudio/uni-app";

// 1. 拿数据
const homeStore = useHomeStore();
const page = ref<number>(1);
homeStore.fetchGetEstatesData(page.value);

// 2. 创建响应式引用
const rightItems = ref<any[]>([]);
const leftItems = ref<any[]>([]);
const { estates, total } = storeToRefs(homeStore); // 创建响应式引用

// 3. 分发以及下拉加载逻辑
// 配置uni-load-more 的参数
type loadMoreStatus = "more" | "loading" | "noMore";
const loadMoreStatus = ref<loadMoreStatus>("more");
const contentText = {
  contentdown: "上拉显示更多", // 状态为'more'时显示的文本
  contentrefresh: "正在加载...", // 状态为'loading'时显示的文本
  contentnomore: "没有更多楼盘了", // 状态为'noMore'时显示的文本
};
const contentBgStyle = {
  backgroundColor: "#f8f8f8",
  padding: "10px 0",
};
const isFirstLoad = ref<boolean>(true);

const distributeItems = () => {
  if (isFirstLoad.value) {
    leftItems.value = [];
    rightItems.value = [];
    isFirstLoad.value = false;
  }
  // 正确使用 estates.value 访问数组
  const startIndex = leftItems.value.length + rightItems.value.length;
  if (Array.isArray(estates.value) && estates.value.length > startIndex) {
    for (let i = startIndex; i < estates.value.length; i++) {
      const item = estates.value[i];
      if (leftItems.value.length <= rightItems.value.length) {
        leftItems.value.push(item);
      } else {
        rightItems.value.push(item);
      }
    }
  }
};

const loadMore = async () => {
  if (loadMoreStatus.value !== "more") return;
  try {
    loadMoreStatus.value = "loading";
    // 记录当前数据长度
    const currentLength = estates.value.length;
    // 加载下一页
    page.value++;
    await homeStore.fetchGetEstatesData(page.value);
    // 检查是否有新数据
    if (estates.value.length === currentLength) {
      loadMoreStatus.value = "noMore";
    } else {
      loadMoreStatus.value = "more";
    }
  } catch (error) {
    console.error("加载失败:", error);
    loadMoreStatus.value = "more";
  }
};

watch(
  () => estates.value,
  () => {
    distributeItems();
  },
  { immediate: true, deep: true }
);

onReachBottom(() => {
  if (loadMoreStatus.value === "more") {
    loadMore();
  }
});
</script>

<style lang="scss" scoped>
.hot-section {
  @include house-flex(column);

  .section-header {
    @include house-flex(row, center, center);
    margin: $house-spacing-lg 0;

    .title-divider {
      height: 2rpx;
      width: 60rpx;
      background-color: $house-color-border;
      margin: 0 $house-spacing-md;
    }

    .section-title {
      @include section-title-left;
      font-size: $house-font-size-lg;
      font-weight: $house-font-weight-medium;
      color: $text-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -8rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: $house-color-primary;
        border-radius: $house-radius-xs;
      }
    }
  }

  .waterfall-container {
    @include house-flex(row, flex-start, stretch);
    padding: 10rpx;
    box-sizing: border-box;

    .waterfall-column {
      flex: 1;
      padding: 0 5rpx;
    }

    .waterfall-item {
      @include house-card();
      margin-bottom: $house-spacing-sm;

      image {
        width: 100%;
        height: auto;
      }

      .item-title {
        font-size: $house-font-size-md;
        font-weight: $house-font-weight-bold;
        padding: $house-spacing-sm;
        @include house-text-ellipsis();
      }

      .item-price {
        color: $hot-color;
        font-size: $house-font-size-md;
        padding: 0 $house-spacing-sm $house-spacing-sm;
      }
    }
  }
}
</style>
