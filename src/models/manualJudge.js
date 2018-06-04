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
  getTaskListService,
  listReportMineService,
  setCurrentReportService,
  reportResultService,
} from 'services/manualJudge';
import {
  getModels,
  query,
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
    start: 0,
    end: -1,
    models: [], // 型号
    tasks: [], // 任务
    instances: [], // 试验
    reports: [], // 报告
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
    hasReport: false, // 当前没有报告
    hasReportModal: false, // 当前有报告modal
    noReportModal: true, // 当前没有报告modal
    createReportModal: false, // 创建报告modal
    createReport: {
    },
    chooseReportModal: false,
    chooseReport: {
    },
    currentReport: {
    },
    report: {
    }
  },

  reducers: {
    setState (state, { payload }) {
      return { ...state, ...payload }
    },
    onChangeCreateReport (state, { payload }) {
        const {name, value} = payload;
        return {
            ...state,
            createReport: {
                ...state.createReport,
                [name]: value
            }
        }
    },
    onChangeChooseReport(state, { payload }) {
        const {name, value} = payload;
        return {
            ...state,
            chooseReport: {
                ...state.chooseReport,
                [name]: value
            }
        }
    },
    onChangeReport(state, { payload }) {
        const {name, value} = payload;
        return {
            ...state,
            report: {
                ...state.report,
                [name]: value
            }
        }
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
          dispatch({ type: 'getTaskListModel',
            payload: { },
          });
          dispatch({ type: 'getInstances',
            payload: { },
          });
        }
      })
    },
  },

  effects: {
    // 获取当前型号下拉框数据
    * getModels({payload}, { call, put, select }){
        const models = yield select(_ => _.manualJudge.models);
        if (models.length) {
        } else {
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
        }

    },
    // 查询所有试验
    * getInstances({payload}, { call, put, select }){
        const instances = yield select(_ => _.manualJudge.models);
        if (instances.length) {
        } else {
          const data = yield call(query);
          let result = [];
          if(data){
              result = data.data.map(item => ({ name: item.instanceName, value: item.instanceName+','+item.instanceId }))
          }
          // console.warn(data);

          yield put({
              type:'updateState',
              payload: {
                  instances: result
              }
          });
        }

    },
    * getTaskListModel({payload}, { call, put, select }){
      const tasks = yield select(_ => _.manualJudge.tasks);
      if (tasks.length) {
      } else {
        const data = yield call(getTaskListService);
        let result = [];
        if(data.result == 0){
            // result = data.data.map(item => ({ name: item.modelName, value: item.modelName }))
            result = Object.values(data.data.listTask);
            console.log(result);
            var arr = [];
            result.map(item => arr = arr.concat(item));
            result = arr.map(item => ({ name: item, value: item}));
        }
        // console.warn(data);

        yield put({
            type:'updateState',
            payload: {
                tasks: result
            }
        });
      }

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
    *listReportMineModel({ payload }, { call, put, select }) {
      const chooseReport = yield select(_ => _.manualJudge.chooseReport);
      const data = yield call(listReportMineService, {
        modelName: chooseReport.modelName,
        taskName: chooseReport.taskName,
        instanceId: chooseReport.instanceId,
      })
      if (data.result === '0') {
        yield put({
          type: 'setState',
          payload: {
            reports: data.data,
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
        message.success('保存判读结果成功')
      } else {
        throw data
      }
    },
    // 获取表格数据
    * loadChart ({ payload }, { call, put, select }) {
      //  根据 paramCode 区分每条线
      yield put({ type: 'setState', payload: { lineLoading: true } })
      const data = yield call(queryChartLine, payload)
      yield put({
        type: 'setState',
        payload: { start: payload.start, end: payload.end }
      })
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
              hasReport: true,
              noReportModal: false,
              currentReport: data.data.reportDTO,
            }
          });
        } else {
          yield put({
            type: 'setState',
            payload: {
              hasReportModal: false,
              hasReport: false,
              noReportModal: true,
            }
          });
        }
      } else {
        throw data
      }
    },
    // 创建报告
    * reportCreateModel({ payload }, { call, put, select }) {
      const createReport = yield select(_ => _.manualJudge.createReport);
      console.log(createReport);
      const data = yield call(reportCreateService, createReport);
      if (data.result === '0') {
        message.success('创建成功');
        // 创建报告弹窗消失
        yield put({
          type: 'setState',
          payload: {
            createReportModal: false,
            hasReport: true,
            currentReport: data.data,
          }
        });
      } else {
        throw data
      }
    },
    * chooseReport({ payload }, { call, put, select }) {
      const chooseReport = yield select(_ => _.manualJudge.chooseReport);
      const data = yield call(setCurrentReportService, {
        reportId: chooseReport.reportId
      });
      if (data.result === '0') {
        // 创建报告弹窗消失
        yield put({
          type: 'setState',
          payload: {
            chooseReportModal: false,
            hasReport: true,
            currentReport: data.data,
          }
        })
      } else {
        throw data
      }
    },
    * reportResultModel({ payload }, { call, put, select }) {
      const report = yield select(_ => _.manualJudge.report);
      const data = yield call(reportResultService, payload);
      if (data.result === '0') {
        // 创建报告弹窗消失
        yield put({
          type: 'setState',
          payload: {
            hasReportModal: false,
          }
        })
      } else {
        throw data
      }
    }
  },
})
