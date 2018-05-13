import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'
import CacheList from './CacheList'
import Interpretation from './Interpretation'

const TabPane = Tabs.TabPane

const styles = require('./styles.css')


const Index = ({ user, paramsBrowse, dispatch, loading, location, paramsManage }) => {
  return (
    <div className={styles.content}>
       <div>第一块</div>
       <Interpretation />
       <CacheList />
       <div>第四块</div>
    </div>
  )
}

Index.propTypes = {
  user: PropTypes.object,
  paramsBrowse: PropTypes.object,
  paramsManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, paramsBrowse, loading, paramsManage }) => ({ user, paramsBrowse, loading, paramsManage }))(Index)
