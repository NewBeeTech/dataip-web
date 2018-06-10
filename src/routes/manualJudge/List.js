import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Icon, Select, Input } from 'antd'
import { routerRedux } from 'dva/router'
import Toolbar from './Toolbar'
import styles from './List.less';

const Option = Select.Option

// 保存当前用户输入的  类型和描述
const UserTypeDataDTO = []

const List = ({ dispatch, ...tableProps }) => {
  // note keys is `${v.tableName}-${v.columnName}`
  const { selectedRowKeys } = tableProps.rowSelection


  const handleChange = (record) => {
    let { dataSource } = tableProps;
    if (!_.find(dataSource, u => u.columnName === record.columnName)) {
      dataSource.push(record)
      return false
    }
    dataSource = dataSource.map((dto) => {
      if (dto.columnName === record.columnName && dto.tableName === record.tableName) {
        console.warn({ ...dto, ...record });
        return { ...dto, ...record }
      }
      return dto;
    });
    // console.warn(dataSource);


    dispatch({
      type: 'paramsBrowse/updateState',
      payload: { judgeList: dataSource },
    })
  }

  const resultChange = (record, value) => {
    console.log('resultChange---', value)
    console.log({ ...record, result: value });
    handleChange({ ...record, result: value })
  }

  const descriptionChange = (record, event) => {
    console.log('descriptionChange--', event.target.value)
    handleChange({ ...record, description: event.target.value })
  }

  const toolbarProps = {
    dispatch,
    viewData: () => {
      console.log('查看数据-- UserTypeDataDTO len-- ', UserTypeDataDTO.length)
      const { dataSource } = tableProps
      const selectedDto = dataSource.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1)
      dispatch({
        type: 'manualJudge/judgeListDataModel',
        payload: {
          listManualJudgeDTO: selectedDto,
          start: 0,
          end: -1,
        }
      });
      dispatch({
        type: 'manualJudge/updateState',
        payload: {
          listManualJudgeDTO: selectedDto,
        }
      });
      dispatch(routerRedux.push('/judgeReview'))
    },
    downloadData: () => {
      // 选中的
      const { dataSource } = tableProps
      const selectedDto = dataSource.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1)
      console.log('下载数据-- selectedDto -- ', selectedDto)
      if (selectedDto.length) {
        dispatch({
          type: 'manualJudge/downloadData',
          payload: { listManualJudgeDTO: selectedDto },
        })
      }
    },
    report: () => {
      dispatch({
        type: 'manualJudge/getCurrentReportModel',
      });
    },
    // 保存判读结果
    // FIXME: 行内修改的结果要同步
    saveJudgeResult: () => {
      const { dataSource } = tableProps;
      // console.log(dataSource);
      // console.log('tableProps: ', tableProps);
      // // 过滤 --已选中的
      // console.log(UserTypeDataDTO);
      const selectedLlist = dataSource.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1)
      console.log('selectedLlist', selectedLlist);
      // console.log(selectedLlist);
      // const listParamResult = selectedLlist.map(dto => _.pick(dto, ['instanceId', 'paramCode', 'paramName', 'result', 'description']))
      // todo 可能要删除一下不需要的
      // const { dataSource } = tableProps
      // const selectedDto = dataSource.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1);
      // console.log('保存判读结果--', listParamResult)
      dispatch({
        type: 'manualJudge/postJudgeResult',
        payload: {
          listManualJudgeDTO: selectedLlist,
        },
      })
    },
  }


  const columns = [
    {
      title: '代号',
      dataIndex: 'paramCode',
      key: 'paramCode',
    }, {
      title: '名称',
      dataIndex: 'paramName',
      key: 'paramName',
    }, {
      title: '判读结果',
      key: 'resultType',
      dataIndex: 'resultType',
      render: (val, record, index) => {
        return (<Select style={{ width: '100%' }} defaultValue="正常" onChange={(value) => { resultChange(record, value) }}>
          <Option value="正常">正常</Option>
          <Option value="异常"><span style={{ color: 'red' }}>异常</span></Option>
        </Select>)
      },
    }, {
      title: '结果信息描述',
      dataIndex: 'cmdparam',
      key: 'cmdparam',
      render: (v, record) => {
        return <Input onChange={(value) => { descriptionChange(record, value) }} />
      },
    }, {
      title: '实验名称',
      dataIndex: 'instanceName',
      key: 'instanceName',
    }, {
      title: '所属任务',
      dataIndex: 'taskName',
      key: 'taskName',
    },
  ]


  return (
    <div className={styles.listContainer}>
      <Toolbar {...toolbarProps} />
      <Table
        {...tableProps}
        style={{
          width: '100%'
        }}
        size="small"
        bordered
        scroll={{ x: 1250, y: 250 }}
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
