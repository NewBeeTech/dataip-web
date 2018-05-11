import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'

const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location, paramsManage }) => {
  function search() {
    dispatch({
      type: 'paramsManage/queryParamsList',
      payload: {
        modelName: paramsManage.paramsForm.modelName,
      },
    })
  }
  function onChangeParamForm(name, value) {
      dispatch({
          type: 'paramsManage/updateParamForm',
          payload: {
              name,
              value: value.target ? value.target.value : value
          }
      })
  }
  const columns = [
    { title: '参数组名称', dataIndex: 'userParamsetName', key: 'userParamsetName' },
    { title: '是否必判', dataIndex: 'isEssential', key: 'isEssential' },
    { title: '所属型号', dataIndex: 'modelName', key: 'modelName' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <Button type="primary">编辑</Button>
          <Button style={{ margin: '0 5px' }}>保存</Button>
          <Button type="danger">删除</Button>
        </span>
      ),
    },
  ];
  let data = paramsManage.list;
  data = data && data.map((item, key) => ({ ...item, key }));
  const expandedRowRender = (row) => {
    const columns = [
      { title: '参数代号', dataIndex: 'paramCode', key: 'paramCode' },
      { title: '参数名称', dataIndex: 'paramName', key: 'paramName' },
      { title: '所属系统', dataIndex: 'upgradeNum', key: 'state' },
      { title: '所属参数集', dataIndex: 'paramsetName', key: 'paramsetName' },
      { title: '所属设备', dataIndex: 'device', key: 'device' },
      // { title: '操作', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
            {/* <Dropdown overlay={menu}>
              <a href="javascript:;">
                More <Icon type="down" />
              </a>
            </Dropdown> */}
          </span>
        ),
      },
    ];

    const data = row.listParamSelectDTO || [];
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };
  return (<div className="content-inner">
    <Row style={{marginBottom: 10, marginTop:20}}>
        <Col span={2}>型号：</Col>
        <Col span={6}>
            <InputSelect style={{width:'100%'}}
                disableInput
                onChange={value=>onChangeParamForm('modelName', value)}
                options={paramsManage.models}
                value={paramsManage.paramsForm.modelName}
            >
            </InputSelect>
        </Col>
        <Button onClick={search}>查询</Button>
    </Row>
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  </div>)
}

Index.propTypes = {
  user: PropTypes.object,
  paramsBrowse: PropTypes.object,
  paramsManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, paramsBrowse, loading, paramsManage }) => ({ user, paramsBrowse, loading, paramsManage }))(Index)
