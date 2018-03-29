import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onEditFlyItem, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleDeleteClick = (record) => {
    confirm({
      title: `你确定要删除 ${record.instanceName}?`,
      onOk () {
        onDeleteItem({ instanceId: record.instanceId })
      },
    })
  }

  // console.log('表格--', tableProps.dataSource)

  const columns = [
    {
      title: '操作',
      dataIndex: 'instanceId',
      key: 'instanceId',
      width: 200,
      render: (text, record) => (<div>
        <Button size="small" className="margin-right8" type="primary" onClick={() => onEditItem(record)}>编辑</Button>
        { record.deleteFlag !== -1 &&
          <Button size="small" className="margin-right8" type="danger" onClick={() => handleDeleteClick(record)}>删除</Button>
        }
        <Button size="small" onClick={() => onEditFlyItem(record)}>时标修正</Button>
      </div>),
    }, {
      title: '实验名称',
      dataIndex: 'instanceName',
      key: 'instanceName',
      // render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, {
      title: '实验时间',
      dataIndex: 'testTime',
      key: 'testTime',
    }, {
      title: '起飞时间',
      dataIndex: 'flyTime',
      key: 'flyTime',
    }, {
      title: '负责人',
      dataIndex: 'manager',
      key: 'manager',
    }, {
      title: '测试项目',
      dataIndex: 'testItem',
      key: 'testItem',
    }, {
      title: '测试阶段',
      dataIndex: 'testPhase',
      key: 'testPhase',
    }, {
      title: '状态',
      dataIndex: 'deleteFlag',
      key: 'deleteFlag',
      render (flag) {
        if (flag === 1) {
          return '禁用'
        } else if (flag === 0) {
          return '在用'
        }
        return flag
      },
    }, {
      title: '测试地点',
      dataIndex: 'place',
      key: 'place',
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        size="middle"
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
