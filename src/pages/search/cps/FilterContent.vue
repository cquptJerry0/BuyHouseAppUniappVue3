<!-- 三：筛选找房 -->
<template>
  <!-- 区域筛选 -->
  <uni-segmented-control
    :current="tabIndex"
    :values="['区域', '价格', '户型', '更多']"
    @clickItem="handleTabChange"
    styleType="button"
    activeColor="#00a884"
  ></uni-segmented-control>

  <!-- 筛选内容区域 -->
  <view class="filter-content">
    <!-- 热门推荐 -->
    <view class="recommend-section">
      <uni-list>
        <uni-list-item
          v-for="(item, index) in recommendList"
          :key="index"
          :title="item.name"
          :note="item.area"
          thumb="/static/images/house-thumb.png"
          rightText="查看"
          showArrow
          clickable
          @click="handleItemClick"
        >
          <template #footer>
            <view class="item-price">¥{{ item.price }}元/㎡</view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script setup lang="ts">
import HomeHotSection from "@/pages/home/cps/HomeHotSection.vue";
import { ref } from "vue";
const tabIndex = ref(0);
</script>
