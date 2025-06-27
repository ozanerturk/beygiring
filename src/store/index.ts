import { createStore } from 'vuex';
import { RootState } from './types';
import { modules } from './modules';

const store = createStore<RootState>({
  modules,
});

export default store;
export * from './types';