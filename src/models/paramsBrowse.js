import modelExtend from 'dva-model-extend'
import { query, queryIndex, queryParams, queryParamsetName, queryStartJudge } from 'services/paramsBrowse'
import { pageModel } from 'models/common'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'

const initialState = {
  paramList: [],
  listInstanceId: [], // 选择的试验id
  paramsetName: '', // 当前选择的试验参数 -- 左侧参数树选中的
  paramsetList: [], // 根据paramsetName 获取的列表  transfer
  judgeList: [], // 人工判读 的列表
  selectedRowKeys: [],
  listModalVisible: false,
  // 默认首屏的数据
  listInstance: [], // 试验列表
  listUserParam: [], // 自定义参数组
  listDeviceParamset: [], // 默认参数组
}

// 根据paramList四个属性生成一个字符串ID
const genId = (paramsetList = []) => paramsetList.map(v => ({ id: `${v.device}_${v.paramCode}_${v.paramName}_${v.paramsetName}`, ...v }))

export default modelExtend(pageModel, {

  namespace: 'paramsBrowse',
  state: initialState,

  reducers: {
    clearState (state) {
      return initialState
    },
    saveIndexDataList (state, { payload }) {
      return { ...state, ...payload }
    },
    saveParamList (state, { payload }) {
      return { ...state, ...payload }
    },
    saveParamsetList (state, { payload }) {
      return { ...state, ...payload }
    },
    saveJudgeList (state, { payload }) {
      return { ...state, ...payload }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, listModalVisible: true }
    },
    hideModal (state) {
      return { ...state, listModalVisible: false }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // todo 这里切换时不要再次请求
        if (location.pathname === '/paramsBrowse') {
          dispatch({ type: 'queryIndex',
            payload: { },
          })
        }
      })
    },
  },

  effects: {
    // 进入默认列表
    * queryIndex ({
      payload,
    }, { call, put, select }) {
      const stateListInstance = yield select(_ => _.paramsBrowse.listInstance)
      if (stateListInstance.length) {
        // note 这里切换时不要再次请求
        return false
      }
      const data = yield call(queryIndex, payload)
      if (data.result === '0') {
        const { listInstance, listUserParam, listDeviceParamset } = data.data
        yield put({
          type: 'saveIndexDataList',
          payload: {
            listInstance,
            listUserParam,
            listDeviceParamset,
          },
        })
        yield put({
          type: 'updateState',
          payload: {
            listInstanceId: listInstance.map(v => v.instanceId),
          },
        })
      } else {
        throw data
      }
    },
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      if (data.result === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.length,
            },
          },
        })
      } else {
        throw data
      }
    },
    // 获取参数
    * queryParams ({ payload }, { call, put }) {
      const data = yield call(queryParams, payload)
      if (data.result === '0') {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'saveParamList',
          payload: {
            paramList: data.data.listDeviceParmset,
          },
        })
        yield put({
          type: 'updateState',
          payload: {
            ...payload,
            selectedRowKeys: [],
          },
        })
      } else {
        throw data
      }
    },
    // 根据paramname 获取list  下边transfer tree data
    * queryParamsetName ({ payload }, { call, put, select }) {
      let { listInstanceId, paramsetList } = yield select(_ => _.paramsBrowse)
      const data = yield call(queryParamsetName, { ...payload, listInstanceId })
      if (data.result === '0') {
        const paramSet = genId(data.data.listParamSelectDTO)
        yield put({
          type: 'saveParamsetList',
          payload: {
            paramsetList: Array.from(new Set(paramSet)), // 去重
          },
        })
        yield put({
          type: 'updateState',
          payload: {
            paramsetName: payload.paramsetName,
          },
        })
      } else {
        throw data
      }
    },
    // 启动判读
    * queryStartJudge ({ payload }, { call, put, select }) {
      const { listInstanceId } = yield select(_ => _.paramsBrowse)
      const data = yield call(queryStartJudge, { ...payload, instanceIds: listInstanceId })
      if (data.result === '0') {
        yield put({
          type: 'saveJudgeList',
          payload: {
            judgeList: data.data.listManualJudge,
          },
        })
        yield put(routerRedux.push('/manualJudge'))
      } else {
        throw data
      }
    },
  },
})
