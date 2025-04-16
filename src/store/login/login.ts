import { defineStore } from "pinia";
import { postLogin, getUserInformation } from "@/service/login/login";
import { computed } from "vue";

const useLoginStore = defineStore("login", {
  state: () => ({
    code: "",
    token: "",
    userInfo: {} as any,
  }),

  actions: {
    async fetchLoginAccountAction(account: AccountParams) {
      try {
        const loginResult = await postLogin(account);
        const code = loginResult.data?.data?.code;

        if (!code) {
          console.error("Login API did not return a valid code");
          return;
        }

        this.code = code;

        const getUserInformationResult = await getUserInformation(code);

        if (getUserInformationResult.data?.data) {
          const res = getUserInformationResult.data;
          this.userInfo = res.data[0];
          console.log("UserInfo set in store:", this.userInfo);
        } else {
          console.error("User info API did not return valid data");
        }
      } catch (error) {
        console.error("Login action failed:", error);
        throw error;
      }
    },
  },
});

export default useLoginStore;
