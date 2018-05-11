import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'

const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location, paramsManage }) => {
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
  ];
  const expandedRowRender = () => {
    const columns = [
      { title: '参数代号', dataIndex: 'date', key: 'date' },
      { title: '参数名称', dataIndex: 'name', key: 'name' },
      { title: '所属系统', dataIndex: 'upgradeNum', key: 'state' },
      { title: '所属参数集', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: '所属设备', dataIndex: 'upgradeNum', key: 'upgradeNum' },
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

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
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
        <Button>查询</Button>
    </Row>
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      // dataSource={data}
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
