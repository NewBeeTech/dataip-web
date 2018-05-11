import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import get from 'lodash/get'
// import {
//   queryParamsetName,
//   download,
//   saveJudgeResult,
//   queryChartLine,
// } from 'services/manualJudge'
import {  getModels } from 'services/paramsBrowse'
import { queryListUserParamsetByModelName, userParamsetDeleteService } from 'services/paramsManage'

import { config } from 'utils'

import { pageModel } from 'models/common'

const { downloadZipUrl } = config.api
const getRandomColor = () => {
  return '#'+'0123456789abcdef'.split('').map((v, i, a) => {
    return i > 5 ? null : a[Math.floor(Math.random() * 16)] }).join('')
}

export default modelExtend(pageModel, {
  namespace: 'paramsManage',
  state: {
    models: [],  // 型号下拉列表数据
    selectedRowKeys: [],
    list: [],
    lineLoading: false,
    colorArray: [],
    lineChartData: [],
    lineKeys: [],
    YAxisMin: 0,
    YAxisMax: 0,
    paramsForm: { // 保存为参数组数据
        modelName: ''
    }
  },

  reducers: {
    setState (state, { payload }) {
      return { ...state, ...payload }
    },
    updateParamForm (state, { payload }) {
        const {name, value} = payload;
        return {
            ...state,
            paramsForm: {
                ...state.paramsForm,
                [name]: value
            }
        }
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // todo 这里切换时不要再次请求
        if (location.pathname === '/paramsManage') {
          dispatch({ type: 'queryParamsList',
            payload: { },
          })
          dispatch({ type: 'getModels',
            payload: { },
          });
        }
      })
    },
  },

  effects: {
    // 获取型号下拉列表
    * getModels({payload}, {call, put}){

        const data = yield getModels().catch(e=>null)
        let result = [];
        if(data){
            result = data.data.map(item => ({ name: item.modelName, value: item.modelName }))
        }
        // console.warn(data);

        yield put({
            type:'updateState',
            payload: {
                models: result
            }
        })

    },
    // 根据paramname 获取list
    * queryParamsList ({ payload }, { call, put }) {
      const data = yield call(queryListUserParamsetByModelName, payload)
      if (data.result === '0') {
        yield put({
          type: 'setState',
          payload: {
            list: data.data.userParamsetDTOList,
          },
        })
      } else {
        throw data
      }
    },
    // 删除自定义参数组
    * userParamsetDeleteModel ({ payload }, { call, put, select }) {
      const data = yield call(userParamsetDeleteService, payload)
      if (data.result === '0') {
        const modelName = yield select(state => state.paramsManage.paramsForm.modelName) || null;
        const payload = modelName ? { modelName } : {};
        yield put({
          type: 'queryParamsList',
          payload
        });
      } else {
        throw data
      }
    },
  },
})
