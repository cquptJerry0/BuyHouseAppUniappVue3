<template>
  <view class="home">
    <!-- 搜索栏 -->
    <HomeSearchBar />

    <!-- 轮播图 -->
    <swiper class="home__banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <image :src="item.imageUrl" mode="aspectFill" class="home__banner-img" />
      </swiper-item>
    </swiper>

    <!-- 功能导航区 -->
    <view class="home__nav-grid">
      <view class="home__nav-row">
        <view class="home__nav-item" v-for="(item, index) in navItems.slice(0, 5)" :key="index">
          <view class="home__nav-icon" :class="`home__nav-icon--${item.type}`">
            <text>{{ item.count }}</text>
          </view>
          <text class="home__nav-text">{{ item.title }}</text>
        </view>
      </view>
      <view class="home__nav-row">
        <view class="home__nav-item" v-for="(item, index) in navItems.slice(5, 10)" :key="index">
          <view class="home__nav-icon" :class="`home__nav-icon--${item.type}`">
            <text v-if="item.badge" class="home__nav-badge">{{ item.badge }}</text>
          </view>
          <text class="home__nav-text">{{ item.title }}</text>
        </view>
      </view>
      <view class="home__nav-row">
        <view class="home__nav-item" v-for="(item, index) in navItems.slice(10, 15)" :key="index">
          <view class="home__nav-icon" :class="`home__nav-icon--${item.type}`">
            <text v-if="item.badge" class="home__nav-badge">{{ item.badge }}</text>
          </view>
          <text class="home__nav-text">{{ item.title }}</text>
        </view>
      </view>
    </view>

    <HomeHotSection />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Banner, NavItem, Property } from './types'
import HomeHotSection from './cps/HomeHotSection.vue';
import HomeSearchBar from './cps/HomeSearchBar.vue';

// 在首页提前预加载搜索页

onMounted(() => {
  // @ts-ignore
  if (uni.getSystemInfoSync().platform === 'mp-weixin' && wx.preloadPage) {
    // @ts-ignore
    wx.preloadPage({
      url: '/pages/search/index'
    });
  }
});
// 轮播图数据
const bannerList = ref<Banner[]>([
  {
    id: 1,
    imageUrl: '/static/images/banner1.jpg',
    title: '金融城8号',
    subtitle: '时间 终与地标相逢',
    phone: 'T:028 8812 3888'
  },
  {
    id: 2,
    imageUrl: '/static/images/banner2.jpg',
    title: '龙湖三千里',
    subtitle: '品质生活从这里开始',
    phone: 'T:028 8756 5432'
  },

  {
    id: 3,
    imageUrl: '/static/images/banner3.jpg',
    title: '华润置地',
    subtitle: '城市向上生长',
    phone: 'T:028 6677 8899'
  }
]);

// 导航项数据
const navItems = ref<NavItem[]>([
  { id: 1, title: '热门楼盘', count: '25', type: 'hot' },
  { id: 2, title: '即将预售', count: '20', type: 'coming' },
  { id: 3, title: '最新取证', count: '11', type: 'new' },
  { id: 4, title: '优惠楼盘', count: '25', type: 'discount' },
  { id: 5, title: '在售楼盘', count: '718', type: 'selling' },
  { id: 6, title: '房贷计算', type: 'calculator' },
  { id: 7, title: '楼盘价单', type: 'price', badge: '新' },
  { id: 8, title: '网签地图', type: 'map', badge: '热' },
  { id: 9, title: '优选好房', type: 'best' },
  { id: 10, title: '户型排行榜', type: 'ranking', badge: '热' },
  { id: 11, title: '房产数据', type: 'data', badge: '2023' },
  { id: 12, title: '土拍信息', type: 'land' },
  { id: 13, title: '城市成交日历', type: 'calendar' },
  { id: 14, title: '法规库', type: 'law', badge: '新' },
  { id: 15, title: '更多', type: 'more' }
]);

// 房产数据
const properties = ref<Property[]>([
  {
    id: 1,
    title: '越秀阅沙',
    location: '香蜜区·金沙',
    imageUrl: '/static/images/property1.jpg',
    tags: ['入市', '3D', '效果图', '配套', '地段'],
    features: [
      { icon: '🏠', text: '入市率先实现3D月光沙盘1.5', color: '#4CD964' },
      { icon: '🏆', text: '免费专车接送看房', color: '#FF9500' },
      { icon: '🔥', text: '2023年10月', color: '#FF3B30' }
    ]
  },
  {
    id: 2,
    title: '龙湖天钜',
    location: '高新区·天府大道',
    imageUrl: '/static/images/property2.jpg',
    price: '优惠',
    tags: ['特价', '地铁', '学区房'],
    features: [
      { icon: '🏠', text: '地铁1号线旁高端住宅', color: '#4CD964' },
      { icon: '🏆', text: '首付30万起', color: '#FF9500' }
    ]
  }
]);


