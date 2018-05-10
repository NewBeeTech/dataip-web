import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard', // 进入的首页
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/trial/admin',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/login',
      // 放在入口了  因为需要登录信息
      // models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      // 参数浏览
      path: '/paramsBrowse',
      // 需要任务树
      models: () => [import('./models/user'), import('./models/paramsBrowse')],
      component: () => import('./routes/paramsBrowse/'),
    }, {
      // 参数判读
      path: '/manualJudge',
      models: () => [import('./models/paramsBrowse'), import('./models/manualJudge')],
      component: () => import('./routes/manualJudge/'),
    }, {
      // 判读 数据查看
      path: '/judgeReview',
      models: () => [import('./models/manualJudge')],
      component: () => import('./routes/manualJudge/view'),
    }, {
      // 判读 数据查看
      path: '/multiPages',
      models: () => [import('./models/multiPages')],
      component: () => import('./routes/multiPages'),
    }, {
      path: '/paramsManage',
      models: () => [import('./models/paramsManage')],
      component: () => import('./routes/paramsManage'),
    }
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/paramsBrowse" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
