import { createStore, GetterTree } from 'vuex';
import { IRootState } from './types';
import { modules } from './modules';

const initState: IRootState = {
  userInfo: {
    name: 'jack',
    age: 28,
    phone: '138xxxxxxxx',
  },
};

const getters: GetterTree<IRootState, IRootState> = {
  getUserInfo(state) {
    return state.userInfo;
  },
};

export default createStore({
  state: initState,
  getters,
  modules,
});
