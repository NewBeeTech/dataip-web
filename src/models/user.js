/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update } from 'services/user'
import * as usersService from 'services/users'
import { pageModel } from './common'

const { query, changeStatus, updateFlyTime, blurSearch } = usersService
const { prefix } = config

const initialState = {
  list: [],
  listTask: [],
  taskName: '',
  currentItem: {},
  modalVisible: false,
  flyModalVisible: false,
  modalType: 'create',
  selectedRowKeys: [],
  isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
}

export default modelExtend(pageModel, {
  namespace: 'user',

  state: initialState,

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/trial/admin' || location.pathname === '/paramsBrowse' || location.pathname === '/system/monitor') {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryTree',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put, select }) {
      const taskName = yield select(_ => _.user.taskName)
      const data = yield call(usersService.listByName, { taskName })
      if (data.result === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.filter(v => v.deleteFlag !== -1), // 删除的
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    // 根据任务获取实验列表
    * queryInstanceList ({ payload }, { call, put, select }) {
      const data = yield call(usersService.listByName, payload)
      if (data.result === '0') {
        yield put({
          type: 'updateState',
          payload: {
            taskName: payload.taskName,
          },
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.filter(v => v.deleteFlag !== -1), // 删除的
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
    // 获取任务树
    * queryTree ({ payload }, { call, put, select }) {
      const data = yield call(usersService.queryTree, payload)
      if (data.result === '0') {
        yield put({ type: 'updateState',
          payload: {
            listTask: data.data.listTask,
          } })
      } else {
        throw data
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, payload)
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * updateFlyTime ({ payload }, { select, call, put }) {
      const data = yield call(updateFlyTime, payload)
      // const id = yield select(({ user }) => user.currentItem.id)
      // const newUser = { ...payload, id }
      // const data = yield call(update, newUser)
      if (data.result === '0') {
        yield put({ type: 'hideFlyModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * blurSearch ({ payload }, { select, call, put }) {
      const data = yield call(blurSearch, payload)
      if (data.result === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: 1,
              pageSize: 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    * changeStatus ({ payload }, { select, call, put }) {
      const data = yield call(changeStatus, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    clearState (state) {
      return initialState
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showFlyModal (state, { payload }) {
      return { ...state, ...payload, flyModalVisible: true }
    },
    hideFlyModal (state) {
      return { ...state, flyModalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
