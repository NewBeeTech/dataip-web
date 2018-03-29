import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button } from 'antd'
import { routerRedux } from 'dva/router'
import List from './List'
import Tree from './Tree'
import Transfer from './Transfer'
import CustomTransfer from './CustomTransfer'
import Modal from './Modal'

const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location }) => {
  const { paramList, pagination, listModalVisible, selectedRowKeys, paramsetList, listInstanceId } = paramsBrowse
  const { listInstance, listUserParam, listDeviceParamset, paramsetName } = paramsBrowse
  const { list, listTask } = user
  const { query = {}, pathname } = location

  // 根据 instanceId 列出选择过的试验
  const selectedInstanceList = list.filter(item => listInstanceId.indexOf(item.instanceId) > -1)
  const listProps = {
    size: 'middle',
    rowKey: 'instanceId',
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: selectedInstanceList.length,
    },
    dataSource: selectedInstanceList.length ? selectedInstanceList : listInstance,
    loading: loading.effects['paramsBrowse/query'],
  }

  const modalProps = {
    visible: listModalVisible,
    dataSource: list,
    listTask,
    width: 900,
    dispatch,
    selectedRowKeys,
    title: '选择实验',
    confirmLoading: loading.effects['paramsBrowse/query'],
    onOk (data) {
      dispatch({
        type: 'paramsBrowse/queryParams',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'paramsBrowse/hideModal',
      })
    },
  }

  const handleBtnClick = (key) => {
    dispatch({
      type: 'paramsBrowse/showModal',
    })
  }


  // 默认参数列表
  const treeProps = {
    paramList: paramList.length ? paramList : listDeviceParamset,
    dispatch,
  }
  // 自定义参数组
  const customTreeProps = {
    paramList: listUserParam,
    dispatch,
  }

  const transferProps = {
    paramsetList,
    paramsetName,
    dispatch,
  }

  // console.log(' listProps dataSource %o ---- selectedInstanceList length: %o', listProps.dataSource, selectedInstanceList.length)

  return (<div className="content-inner">
    <Row>
      <Col span={4}>
        <p>自定义参数组</p>
        <Tree {...customTreeProps} />
        <p>默认参数组</p>
        <Tree {...treeProps} />
      </Col>
      <Col span={20}>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={handleBtnClick}>选择试验</Button>
        </div>
        {listModalVisible && <Modal {...modalProps} />}
        {(list.length && !listModalVisible || listInstance.length) && <List {...listProps} />}

        <Row>
          <Col span={24}>
            <CustomTransfer {...transferProps} />
          </Col>
        </Row>
      </Col>
    </Row>

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
