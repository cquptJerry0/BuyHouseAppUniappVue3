<template>
  <view class="home-container">
    <!-- 一：搜索框 -->
    <view class="search-section">
      <uni-search-bar
        placeholder="输入楼盘名称、地址等"
        radius="20"
        bgColor="#ffffff"
        cancelColor="#00a884"
        @confirm="search"
        class="custom-search-bar"
      >
        <template #icons>
          <uni-icons color="#00a884" size="18" type="search" />
        </template>
      </uni-search-bar>
    </view>
    <!-- 二：导航栏 -->
    <uni-section title="热门导航" type="line">
      <uni-grid :column="5" :highlight="true" @change="handleGridClick">
        <uni-grid-item v-for="(item, index) in navItems" :key="index">
          <view class="nav-item">
            <uni-badge
              v-if="item.badge"
              :text="item.badge"
              type="error"
              size="small"
              absolute="rightTop"
            />
            <image :src="item.icon" class="nav-icon"></image>
            <text class="nav-text">{{ item.title }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-section>

    <!-- 三：筛选找房 -->
    <uni-section title="筛选找房" type="line">
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
    </uni-section>

    <!-- 四：热门房源 -->
    <uni-section title="热门房源" type="line">
      <view class="hot-section">
        <HomeHotSection>
          <template #title></template>
        </HomeHotSection>
      </view>
    </uni-section>

    <!-- 底部加载更多 -->
    <!-- <uni-load-more
      status="loading"
      :content-text="loadMoreText"
    ></uni-load-more> -->
  </view>
</template>

<script setup>
import HomeHotSection from "../home/cps/HomeHotSection.vue";
import { ref } from "vue";

// 导航数据
const navItems = [
  { title: "热门楼盘", icon: "/static/icons/hot.png", badge: "10" },
  { title: "新房", icon: "/static/icons/new.png" },
  { title: "地图找房", icon: "/static/icons/map.png" },
  { title: "学区房", icon: "/static/icons/school.png" },
  { title: "降价房", icon: "/static/icons/discount.png" },
  { title: "公园地产", icon: "/static/icons/park.png" },
  { title: "近地铁", icon: "/static/icons/subway.png" },
  { title: "小户型", icon: "/static/icons/small.png" },
  { title: "复式", icon: "/static/icons/duplex.png" },
  { title: "别墅", icon: "/static/icons/villa.png" },
];

// 筛选标签
const tabIndex = ref(0);

// 热门推荐
const recommendList = [
  { name: "越秀金融城", area: "金牛区", price: "16800" },
  { name: "龙湖三千里", area: "高新区", price: "15500" },
  { name: "华润置地", area: "武侯区", price: "19800" },
];

// 瀑布流房源
const leftHouses = [
  {
    name: "保利城",
    area: "青羊区",
    price: "14500",
    image: "/static/images/house1.jpg",
    tags: ["学区房", "地铁"],
  },
  {
    name: "万科城市之光",
    area: "锦江区",
    price: "17200",
    image: "/static/images/house3.jpg",
    tags: ["江景房", "精装"],
  },
];

const rightHouses = [
  {
    name: "融创金成",
    area: "高新区",
    price: "18500",
    image: "/static/images/house2.jpg",
    tags: ["公园旁", "现房"],
  },
  {
    name: "中海国际",
    area: "武侯区",
    price: "20100",
    image: "/static/images/house4.jpg",
    tags: ["大平层", "商业配套"],
  },
];

// 加载更多文字
const loadMoreText = {
  contentdown: "上拉显示更多",
  contentrefresh: "正在加载...",
  contentnomore: "没有更多数据了",
};

// 基础方法（仅UI架子，不实现逻辑）
function handleLocationClick() {}
function navigateToSearch() {}
function handleGridClick() {}
function handleTabChange() {}
function handleItemClick() {}
function handleCardClick() {}
</script>

<style lang="scss">
// 覆盖HomeHotSection中的标题样式
.hot-section :deep(.uni-section) {
  text-align: left;
  display: block;
  width: 100%;
}

.hot-section :deep(.uni-section-header) {
  justify-content: flex-start;
}

.home-container {
  background-color: #f8f8f8;
  min-height: 100vh;
}

// 搜索区域样式
.search-section {
  @include house-flex(row, center, center);

  width: 100%;
  padding: 20rpx 30rpx;
  background: linear-gradient(to right, #00a884, #20c997);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 自定义搜索栏样式 */
.custom-search-bar {
  width: 80% !important;
}

// 导航样式
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 0;
  position: relative;

  .nav-icon {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 10rpx;
  }

  .nav-text {
    font-size: 24rpx;
    color: #333;
  }
}

// 筛选内容区样式
.filter-content {
  margin-top: 20rpx;
}

// 推荐房源样式
.recommend-section {
  margin-bottom: 20rpx;

  .item-price {
    color: #f56c6c;
    font-size: 24rpx;
    font-weight: bold;
  }
}

// 瀑布流样式
.waterfall-layout {
  padding: 10rpx;

  .waterfall-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 10rpx;

    text {
      font-size: 30rpx;
      font-weight: bold;
    }
  }

  .waterfall-container {
    display: flex;

    .waterfall-column {
      flex: 1;
      padding: 0 10rpx;

      .house-card {
        margin-bottom: 20rpx;
      }
    }
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rpx;

    .uni-tag {
      margin-right: 10rpx;
      margin-bottom: 10rpx;
    }
  }
}
</style>
