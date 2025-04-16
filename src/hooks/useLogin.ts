// src/hooks/useLogin.ts
import { ref, Ref } from "vue";

// 定义登录响应接口
interface LoginResponse {
  success: boolean;
  token?: string;
  userInfo?: UserInfo;
  message?: string;
}

// 定义用户信息接口
interface UserInfo {
  id?: string | number;
  nickName?: string;
  avatarUrl?: string;
  gender?: number;
  [key: string]: any;
}

// 微信登录事件接口
interface WechatLoginEvent {
  detail: {
    errMsg: string;
    userInfo?: UserInfo;
    rawData?: string;
    signature?: string;
    encryptedData?: string;
    iv?: string;
  };
}

// 手机号登录事件接口
interface PhoneLoginEvent {
  detail: {
    errMsg: string;
    encryptedData?: string;
    iv?: string;
  };
}

// 服务器登录请求参数接口
interface LoginRequestParams {
  url: string;
  data: Record<string, any>;
}

export function useLogin() {
  const agreeProtocol: Ref<boolean> = ref(true);

  // 切换协议同意状态
  function toggleAgreement(): void {
    agreeProtocol.value = !agreeProtocol.value;
  }

  // 显示用户协议
  function showUserProtocol(): void {
    uni.navigateTo({
      url: "/pages/common/agreement?type=user",
    });
  }

  // 显示隐私政策
  function showPrivacyPolicy(): void {
    uni.navigateTo({
      url: "/pages/common/agreement?type=privacy",
    });
  }

  // 检查是否同意协议
  function checkAgreement(): boolean {
    if (!agreeProtocol.value) {
      uni.showToast({
        title: "请先同意用户协议和隐私政策",
        icon: "none",
      });
      return false;
    }
    return true;
  }

  // 微信登录
  function handleWechatLogin(e: WechatLoginEvent): void {
    if (!checkAgreement()) return;

    if (e.detail.errMsg === "getUserInfo:ok" && e.detail.userInfo) {
      const userInfo = e.detail.userInfo;

      // 执行登录
      uni.login({
        provider: "weixin",
        success: (loginRes: UniNamespace.LoginRes) => {
          // 发送code和用户信息到服务器
          loginWithServer({
            url: "https://your-api.com/login",
            data: {
              code: loginRes.code,
              userInfo: userInfo,
            },
          });
        },
        fail: () => {
          showLoginError("登录失败，请重试");
        },
      });
    } else {
      showLoginError("您已取消授权登录");
    }
  }

  // 手机号登录
  function handlePhoneLogin(e: PhoneLoginEvent): void {
    if (!checkAgreement()) return;

    if (e.detail.errMsg === "getPhoneNumber:ok") {
      uni.login({
        provider: "weixin",
        success: (loginRes: UniNamespace.LoginRes) => {
          // 发送code和加密的手机号信息到服务器
          loginWithServer({
            url: "https://your-api.com/login/phone",
            data: {
              code: loginRes.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
            },
          });
        },
      });
    } else {
      showLoginError("您已取消授权手机号");
    }
  }

  // 密码登录
  function handlePasswordLogin(username: string, password: string): void {
    if (!checkAgreement()) return;

    if (!username || !password) {
      showLoginError("请输入用户名和密码");
      return;
    }

    loginWithServer({
      url: "https://your-api.com/login/password",
      data: {
        username,
        password,
      },
    });
  }

  // 与服务器通信的登录函数
  function loginWithServer({ url, data }: LoginRequestParams): void {
    uni.request({
      url,
      method: "POST",
      data,
      success: (res: UniNamespace.RequestSuccessCallbackResult) => {
        const responseData = res.data as LoginResponse;
        if (responseData.success) {
          // 保存登录状态和token
          if (responseData.token) {
            uni.setStorageSync("token", responseData.token);
          }
          
          if (responseData.userInfo) {
            uni.setStorageSync("userInfo", responseData.userInfo);
          }

          // 跳转到首页
          uni.switchTab({
            url: "/pages/index/index",
          });
        } else {
          showLoginError(responseData.message || "登录失败，请重试");
        }
      },
      fail: () => {
        showLoginError("网络错误，请稍后再试");
      },
    });
  }

  // 显示登录错误信息
  function showLoginError(message: string): void {
    uni.showToast({
      title: message,
      icon: "none",
    });
  }

  // 跳转到密码登录
  function goToPasswordLogin(): void {
    uni.navigateTo({
      url: "/pages/login/password",
    });
  }

  // 跳转到注册页
  function goToRegister(): void {
    uni.navigateTo({
      url: "/pages/login/register",
    });
  }

  return {
    agreeProtocol,
    toggleAgreement,
    showUserProtocol,
    showPrivacyPolicy,
    handleWechatLogin,
    handlePhoneLogin,
    handlePasswordLogin,
    goToPasswordLogin,
    goToRegister,
  };
}