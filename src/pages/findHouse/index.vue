<template>
    <view class="find">
        <!-- 页面内容 -->
        <view class="find__header">
            <text class="find__title">全部楼盘</text>
        </view>

        <view class="find__content">
            <text>这是找房页面内容</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
// 基础数据
const title = ref('找房页面');

// 方法示例
const handleClick = () => {
    uni.showToast({
        title: '点击成功',
        icon: 'success'
    });
};


</script>

<style lang="scss">
.find {
    padding: 20px;

    &__header {
        margin-bottom: 20px;
    }

    &__title {
        font-size: 18px;
        font-weight: bold;
    }

    &__content {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
    }
}
</style>