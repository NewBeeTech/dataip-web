/**
 * Created by wyz on 2017/12/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Icon, Popconfirm } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'

const confirm = Modal.confirm
var obj;
var columns1;
var columns;


const List = ({ analogDataKeys, analogDataList, dispatch, listManualJudgeDTO, loading, tableName, exceptionDataLoading }) => {
  const handleDeleteClick = (record) => {

  }
  const download = () => {
    dispatch({
      type: 'manualJudge/downloadData',
      payload: { listManualJudgeDTO: listManualJudgeDTO },
    });
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
  // if (!(obj && Object.keys(obj).length)) {
  //   analogDataKeys && analogDataKeys.map(item => {
  //     obj = { ...obj, ...item };
  //   });
  // }
  // console.log('obj:: ', obj);
  // if (!columns1) {
  //   columns1 =  Object.keys(obj).map(key => ({
  //     title: obj[key],
  //     dataIndex: key,
  //     key: key,
  //   }));
  // }
  // if (!columns) {
  //   columns = analogDataKeys && analogDataKeys.map( item => {
  //     if (item.id) {
  //       return ({
  //         title: '序号',
  //         dataIndex: 'id',
  //         key: item.id,
  //       });
  //     } else if (item.a) {
  //       return ({
  //         title: item.a,
  //         dataIndex: 'a',
  //         key: 'a',
  //       });
  //     } else if (item.b) {
  //       return ({
  //         title: item.b,
  //         dataIndex: 'b',
  //         key: 'b',
  //       });
  //     } else if (item.c) {
  //       return ({
  //         title: item.c,
  //         dataIndex: 'c',
  //         key: 'c',
  //       });
  //     } else if (item.d) {
  //       return ({
  //         title: item.d,
  //         dataIndex: 'd',
  //         key: 'd',
  //       });
  //     } else if (item.e) {
  //       return ({
  //         title: item.e,
  //         dataIndex: 'e',
  //         key: 'e',
  //       });
  //     }
  //   });
  //
  //
  // }


  // const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div style={{ marginRight: '20px'}}>
      {/* <Button style={{ marginRight: '10px' }}>设为野点</Button> */}
      <Button loading={loading} onClick={download}>下载</Button>
      <Table
        loading={exceptionDataLoading}
        size="middle"
        pagination={false}
        // rowSelection={() => {}}
        bordered
        scroll={{  y: 700 }}
        columns={analogDataKeys.map((item, index) => ({...item, width: '100px', key: item.dataIndex, render:(text, row, index) => (
          <Popconfirm
            key={index+''+row.id}
            title="是否设为野点"
            onConfirm={
              () => {
                // console.log(text, row, index, item);
                // console.log(item);
                // console.log(
                //   {
                //     dataId: row.id,
                //     data: text,
                //     judgeParam: {
                //       tableName,
                //       [item.dataIndex]: item.title,
                //     }
                //   }
                // )
                dispatch({
                  type: 'manualJudge/exceptionDataModel',
                  payload: {
                    dataId: row.id,
                    data: text,
                    judgeParam: {
                      tableName,
                      paramCode: item.title,
                    }
                  }
                });
              }
            }
          >
            <div>{text}</div>
          </Popconfirm>
        )}))}
        dataSource={analogDataList}
        simple
        onRow={(record, index) => {
          return {
            onClick: (row) => {
              console.log(record, row);
            }
          }
        }}
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
