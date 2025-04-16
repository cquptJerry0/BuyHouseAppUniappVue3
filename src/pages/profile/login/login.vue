<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png"></image>
      <text class="title">欢迎登录</text>
    </view>

    <view class="login-methods">
      <!-- 微信登录按钮 -->
      <button
        class="login-btn wechat-login-btn"
        open-type="getUserInfo"
        @getuserinfo="handleWechatLogin"
      >
        微信一键登录
      </button>

      <!-- 手机号登录按钮 -->
      <button
        class="login-btn phone-login-btn"
        open-type="getPhoneNumber"
        @getphonenumber="handlePhoneLogin"
      >
        手机号登录
      </button>

      <!-- 其他登录方式 -->
      <view class="other-login-title">其他登录方式</view>
      <view class="other-login-methods">
        <view class="other-login-item" @click="goToPasswordLogin"
          >账号密码登录</view
        >
        <view class="other-login-item" @click="goToRegister">新用户注册</view>
      </view>
    </view>

    <!-- 登录协议 -->
    <view class="login-agreement">
      <checkbox :checked="agreeProtocol" @click="toggleAgreement"></checkbox>
      <text class="agreement-text">
        登录即代表您已同意
        <text class="link" @click="showUserProtocol">《用户协议》</text>
        和
        <text class="link" @click="showPrivacyPolicy">《隐私政策》</text>
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLogin } from "@/hooks/useLogin";

const { agreeProtocol, toggleAgreement, showUserProtocol, showPrivacyPolicy } =
  useLogin();
</script>

<style lang="scss" scoped>
.login-container {
  padding: 60rpx 40rpx;

  .login-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }

    .title {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .login-methods {
    .login-btn {
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 45rpx;
      font-size: 32rpx;
      margin-bottom: 30rpx;
    }

    .wechat-login-btn {
      background-color: #07c160;
      color: #fff;
    }

    .phone-login-btn {
      background-color: #1989fa;
      color: #fff;
    }

    .other-login-title {
      text-align: center;
      font-size: 28rpx;
      color: #999;
      margin: 50rpx 0 30rpx;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 100rpx;
        height: 1px;
        background-color: #eee;
      }

      &::before {
        left: 140rpx;
      }

      &::after {
        right: 140rpx;
      }
    }

    .other-login-methods {
      display: flex;
      justify-content: space-around;

      .other-login-item {
        font-size: 28rpx;
        color: #666;
        padding: 10rpx 0;
      }
    }
  }

  .login-agreement {
    display: flex;
    align-items: center;
    margin-top: 60rpx;
    padding: 0 20rpx;

    .agreement-text {
      font-size: 24rpx;
      color: #999;
      margin-left: 10rpx;

      .link {
        color: #1989fa;
      }
    }
  }
}
</style>
