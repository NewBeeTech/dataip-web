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
  function deleteParams(record) {
    // console.log('delete: ', record);
    dispatch({
      type: 'paramsManage/userParamsetDeleteModel',
      payload: {
        userParamsetName: record.userParamsetName,
        userParamsetId: record.userParamsetId,
        modelName: record.modelName,
        isEssential: record.isEssential,
      }
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
  /**
   * 展现编辑模态框
   * @return {[type]} [description]
   */
  function showEditModal(record) {
    dispatch({
        type: 'paramsManage/updateState',
        payload: {
          showEditModal: true,
          editInfo: {
            modelName: record.modelName,
            isEssential: record.isEssential,
            userParamsetName: record.userParamsetName,
          }
        }
    });
  }
  function hideEditModal() {
    dispatch({
        type: 'paramsManage/updateState',
        payload: {
          showEditModal: false,
          editInfo: {
            userParamsetName: '', // 参数组名称
            isEssential: '', // 必判
            modelName: '', // 型号
          },
        }
    });
  }
  const columns = [
    { title: '参数组名称', dataIndex: 'userParamsetName', key: 'userParamsetName' },
    {
      title: '是否必判',
      dataIndex: 'isEssential',
      key: 'isEssential',
      render: (value) => (
        <span className="table-operation">
          {value == 1 ? '是' : '否'}
        </span>
      )
    },
    { title: '所属型号', dataIndex: 'modelName', key: 'modelName' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (rowValue, record) => (
        <span className="table-operation">
          <Button onClick={() => showEditModal(record)} type="primary">编辑</Button>
          <Button style={{ margin: '0 5px' }}>保存</Button>
          <Button onClick={() => deleteParams(record)}  type="danger">删除</Button>
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
    <Modal
        visible={ paramsManage.showEditModal}
        title='更新自定义参数组'
        footer={
            <div>
                <Button onClick={hideEditModal}>取消</Button>
                <Button onClick={()=>confirmUpdate('append')} type='primary' style={{marginLeft:10}}>更新</Button>
            </div>
        }
        onCancel={hideEditModal}
    >
        <Row style={{marginBottom: 10, marginTop:20}}>
            <Col span={2}>型号：</Col>
            <Col span={22}>
                <InputSelect
                    style={{width:'100%'}}
                    options={paramsManage.models}
                    disableInput
                    onChange={value=> {
                      dispatch({
                        type: 'paramsManage/updateState',
                        payload: {
                          editInfo: {
                            ...paramsManage.editInfo,
                            modelName: value,
                          }
                        }
                      });
                    }}
                    value={paramsManage.editInfo.modelName}
                ></InputSelect>
            </Col>

        </Row>
        <Row>
            <Col span={2}>名称：</Col>
            <Col span={22}>
                <Input style={{width:'100%'}}
                    disableInput
                    value={paramsManage.editInfo.userParamsetName}
                    onChange={e => {
                      dispatch({
                        type: 'paramsManage/updateState',
                        payload: {
                          editInfo: {
                            ...paramsManage.editInfo,
                            userParamsetName: e.target.value,
                          }
                        }
                      });
                    }}
                ></Input>
            </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox
              onChange={e => {
                // console.log(e);onChangeParamForm('isEssential', e.target.checked ? 1 : 0)
                dispatch({
                  type: 'paramsManage/updateState',
                  payload: {
                    editInfo: {
                      ...paramsManage.editInfo,
                      isEssential: e.target.checked ? 1 : 0,
                    }
                  }
                });
              }}
              checked={paramsManage.editInfo.isEssential}
            >
              设置为必判参数
            </Checkbox>
          </Col>
        </Row>
    </Modal>
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
