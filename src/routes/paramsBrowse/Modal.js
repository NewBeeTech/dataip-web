/**
 * Created by wyz on 2017/12/6.
 */

import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import Tree from '../user/Tree'
import { Form, Input, Modal, Select, Row, Col } from 'antd'

const modal = ({
  onOk,
  listTask,
  selectedRowKeys,
  dispatch,
  ...modalProps
}) => {
  const handleOk = () => {
    if (selectedRowKeys.length) {
      onOk({ listInstanceId: selectedRowKeys })
    }
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const { dataSource, confirmLoading } = modalProps
  const listProps = {
    dataSource,
    rowKey: 'instanceId',
    loading: confirmLoading,
    size: 'small',
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'paramsBrowse/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  // 任务树
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


  return (
    <Modal {...modalOpts}>
      <Row>
        <Col span={4}>
          <Tree {...taskTreeProps} />
        </Col>
        {
          dataSource.length &&
          <Col span={20}>
            <List {...listProps} />
          </Col>
        }
      </Row>

    </Modal>
  )
}


export default modal
