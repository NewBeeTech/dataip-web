import modelExtend from 'dva-model-extend'
import { query, queryIndex, queryParams,
    queryParamsetName, queryStartJudge,
    addParamSet, appendParamSet, updateParamSet,
    queryUserParamsetName, getModels, setCurrTask,
    queryTasksByModelNameService,
    setCurrTaskService,
} from 'services/paramsBrowse'
import { pageModel } from 'models/common'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import {error, success, warning} from '@@/note'

const initialState = {
  taskModels: [], // 任务列表
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
  listDeviceParamset: [], // 默认参数组,
  paramsForm: { // 保存为参数组数据
      userParamsetName: '',
      modelName: ''
  }
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
        if (location.pathname === '/paramsBrowse') {
          dispatch({ type: 'queryIndex',
            payload: { },
          })
          dispatch({ type: 'getModels',
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
        const { listInstance, listUserParamSetName, listDeviceParamset } = data.data
        yield put({
          type: 'saveIndexDataList',
          payload: {
            listInstance,
            listUserParam:listUserParamSetName,
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
    // 根据paramname 获取list  下边transfer tree data
    * queryParamsetName ({ payload }, { call, put, select }) {
      let { listInstanceId, paramsetList } = yield select(_ => _.paramsBrowse)
      let data ;
      if(!payload.isUser) {
          data = yield call(queryParamsetName, { ...payload, listInstanceId })
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
      }else {
          data = yield call(queryUserParamsetName, { userParamsetName: payload.device })
          if (data.result === '0') {
            const paramSet = genId(data.data.userParamsetDTO.listParamSelectDTO)
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
    //保存为自定义参数组
    * saveParamSet({payload}, {call, put, select}){
        let paramsForm = yield select(_ => _.paramsBrowse.paramsForm)

        const  {type, listParamSelectDTO = []} = payload;
        console.warn('paramsForm',paramsForm);
        if(!paramsForm.modelName) {
            return warning('缺少型号')
        }
        if(!paramsForm.userParamsetName) {
            return warning('缺少名称')
        }
        if(!listParamSelectDTO || !listParamSelectDTO.length) {
            return warning('请选择参数')
        }
        const data = yield call(addParamSet, {...paramsForm, listParamSelectDTO})
        if(data) {
            // dispatch({ type: 'queryIndex',
            //   payload: { },
            // })
            // yield call
            // success(data.data)
            console.warn(data.data.listUserParamSetName);
            yield put({
              type: 'updateState',
              payload: {
                isSaving:false,
                listUserParam: data.data.listUserParamSetName,
              }
            });
            // yield put({
            //   type: 'saveIndexDataList',
            //   payload: {
            //     listUserParam: data.data.listUserParamSetName,
            //   },
            // })
            // const data1 = yield call(queryIndex, {});
            // console.warn(data1);
            // setTimeout(function () {
            //   window.location.reload();
            // }, 1000);
            // const data1 = yield call(queryIndex, {})
            // if (data1.result === '0') {
            //   const { listInstance, listUserParamSetName, listDeviceParamset } = data.data
            //   console.warn(listUserParamSetName);
              // yield put({
              //   type: 'saveIndexDataList',
              //   payload: {
              //     listUserParam:listUserParamSetName,
              //   },
              // })
            // }
        }

    },
     //更新跟新为自定义参数组
    * updateParamSet({payload}, {call, put, select}) {
      let paramsForm = yield select(_ => _.paramsBrowse.paramsForm)
      console.warn('paramsForm',paramsForm);
      console.warn('payload',payload);

        // const  {type, listParamSelectDTO = []} = payload;
        // let paramsForm = yield select(_ => _.paramsBrowse.paramsForm)
        // if(!paramsForm.modelName) {
        //     return warning('缺少型号')
        // }
        // if(!paramsForm.userParamsetName) {
        //     return warning('缺少名称')
        // }
        // if(!listParamSelectDTO || !listParamSelectDTO.length) {
        //     return warning('请选择参数')
        // }
        //
        // let data;
        // if(type === 'update') {
        //     data = yield call(appendParamSet, {...paramsForm, listParamSelectDTO})
        // }else {
        //     data = yield call(updateParamSet, {listParamSelectDTO})
        // }
        // if(data) {
        //     yield put({type: 'updateState', payload: {isUpdating:false}})
        //     success(data.data)
        // }else {
        //     error(data.data)
        // }

    },
    // 根据型号名称获取任务信息
    * queryTasksByModelNameModel({ payload }, { put, call, select }) {
      const data = yield call(queryTasksByModelNameService, payload)
      if (data.result === '0') {
        console.warn(data);
        const result = data.data.map(item => ({ name: item.taskName, value: item.taskName }))
        yield put({
          type: 'updateState',
          payload: {
            taskModels: result,
            currentTask: '',
          }
        });
      } else {
        throw data
      }
    },
    * confirmSetCurrentTask({payload}, {put, call, select}) {
        const {currentTaskModel, currentTask} = yield select(_=>_.paramsBrowse)
        const data = yield call(setCurrTaskService, { taskName: currentTask });
        if (data.result === '0') {
          yield put({
            type: 'updateState',
            payload: {
              isSetting: false,
              currentTaskModel: '',
              currentTask: '',
            }
          });
        } else {
          throw data
        }
        // if(!currentTaskModel) {
        //     return warning('缺少型号')
        // }
        // if(!currentTask) {
        //     return warning('缺少任务')
        // }
        //
        // yield call()

    }
  }

})
