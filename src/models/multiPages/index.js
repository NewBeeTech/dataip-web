/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update } from 'services/user'
import * as usersService from 'services/users'
import { pageModel } from '../common'
import app from '../../index.js'
import dynamic from 'dva/dynamic'

const model = dynamic({ app, component: ()=>import('../paramsBrowse.js')});
console.log(model,'model');
app.model(modelExtend(model, {
    namespace: 'test' + Math.random()
}))
const { query, changeStatus, updateFlyTime, blurSearch } = usersService
const { prefix } = config

const initialState = {
  pages:[]
}

export default modelExtend(pageModel, {
  namespace: 'multiPages',

  state: initialState,

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/trial/admin' || location.pathname === '/paramsBrowse') {
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


  },

  reducers: {

  },
})
