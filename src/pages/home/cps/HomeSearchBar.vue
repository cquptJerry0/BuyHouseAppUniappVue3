<template>
  <view class="search-container">
    <!-- 城市选择器 -->
    <view class="city-select" @click="onCityClick">
      <text class="city-text">{{ city }}</text>
      <uni-icons type="arrowdown" size="12" color="#666"></uni-icons>
    </view>

    <view class="search-box" @click="goToSearchPage">
      <uni-icons type="search" size="16" color="#999"></uni-icons>
      <text class="placeholder">{{ placeholder }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  city: {
    type: String,
    default: "成都",
  },
  placeholder: {
    type: String,
    default: "搜索小区、街道名称",
  },
});

const emit = defineEmits(["citySelect"]);
const searchText = ref("");

// 城市选择
function onCityClick() {
  emit("citySelect");
}

// 跳转到搜索页面
function goToSearchPage() {
  uni.navigateTo({
    url: "/pages/search/index",
  });
}
</script>

<style lang="scss">
.search-container {
  @include house-flex(row, flex-start, center);
  padding: $house-spacing-md;
  background-color: $house-color-white;

  .city-select {
    @include house-flex(row, center, center);
    padding-right: $house-spacing-sm;
    margin-right: $house-spacing-sm;

    .city-text {
      font-size: $house-font-size-md;
      color: $text-color;
      margin-right: 4rpx;
    }
  }

  .search-box {
    flex: 1;
    height: 64rpx;
    background-color: #f5f5f5;
    border-radius: 32rpx;
    padding: 0 20rpx;
    @include house-flex(row, flex-start, center);

    .placeholder {
      color: #999;
      font-size: 28rpx;
      margin-left: 10rpx;
    }
  }
}
</style>
