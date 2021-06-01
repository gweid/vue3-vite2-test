import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { IRootState } from '../../types';
import { moutationType } from './moutationTypes';
import { IHomeInfo } from './types';

const homeState: IHomeInfo = {
  headerTitle: 'home头部',
};

const mutations: MutationTree<IHomeInfo> = {
  [moutationType.SET_HEADER_TITLE](state, payload) {
    state.headerTitle = payload;
  },
};

const actions: ActionTree<IHomeInfo, IRootState> = {
  handleSetHeaderTitle({ commit }, payload) {
    commit(moutationType.SET_HEADER_TITLE, payload);
  },
};

const getters: GetterTree<IHomeInfo, IRootState> = {
  getHeaderTitle(state) {
    return state.headerTitle;
  },
};

export default {
  namespaced: true,
  state: homeState,
  mutations,
  actions,
  getters,
};
