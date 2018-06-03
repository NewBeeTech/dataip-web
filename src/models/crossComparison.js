import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { crossComparisonService } from 'services/crossComparison'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {
  namespace: 'crossComparison',
  state: {
    crossComparison: [],
    instance: [],
  },

  effects: {
    * crossComparisonModel ({
      payload,
    }, { put, call, select }) {
      const data = yield call(crossComparisonService, payload);
      if (data.result === '0') {
        yield put({
          type: 'updateState',
          payload: {
            crossComparison: data.data.crossComparison,
            instance: data.data.instance,
          }
        });
        yield put(routerRedux.push('/crossComparison'));
      } else if (data && data.result === '1') {
        throw { message: data.errmsg }
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

});
