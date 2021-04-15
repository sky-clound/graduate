import { getUser } from '../service/service';

export default {
  namespace: 'community',
  state: {
    user: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/test') {
          dispatch({
            type: 'getUser',
          });
        }
      });
    },
  },
  effects: {
    *getUser(action, { put, call }) {
      const data = yield call(getUser);
      console.log(data);
    },
  },
  reducers: {
    getUser(state, { payload }) {
      const data = {
        a: 9999,
        ...state,
        ...payload,
      };
      console.log(data);
      return data;
    },
  },
};
