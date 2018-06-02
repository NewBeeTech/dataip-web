import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import get from 'lodash/get'
import {
  queryParamsetName,
  download,
  saveJudgeResult,
  queryChartLine,
  judgeListDataService,
  getCurrentReportService,
  reportCreateService,
} from 'services/manualJudge';
import {
  getModels
} from 'services/paramsBrowse';
import { config } from 'utils'
const { APIV3 } = config;

import { pageModel } from 'models/common'

const { downloadZipUrl } = config.api
const getRandomColor = () => {
  return '#'+'0123456789abcdef'.split('').map((v, i, a) => {
    return i > 5 ? null : a[Math.floor(Math.random() * 16)] }).join('')
}

export default modelExtend(pageModel, {
  namespace: 'manualJudge',
  state: {
    models: [], // 型号
    viewData: [], // 查看数据
    loadViewData: false,
    selectedRowKeys: [],
    list: [],
    lineLoading: false,
    colorArray: [],
    lineChartData: [],
    lineKeys: [],
    YAxisMin: 0,
    YAxisMax: 0,
    hasReportModal: false, // 当前有报告modal
    noReportModal: true, // 当前没有报告modal
    createReportModal: false, // 创建报告modal
  },

  reducers: {
    setState (state, { payload }) {
      return { ...state, ...payload }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/manualJudge') {
          // 清空表格line chart 数据
          dispatch({ type: 'setState',
            payload: {
              lineChartData: [],
              selectedRowKeys: [],
            },
          });
          dispatch({ type: 'getModels',
            payload: { },
          });
        }
      })
    },
  },

  effects: {
    // 获取当前型号下拉框数据
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
        });
    },
    // 根据paramname 获取list
    * query ({ payload }, { call, put }) {
      const data = yield call(queryParamsetName, payload)
      if (data.result === '0') {
        yield put({
          type: 'setState',
          payload: {
            list: data.data,
          },
        })
      } else {
        throw data
      }
    },
    // 保存判读结果
    * postJudgeResult ({ payload }, { call, put }) {
      const data = yield call(saveJudgeResult, payload)
      if (data.result === '0') {
        message.success('保存成功')
      } else {
        throw data
      }
    },
    // 获取表格数据
    * loadChart ({ payload }, { call, put, select }) {
      //  根据 paramCode 区分每条线
      yield put({ type: 'setState', payload: { lineLoading: true } })
      const data = yield call(queryChartLine, payload)
      if (data.result === '0') {
        const analogDatasList = get(data, 'data.analogDataList.data', [])
        const lineKeys = Object.keys(_.first(analogDatasList) || {})
        const YAxisMax = get(data, 'data.analogDataList.max', 0)
        const YAxisMin = get(data, 'data.analogDataList.min', 0)

        yield put({ type: 'setState',
          payload: {
            lineChartData: analogDatasList,
            lineLoading: false,
            lineKeys,
            YAxisMax,
            YAxisMin,
            colorArray: lineKeys.map(_ => getRandomColor()), // 放state  鼠标滑动时颜色不要动
          },
        })
      } else {
        yield put({ type: 'setState', payload: { lineLoading: false } })
        throw data
      }
    },
    // 下载数据
    * downloadData ({ payload }, { call }) {
      const data = yield call(download, payload)
      if (data.result === '0') {
        console.log('zip标识：', data.data)
        window.open(APIV3+'/manual/judge/downloadZIP?ZIP='+data.data);
      } else {
        throw data
      }
    },
    // 数据展示
    * judgeListDataModel ({ payload }, { call, put }) {
      yield put({
        type: 'setState',
        payload: {
          loadViewData: false,
        }
      });
      const data = yield call(judgeListDataService, payload);
      if (data.result === '0') {
        console.log('viewData: ', data.data);
        let viewData = data.data;
        viewData = viewData.map(item => {
          let analogDataKeys = item.analogDataKeys;
          let obj = {};
          analogDataKeys.map(item => {
            obj = { ...obj, ...item };
          });
          const columns1 =  Object.keys(obj).map(key => ({
            title: obj[key],
            dataIndex: key,
            key: key,
          }));
          return {
            analogDataKeys: columns1,
            analogDataList: item.analogDataList,
          }
        })
        window.viewData = viewData;
        console.log('window.viewData', window.viewData);
        // window.localStorage.setItem('viewData', JSON.stringify(viewData));
          yield put({
            type: 'setState',
            payload: {
              loadViewData: true,
            }
          });
      } else {
        throw data
      }
    },
    * getCurrentReportModel({ payload }, { call, put }) {
      const data = yield call(getCurrentReportService, payload);
      if (data.result === '0') {
        if (data.data.reportDTO) { // 有当前报告
          yield put({
            type: 'setState',
            payload: {
              hasReportModal: true,
              noReportModal: false,
            }
          });
        } else {
          yield put({
            type: 'setState',
            payload: {
              hasReportModal: false,
              noReportModal: true,
            }
          });
        }
      } else {
        throw data
      }
    },
    // 创建报告
    * reportCreateModel({ payload }, { call, put }) {
      const data = yield call(reportCreateService, payload);
      if (data.result === '0') {
        message.success('创建成功');
        // 创建报告弹窗消失
        yield put({
          type: 'setState',
          payload: {
            createReportModal: false,
          }
        })
      } else {
        throw data
      }
    }
  },
})
