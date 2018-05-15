import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'

const TabPane = Tabs.TabPane
const styles = require('./styles.less');


const Index = ({ user, paramsBrowse, dispatch, loading, location, paramsManage }) => {
  function search() {
    dispatch({
      type: 'paramsManage/queryParamsList',
      payload: {
        modelName: paramsManage.paramsForm.modelName,
      },
    })
  }
  /**
   * 删除自定义参数组
   * @param  {[type]} record [description]
   * @return {[type]}        [description]
   */
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
    });
  }
  /**
   * 更新自定义参数组
   * @return {[type]}        [description]
   */
  function updateParams() {
    // console.log('delete: ', record);
    dispatch({
      type: 'paramsManage/userParamsetUpdateModel',
      payload: paramsManage.editInfo,
    });
  }
  /**
   * 覆盖自定义参数组
   * @return {[type]}        [description]
   */
  function replaceParams(record) {
    console.log('replace: ', record);
    dispatch({
      type: 'paramsManage/userParamsetReplaceModel',
      payload: {
        userParamsetId: record.userParamsetId,
        modelName: record.modelName,
        userParamsetName: record.userParamsetName,
        isEssential: record.isEssential,
        listParamSelectDTO: record.listParamSelectDTO,
      },
    });
  }
  function onChangeParamForm(name, value) {
      dispatch({
          type: 'paramsManage/updateParamForm',
          payload: {
              name,
              value: value.target ? value.target.value : value
          }
      });
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
            userParamsetId: record.userParamsetId,
          }
        }
    });
  }
  /**
   * 隐藏编辑模态框
   * @return {[type]} [description]
   */
  function hideEditModal() {
    dispatch({
        type: 'paramsManage/updateState',
        payload: {
          showEditModal: false,
          editInfo: {
            userParamsetName: '', // 参数组名称
            isEssential: '', // 必判
            modelName: '', // 型号
            userParamsetId: '',
          },
        }
    });
  }
  /**
   * 向上
   * @return {[type]} [description]
   */
  function forward(key, index) {
    console.log(key, index);
    dispatch({
      type: 'paramsManage/forward',
      payload: {
        firstRow: key,
        secondRow: index,
      },
    })
  }
  /**
   * 向下
   * @return {[type]} [description]
   */
  function backward(key, index) {
    console.log(key, index);
    dispatch({
      type: 'paramsManage/backward',
      payload: {
        firstRow: key,
        secondRow: index,
      },
    })
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
          <Button onClick={() => replaceParams(record)} style={{ margin: '0 5px' }}>保存</Button>
          <Button onClick={() => deleteParams(record)}  type="danger">删除</Button>
        </span>
      ),
    },
  ];
  let data = paramsManage.list;
  data = data && data.map((item, key) => ({ ...item, key }));
  console.warn('data', data);
  const expandedRowRender = (row, key) => {
    const columns = [
      { title: '参数代号', dataIndex: 'paramCode', key: 'paramCode' },
      { title: '参数名称', dataIndex: 'paramName', key: 'paramName' },
      { title: '所属系统', dataIndex: 'upgradeNum', key: 'state' },
      { title: '所属参数集', dataIndex: 'paramsetName', key: 'paramsetName' },
      { title: '所属设备', dataIndex: 'device', key: 'device' },
      // { title: '操作', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: '排序',
        dataIndex: 'operation',
        key: 'operation',
        render: (value, row1, index) => {
          return (
            <div>
              <Button icon="up" onClick={() => forward(key, index)} style={{ marginRight: '15px' }} />
              <Button icon="down" onClick={() => backward(key, index)} />
            </div>
          )
        },
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
    <div className={styles.modelNameHeader}>
        <div >型号：</div>
        <div className={styles.modelNameSelect}>
            <InputSelect

                disableInput
                onChange={value=>onChangeParamForm('modelName', value)}
                options={paramsManage.models}
                value={paramsManage.paramsForm.modelName}
            >
            </InputSelect>
        </div>
        <Button onClick={search}>查询</Button>
    </div>
    <Table
      className="components-table-demo-nested"
      rowClassName={() => styles.rowClassName}
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
                <Button onClick={updateParams} type='primary' style={{marginLeft:10}}>更新</Button>
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
