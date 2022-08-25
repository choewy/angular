import { api, configs } from '../utils';

export const authApi = {
  login: async () => {
    return api
      .axios({
        method: 'GET',
        url: '/auth',
        params: {
          client_id: configs.tistory.clientId,
          redirect_uri: configs.tistory.redirectUri,
          response_type: 'code',
        },
      })
      .then((res) => res.data);
  },
};
