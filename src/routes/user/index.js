import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Tree from './Tree'
import Filter from './Filter'
import Modal from './Modal'
import FlyTimeModal from './FlyTimeModal'


const User = ({ location, dispatch, user, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, listTask, taskName, pagination, currentItem, modalVisible, flyModalVisible, modalType, isMotion, selectedRowKeys } = user
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? '创建实验' : '修改实验'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      })
    },
  }

  const flyTimeModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: flyModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/updateFlyTime'],
    title: '时标修订',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'user/updateFlyTime',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideFlyModal',
      })
    },
  }

  const listProps = {
    rowKey: record => record.instanceId,
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
    isMotion,
    /*    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    }, */
    onDeleteItem (item) {
      dispatch({
        type: 'user/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onEditFlyItem (item) {
      dispatch({
        type: 'user/showFlyModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      // type: 'radio',
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'user/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const taskTreeProps = {
    listTask,
    onSelect (selectedKeys, info) {
      const { device } = info.node.props

      console.log('selected', selectedKeys, device)

      if (device && selectedKeys[0]) {
        dispatch({
          type: 'user/queryInstanceList',
          payload: {
            taskName: selectedKeys[0],
          },
        })
      }
    },
  }

  const filterProps = {
    selectedRowKeys,
    isMotion,
    taskName,
    filter: {
      ...location.query,
    },
    onSearch (payload) {
      dispatch({
        type: 'user/blurSearch',
        payload,
      })
    },
    onAdd () {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onClickDisable (select) {
      // 只能发送一个  选择第一个
      const selectId = select && select[0]
      const selectItem = list.find(v => v.instanceId === selectId)
      dispatch({
        type: 'user/changeStatus',
        payload: {
          operationType: 'disable',
          instanceId: selectItem.instanceId,
        },
      })
    },
    onClickEnable (select) {
      const selectId = select && select[0]
      const selectItem = list.find(v => v.instanceId === selectId)
      dispatch({
        type: 'user/changeStatus',
        payload: {
          operationType: 'enable',
          instanceId: selectItem.instanceId,
        },
      })
    },

    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <Row>
        <Col span={4}>
          <Tree {...taskTreeProps} />
        </Col>
        {
          taskName &&
          <Col span={20}>
            <Filter {...filterProps} />
            <List {...listProps} />
          </Col>
        }
      </Row>


      {modalVisible && <Modal {...modalProps} />}
      {flyModalVisible && <FlyTimeModal {...flyTimeModalProps} />}
    </Page>
  )
}


User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
