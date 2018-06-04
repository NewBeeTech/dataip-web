import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { crossComparisonService, reportComparisonService } from 'services/crossComparison'
import { pageModel } from 'models/common'
import {error, success, warning} from '@@/note'

export default modelExtend(pageModel, {
  namespace: 'crossComparison',
  state: {
    crossComparison: [],
    instance: [],
    instanceIds: [],
    paramSelect: [],
  },

  effects: {
    * crossComparisonModel ({
      payload,
    }, { put, call, select }) {
      console.log('payload', payload);
      const data = yield call(crossComparisonService, payload);
      if (data.result === '0') {
        yield put({
          type: 'updateState',
          payload: {
            crossComparison: data.data.crossComparison,
            instance: data.data.instance,
            instanceIds: payload.instanceIds,
            paramSelect: payload.paramSelect,
          }
        });
        yield put(routerRedux.push('/crossComparison'));
      } else if (data && data.result === '1') {
        throw { message: data.errmsg }
      } else {
        throw data
      }
    },
    * reportComparisonModel ({
      payload,
    }, { put, call, select}) {
      const {
        instanceIds,
        paramSelect,
      } = yield select(_ => _.crossComparison);
      const data = yield call(reportComparisonService, { instanceIds, paramSelect });
      if (data.result === '0') {
        success('写入成功');
      } else if (data && data.result === '1') {
        throw { message: data.errmsg }
      } else {
        throw data
      }
    }
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
