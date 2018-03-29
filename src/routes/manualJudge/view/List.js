/**
 * Created by wyz on 2017/12/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Icon } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'

const confirm = Modal.confirm

const List = ({ ...tableProps }) => {
  const handleDeleteClick = (record) => {

  }


  const columns = [
    {
      title: '序号',
      dataIndex: 'columnIndexId',
      key: 'columnIndexId',
    }, {
      title: '时间',
      dataIndex: 'paramName',
      key: 'paramName',
    }, {
      title: '参数1',
      dataIndex: 'paramCode',
      key: 'paramCode',
    },, {
      title: '参数2',
      dataIndex: 'paramCode',
      key: 'paramCode',
    },
  ]


  // const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        size="middle"
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
