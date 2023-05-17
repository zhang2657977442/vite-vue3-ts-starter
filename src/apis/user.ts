import http from '../service/request';

const PREFIX = 'user';

export const getTest = (params: any) => {
  return http.request({
    url: `${PREFIX}/test`,
    method: 'post',
    params,
  });
};
