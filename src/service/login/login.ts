import myRequest from "../index";

interface AccountParams {
  username: string;
  password: string;
}
export function postLogin(account: AccountParams) {
  return myRequest.post("/api/login", {
    username: account.username,
    password: account.password,
  });
}

export function getUserInformation(code: string) {
  return myRequest.get("/api/user", { code });
}
