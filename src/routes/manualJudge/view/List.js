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

const List = ({ analogDataKeys, analogDataList }) => {
  const handleDeleteClick = (record) => {

  }


  // const columns = [
  //   {
  //     title: '序号',
  //     dataIndex: 'id',
  //     key: analogDataKeys.id,
  //   }, {
  //     title: '时间',
  //     dataIndex: analogDataKeys.b,
  //     key: analogDataKeys.b,
  //   }, {
  //     title: analogDataKeys.a,
  //     dataIndex: analogDataKeys.a,
  //     key: analogDataKeys.a,
  //   }, {
  //     title: analogDataKeys.c,
  //     dataIndex: analogDataKeys.c,
  //     key: analogDataKeys.c,
  //   }, {
  //     title: analogDataKeys.d,
  //     dataIndex: analogDataKeys.d,
  //     key: analogDataKeys.d,
  //   }, {
  //     title: analogDataKeys.e,
  //     dataIndex: analogDataKeys.e,
  //     key: analogDataKeys.e,
  //   },
  // ]
  let obj = {};
  analogDataKeys && analogDataKeys.map(item => {
    obj = { ...obj, ...item };
  })
  console.log('obj:: ', obj);
  const columns1 =  Object.keys(obj).map(key => ({
    title: obj[key],
    dataIndex: key,
    key: key,
  }));

  const columns = analogDataKeys && analogDataKeys.map( item => {
    console.log(item);
    if (item.id) {
      return ({
        title: '序号',
        dataIndex: 'id',
        key: item.id,
      });
    } else if (item.a) {
      return ({
        title: item.a,
        dataIndex: 'a',
        key: 'a',
      });
    } else if (item.b) {
      return ({
        title: item.b,
        dataIndex: 'b',
        key: 'b',
      });
    } else if (item.c) {
      return ({
        title: item.c,
        dataIndex: 'c',
        key: 'c',
      });
    } else if (item.d) {
      return ({
        title: item.d,
        dataIndex: 'd',
        key: 'd',
      });
    } else if (item.e) {
      return ({
        title: item.e,
        dataIndex: 'e',
        key: 'e',
      });
    }
  });


  // const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      {analogDataKeys.a}
      {console.log(analogDataKeys)}
      <Button style={{ marginRight: '10px' }}>设为野点</Button>
      <Button>下载</Button>
      <Table
        
        // size="middle"
        pagination={false}
        rowSelection={() => {}}
        bordered
        scroll={{ x: 600, y: 800 }}
        columns={columns1}
        dataSource={analogDataList}
        // simple
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
