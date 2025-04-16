<template>
  <view class="estates-item" @click="handleClick">
    <!-- 图片区域 -->
    <view class="estates-media">
      <image
        class="estates-image"
        :src="property.img"
        mode="aspectFill"
      ></image>

      <!-- 状态标签 -->
      <view class="estates-badge" :class="getBadgeClass(property.stateDeas)">
        {{ property.stateDeas }}
      </view>

      <!-- 右下角查看数 -->
      <view class="estates-views">
        <text class="icon-eye"></text>
        <text>{{ property.views }}</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="estates-content">
      <!-- 标题区 -->
      <view class="estates-header">
        <text class="estates-name">{{ property.name }}</text>
        <text class="estates-area">{{ property.area }}</text>
      </view>

      <!-- 价格区 -->
      <view class="estates-price-section">
        <view class="estates-price-primary">
          <text class="estates-price">{{ property.price }}</text>
          <text class="estates-price-unit">元/㎡</text>
        </view>
        <text class="estates-price-range"
          >{{ formatPrice(property.min_price) }}-{{
            formatPrice(property.max_price)
          }}万</text
        >
      </view>

      <!-- 标签区 -->
      <view class="estates-tags">
        <text
          class="estates-tag"
          v-for="(tag, index) in getTags()"
          :key="index"
          >{{ tag }}</text
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps<{
  property: EstatesItem;
}>();

const emit = defineEmits<{
  click: [id: number];
}>();

function handleClick() {
  emit("click", props.property.id);
}

function formatPrice(price: number): string {
  return (price / 10000).toFixed(0);
}

// 动态获取标签类名
function getBadgeClass(status: string): string {
  const statusMap: Record<string, string> = {
    在售: "badge-selling",
    即将开盘: "badge-coming",
    已售罄: "badge-sellout",
  };
  return statusMap[status] || "badge-default";
}

// 这里可以根据房产信息动态生成标签
function getTags(): string[] {
  // 示例标签，实际项目中可以根据property属性动态生成
  return ["精装修", "近地铁", "公园旁"];
}
</script>

<style lang="scss">
.estates-item {
  @include house-flex(column, flex-start, stretch);
  width: 100%;
  overflow: hidden;
  border-radius: $house-radius-md;
  background-color: $house-color-white;
  box-shadow: $house-shadow-sm;

  &:active {
    transform: scale(0.98);
  }

  .estates-media {
    position: relative;
    width: 100%;

    height: 0;
    padding-bottom: 70%; // 创建宽高比10:7

    overflow: hidden;

    .estates-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .estates-badge {
      position: absolute;
      top: $house-spacing-sm;
      right: $house-spacing-sm;
      padding: 4rpx $house-spacing-sm;
      border-radius: $house-radius-lg;
      font-size: $house-font-size-xs;
      font-weight: $house-font-weight-medium;
      color: $house-color-white;

      // &.表示同一个元素有两个类
      &.badge-selling {
        background-color: $house-tag-selling;
      }

      &.badge-coming {
        background-color: $house-tag-coming;
      }

      &.badge-sellout {
        background-color: rgba(#ebe0e0, 0.7); // 30%透明
        color: rgba($house-color-dark, 0.8); // 文字轻微透明
      }
    }

    .estates-views {
      position: absolute;
      bottom: $house-spacing-sm;
      right: $house-spacing-sm;
      padding: 4rpx $house-spacing-sm;
      border-radius: $house-radius-lg;
      background-color: rgba(0, 0, 0, 0.5);
      color: $house-color-white;
      font-size: $house-font-size-xs;
      @include house-flex(row, center, center);

      .icon-eye {
        display: inline-block;
        margin-right: 4rpx;

        &::before {
          content: "👁";
        }
      }
    }
  }

  .estates-content {
    padding: $house-spacing-md;

    .estates-header {
      margin-bottom: $house-spacing-sm;

      .estates-name {
        display: block;
        font-size: $house-font-size-lg;
        font-weight: $house-font-weight-bold;
        color: $text-color;
        margin-bottom: 4rpx;
        @include house-text-ellipsis();
      }

      .estates-area {
        display: block;
        font-size: $house-font-size-sm;
        color: $house-color-gray;
        @include house-text-ellipsis();
      }
    }

    .estates-price-section {
      @include house-flex(row, space-between, baseline);
      margin-bottom: $house-spacing-sm;

      .estates-price-primary {
        @include house-flex(row, flex-start, baseline);

        .estates-price {
          font-size: $house-font-size-xl;
          font-weight: $house-font-weight-bold;
          color: $hot-color;
        }

        .estates-price-unit {
          font-size: $house-font-size-xs;
          color: $house-color-gray;
          margin-left: 2rpx;
        }
      }

      .estates-price-range {
        font-size: $house-font-size-sm;
        color: $house-color-gray;
      }
    }

    .estates-tags {
      @include house-flex(row, flex-start, center);
      flex-wrap: wrap;

      .estates-tag {
        margin-right: $house-spacing-xs;
        margin-bottom: $house-spacing-xs;
        background-color: rgba($primary-color, 0.1);
        color: $primary-color;
        font-size: $house-font-size-xs;
        padding: 2rpx $house-spacing-sm;
        border-radius: $house-radius-sm;
      }
    }
  }
}
</style>
