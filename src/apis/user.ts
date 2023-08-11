import http from '../service/request';

const PREFIX = 'user';

export async function getUserInfo() {
  return http.request<BaseResponse<UserType.User>>({
    url: `${PREFIX}/getUserInfo`,
    method: "get",
  });
}
