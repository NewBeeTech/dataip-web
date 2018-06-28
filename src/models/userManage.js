import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import get from 'lodash/get'
// import {
//   queryParamsetName,
//   download,
//   saveJudgeResult,
//   queryChartLine,
// } from 'services/manualJudge'
import { getModels } from 'services/paramsBrowse'

import {
  userListService,
  roleListService,
  getRightsService,
  addRoleService,
  updateRoleService,
  deleteRoleService,
  getRoleRightsService,
} from 'services/user'

import { config } from 'utils'

import { pageModel } from 'models/common'
import { isYieldExpression } from 'typescript';

const { downloadZipUrl } = config.api
const getRandomColor = () => {
  return '#' + '0123456789abcdef'.split('').map((v, i, a) => {
    return i > 5 ? null : a[Math.floor(Math.random() * 16)]
  }).join('')
}

export default modelExtend(pageModel, {
  namespace: 'userManage',
  state: {
    userList: [],
    roleList: [],
    rightsList: [],
    showRoleModal: false,
    editRoleInfo: {
      rightsIdList: [],
      roleName: '',
      oldName: '',
    },

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
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
    updateParamForm(state, { payload }) {
      const { name, value } = payload;
      return {
        ...state,
        editRoleInfo: {
          ...state.editRoleInfo,
          [name]: value
        }
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // todo 这里切换时不要再次请求
        if (location.pathname === '/system/userManage') {
          dispatch({
            type: 'userListModel',
            payload: {},
          });
          dispatch({
            type: 'roleListModel',
            payload: {},
          });
          dispatch({
            type: 'getRightsModel',
            payload: {}
          });
        }
      })
    },
  },
  effects: {
    * getRoleRightsModel({ payload }, { call, put }) {
      const data = yield call(getRoleRightsService, payload);
      if (data.result == 0) {
        yield put({
          type: 'updateState',
          payload: {
            showRoleModal: true,
            editRoleInfo: {
              roleId: payload.roleId,
              oldName: payload.roleName,
              roleName: payload.roleName,
              rightsIdList: data.data.roleRightsList,
            }
          }
        });
      }
    },
    * deleteRoleModel({ payload }, { call, put }) {
      const data = yield call(deleteRoleService, payload);
      if (data.result == 0) {
        message.success('删除成功');
        yield put({
          type: 'updateState',
          payload: {
            roleList: data.data,
          }
        });
      } else {
        message.error(data.errmsg);
      }
    },
    * addRoleModel({ payload }, { call, put }) {
      const data = yield call(addRoleService, payload);
      if (data.result == 0) {
        message.success('创建成功');
        yield put({
          type: 'updateState',
          payload: {
            showRoleModal: false,
            roleList: data.data,
            editRoleInfo: {
              rightsIdList: [],
              roleName: '',
              oldName: '',
            },
          }
        });
      }
    },
    * updateRoleModel({ payload }, { call, put }) {
      const data = yield call(updateRoleService, payload);
      if (data.result == 0) {
        message.success('更新成功');
        yield put({
          type: 'updateState',
          payload: {
            showRoleModal: false,
            roleList: data.data,
            editRoleInfo: {
              rightsIdList: [],
              roleName: '',
              oldName: '',
            },
          }
        });
      }
    },
    * getRightsModel({ payload }, { call, put }) {
      const data = yield call(getRightsService);
      if (data.result == 0) {
        yield put({
          type: 'updateState',
          payload: {
            rightsList: data.data,
          }
        });
      }
    },
    * roleListModel({ payload }, { call, put }) {
      const data = yield call(roleListService);
      if (data.result == 0) {
        yield put({
          type: 'updateState',
          payload: {
            roleList: data.data,
          }
        });
      }
    },
    * userListModel({ payload }, { call, put }) {
      const data = yield call(userListService);
      console.warn(data);
      if (data.result == 0) {
        yield put({
          type: 'updateState',
          payload: {
            userList: data.data,
          }
        });
      }
    },
    // 获取型号下拉列表
    * getModels({ payload }, { call, put }) {

      const data = yield getModels().catch(e => null)
      let result = [];
      if (data) {
        result = data.data.map(item => ({ name: item.modelName, value: item.modelName }))
      }
      // console.warn(data);

      yield put({
        type: 'updateState',
        payload: {
          models: result
        }
      })

    },
    // 根据paramname 获取list
    * query({ payload }, { call, put }) {
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
    * postJudgeResult({ payload }, { call, put }) {
      const data = yield call(saveJudgeResult, payload)
      if (data.result === '0') {
        message.success('保存成功')
      } else {
        throw data
      }
    },
    // 获取表格数据
    * loadChart({ payload }, { call, put, select }) {
      //  根据 paramCode 区分每条线
      yield put({ type: 'setState', payload: { lineLoading: true } })
      const data = yield call(queryChartLine, payload)
      if (data.result === '0') {
        const analogDatasList = get(data, 'data.analogDataList.data', [])
        const lineKeys = Object.keys(_.first(analogDatasList) || {})
        const YAxisMax = get(data, 'data.analogDataList.max', 0)
        const YAxisMin = get(data, 'data.analogDataList.min', 0)

        yield put({
          type: 'setState',
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
    * downloadData({ payload }, { call }) {
      const data = yield call(download, payload)
      if (data.result === '0') {
        console.log('zip标识：', data.data)
        window.open(`${downloadZipUrl}${data.data}`)
      } else {
        throw data
      }
    },
  },
})
