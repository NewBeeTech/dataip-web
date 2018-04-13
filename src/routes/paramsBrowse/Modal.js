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
  const { dataSource = [], confirmLoading } = modalProps
  const listProps = {
    dataSource: dataSource.filter(i=>i.instanceName.includes(modalOpts.filterKey || '')),
    rowKey: 'instanceId',
    loading: confirmLoading,
    size: 'small',
    height: 450,
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

  // let data = dataSource.filter(i=>i.instanceName.includes(modalOpts.filterKey || ''))
  return (
    <Modal {...modalOpts}>
      <Row style={{height: 500}}>
        <Col span={4}>
          <Tree {...taskTreeProps} />
        </Col>

        {
          dataSource.length &&
          <Col span={20}>
            <Row style={{marginBottom: 10}}>
                <Col span={4}>
                    <label htmlFor="">根据名称过滤：</label>
                </Col>

                <Col span={18}>
                    <Input value={modalOpts.filterKey}
                    onChange={e=>dispatch({
                        type:'paramsBrowse/updateState',
                        payload: {filterKey: e.target.value}})}></Input>
                </Col>
            </Row>



            <List {...listProps} />
          </Col>
        }
      </Row>

    </Modal>
  )
}


export default modal
