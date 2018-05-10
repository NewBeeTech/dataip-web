import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Tooltip, Modal as AntdModal} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'

const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location }) => {

  return (<div className="content-inner">
    hello 参数组管理
  </div>)
}

Index.propTypes = {
  user: PropTypes.object,
  paramsBrowse: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, paramsBrowse, loading }) => ({ user, paramsBrowse, loading }))(Index)
