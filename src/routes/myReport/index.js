import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'
import ReportList from './ReportList'

const TabPane = Tabs.TabPane

const styles = require('./styles.css')


const Index = ({ reportBrowse,  dispatch, loading, location }) => {
  return (
    <div className={styles.content}>
       <ReportList reportBrowse={reportBrowse} dispatch={dispatch} />
    </div>
  )
}

Index.propTypes = {
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ loading, reportBrowse }) => ({ loading, reportBrowse }))(Index)
