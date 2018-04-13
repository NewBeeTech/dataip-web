import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '试验名称',
      dataIndex: 'instanceName',
    }, {
      title: '试验时间',
      dataIndex: 'testTime',
    }, {
      title: '起飞时间',
      dataIndex: 'flyTime',
    }, {
      title: '负责人',
      dataIndex: 'manager',
    }, {
      title: '测试项目',
      dataIndex: 'testItem',
    }, {
      title: '测试阶段',
      dataIndex: 'testPhase',
    }, {
      title: '测试地点',
      dataIndex: 'place',
    },
  ]

  return (
    <div style={{marginBottom: 10}}>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        pagination={false}
      />
    </div>
  )
}

export default List