</script>

<style lang="scss">
// 变量定义
:root {
  --primary-color: #00a884;
  --secondary-color: #f5f5f5;
  --text-color: #333;
  --text-color-light: #666;
  --border-color: #eee;
  --hot-color: #ff6b6b;
  --coming-color: #ffa94d;
  --new-color: #20c997;
  --discount-color: #339af0;
  --selling-color: #9775fa;
}

// 基础样式
.home {
  background-color: #f8f8f8;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &__header {
    background-color: var(--primary-color);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    height: 44px;
  }

  &__add-btn {
    display: flex;
    align-items: center;
    font-size: 14px;

    .icon {
      margin-right: 2px;
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__controls {
    display: flex;
    gap: 10px;

    .icon {
      font-size: 16px;
    }
  }

  &__search-bar {
    background-color: white;
    display: flex;
    padding: 10px 15px;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
  }

  &__city-selector {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 10px;
    border-right: 1px solid var(--border-color);

    .icon {
      font-size: 12px;
      margin-left: 2px;
    }
  }

  &__search-input {
    flex: 1;
    margin: 0 10px;
    color: var(--text-color-light);
    font-size: 14px;
  }

  &__calendar-btn {
    display: flex;
    align-items: center;
    font-size: 14px;

    .icon {
      margin-right: 2px;
    }
  }

  &__banner {
    height: 180px;

    &-img {
      width: 100%;
      height: 100%;
    }
  }

  &__nav-grid {
    background-color: white;
    padding: 15px 0;
    margin-bottom: 10px;
  }

  &__nav-row {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
  }

  &__nav-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    position: relative;
    color: white;
    font-weight: bold;

    &--hot {
      background-color: var(--hot-color);
    }

    &--coming {
      background-color: var(--coming-color);
    }

    &--new {
      background-color: var(--new-color);
    }

    &--discount {
      background-color: var(--discount-color);
    }

    &--selling {
      background-color: var(--selling-color);
    }

    &--calculator {
      background-color: #4CD964;
    }

    &--price {
      background-color: #5AC8FA;
    }

    &--map {
      background-color: #007AFF;
    }

    &--best {
      background-color: #FF9500;
    }

    &--ranking {
      background-color: #FF2D55;
    }

    &--data {
      background-color: #5856D6;
    }

    &--land {
      background-color: #FF3B30;
    }

    &--calendar {
      background-color: #34C759;
    }

    &--law {
      background-color: #AF52DE;
    }

    &--more {
      background-color: #8E8E93;
    }
  }

  &__nav-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #FF3B30;
    color: white;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 10px;
    font-weight: normal;
  }

  &__nav-text {
    font-size: 12px;
    color: var(--text-color);
  }

  &__hot-section {
    background-color: white;
    padding: 15px;
  }

  &__section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__section-title {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-color);
    position: relative;
    padding-left: 10px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 16px;
      background-color: var(--primary-color);
    }
  }

  &__section-more {
    font-size: 12px;
    color: var(--text-color-light);
    display: flex;
    align-items: center;

    .icon {
      margin-left: 2px;
    }
  }

  &__property-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__property-item {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &__property-image-container {
    position: relative;
    height: 180px;
  }

  &__property-image {
    width: 100%;
    height: 100%;
  }

  &__property-tags {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__property-tag {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 2px;
  }

  &__property-price {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #FF3B30;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 2px;
  }

  &__property-info {
    padding: 10px;
  }

  &__property-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__property-location {
    font-size: 12px;
    color: var(--text-color-light);
    margin-bottom: 10px;
  }

  &__property-features {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__property-feature {
    display: flex;
    align-items: center;
  }

  &__property-feature-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    margin-right: 5px;
    color: white;
  }

  &__property-feature-text {
    font-size: 12px;
    color: var(--text-color-light);
  }

  &__tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    display: flex;
    height: 50px;
    border-top: 1px solid var(--border-color);
  }

  &__tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--active {
      color: var(--primary-color);
    }
  }

  &__tab-icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  &__tab-text {
    font-size: 10px;
  }
}
</style>