<template>
  <view class="profile-container">
    <!-- 个人信息卡片 -->
    <view class="profile-card">
      <!-- 头像和在线状态 -->
      <view class="avatar-container">
        <image class="avatar" :src="userInfo.img_src"></image>
        <view class="status-badge" :class="{ online: isOnline }"></view>
      </view>

      <!-- 用户名和在线状态 -->
      <view class="user-name">
        <text class="name-text">{{ userInfo.name || "未知用户" }}</text>
        <view class="status-text">{{ isOnline ? "在线" : "离线" }}</view>
      </view>

      <!-- 联系信息卡片 - 上下布局 -->
      <view class="contact-cards">
        <!-- 电话卡片 -->
        <view class="contact-card">
          <view class="contact-icon phone-icon">
            <uni-icons
              type="phone-filled"
              size="24"
              color="#007AFF"
            ></uni-icons>
          </view>
          <view class="contact-content">
            <text class="contact-label">电话号码</text>
            <text class="contact-value">{{ userInfo.phone || "暂无" }}</text>
          </view>
        </view>

        <!-- 邮箱卡片 -->
        <view class="contact-card">
          <view class="contact-icon email-icon">
            <uni-icons
              type="email-filled"
              size="24"
              color="#4CD964"
            ></uni-icons>
          </view>
          <view class="contact-content">
            <text class="contact-label">电子邮箱</text>
            <text class="contact-value">{{ userInfo.email || "暂无" }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useLoginStore from "@/store/login/login";
import { storeToRefs } from "pinia";

const loginStore = useLoginStore();
loginStore.fetchLoginAccountAction({
  username: "admin",
  password: "admin",
});
const isLoading = ref(true);
const loadError = ref(false);
const { userInfo } = storeToRefs(loginStore);

const isOnline = computed(() => {
  return userInfo.value.status === "active" || false;
});
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 30rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);
}

.avatar-container {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 30rpx;

  .avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 80rpx;
    border: 4rpx solid #ffffff;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  }

  .status-badge {
    position: absolute;
    bottom: 10rpx;
    right: calc(50% - 80rpx);
    width: 24rpx;
    height: 24rpx;
    border-radius: 12rpx;
    background-color: #cccccc;
    border: 3rpx solid #ffffff;

    &.online {
      background-color: #4cd964; // 绿色表示在线
    }
  }
}

.user-name {
  text-align: center;
  margin-bottom: 40rpx;

  .name-text {
    font-size: 36rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 8rpx;
  }

  .status-text {
    font-size: 24rpx;
    color: #666666;
    background-color: #f2f2f2;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    display: inline-block;
  }
}

// 联系信息卡片 - 上下布局
.contact-cards {
  margin-bottom: 40rpx;
}

.contact-card {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:active {
    transform: scale(0.98);
  }

  .contact-icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40rpx;
    margin-right: 20rpx;

    .icon-inner {
      font-size: 40rpx;
    }
  }

  .phone-icon {
    background-color: rgba(0, 122, 255, 0.1);
  }

  .email-icon {
    background-color: rgba(76, 217, 100, 0.1);
  }

  .contact-content {
    flex: 1;
  }

  .contact-label {
    font-size: 24rpx;
    color: #999999;
    display: block;
    margin-bottom: 4rpx;
  }

  .contact-value {
    font-size: 30rpx;
    color: #333333;
    font-weight: 500;
  }
}

.action-buttons {
  display: flex;
  justify-content: space-between;

  .action-button {
    width: 48%;
    height: 88rpx;
    border-radius: 44rpx;
    font-size: 30rpx;
    color: #ffffff;
    border: none;
    font-weight: 500;
    box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
  }

  .phone-button {
    background: linear-gradient(to right, #007aff, #5ac8fa);
  }

  .email-button {
    background: linear-gradient(to right, #4cd964, #34c759);
  }
}
</style>
