import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Tooltip, Modal as AntdModal} from 'antd'
import { routerRedux } from 'dva/router'
import List from './List'
import Tree from './Tree'
import Transfer from './Transfer'
import CustomTransfer from './CustomTransfer'
import InputSelect from '@@/Inputselect'
import Modal from './Modal'

const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location }) => {
  const { paramList, pagination, listModalVisible, selectedRowKeys, paramsetList, listInstanceId , filterKey} = paramsBrowse
  const { listInstance, listUserParam, listDeviceParamset, paramsetName , isSetting} = paramsBrowse
  const { list, listTask } = user
  const { query = {}, pathname } = location

  // 根据 instanceId 列出选择过的试验
  const selectedInstanceList = list.filter(item => listInstanceId.indexOf(item.instanceId) > -1)
  const listProps = {
    size: 'middle',
    rowKey: 'instanceId',
    pagination: {
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: selectedInstanceList.length,
    },
    dataSource: selectedInstanceList.length ? selectedInstanceList : listInstance,
    loading: loading.effects['paramsBrowse/query'],
  }

  const modalProps = {
    visible: listModalVisible,
    dataSource: list,
    listTask,
    width: 900,
    height: 800,
    dispatch,
    filterKey,
    selectedRowKeys,
    title: '选择实验',
    confirmLoading: loading.effects['paramsBrowse/query'],
    onOk (data) {
      dispatch({
        type: 'paramsBrowse/queryParams',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'paramsBrowse/hideModal',
      })
    },
  }

  const handleBtnClick = (key) => {
    dispatch({
      type: 'paramsBrowse/showModal',
    })
  }

  function setCurrentTask() {
      dispatch({
        type: 'paramsBrowse/updateState',
        payload: {
            isSetting: true
        }
      })
  }


  // 默认参数列表
  const treeProps = {
    paramList: paramList.length ? paramList : listDeviceParamset,
    dispatch,
  }
  console.log(listUserParam,'listUserParam');
  // 自定义参数组
  const customTreeProps = {
    paramList: listUserParam,
    dispatch,
  }

  const transferProps = {
    paramsetList,
    paramsetName,
    dispatch,
  }

  // console.log(' listProps dataSource %o ---- selectedInstanceList length: %o', listProps.dataSource, selectedInstanceList.length)

  return (<div className="content-inner">
    <Row>
      <Col span={4}>
        <p>自定义参数组</p>
        <Tree {...customTreeProps} />
        <p>默认参数组</p>
        <Tree {...treeProps} />
      </Col>
      <Col span={20}>

        {listModalVisible && <Modal {...modalProps} />}
        <Row>
            <Col span={22}>
                {(list.length && !listModalVisible || listInstance.length) && <List {...listProps} />}
            </Col>
            <Col span={2}>
                <div style={{ marginBottom: 10 }}>
                    <Tooltip title='选择试验'>
                        <Button onClick={handleBtnClick} icon='select'></Button>
                    </Tooltip>
                    <Tooltip title='设置当前任务'>
                        <Button onClick={setCurrentTask} icon='setting'></Button>
                    </Tooltip>

                </div>
            </Col>
        </Row>


        <Row>
          <Col span={24}>
            <CustomTransfer {...transferProps} />
          </Col>
        </Row>
      </Col>
    </Row>
    <AntdModal
        visible={isSetting}
        title='设置当前实验'
        okText='设置'
        onCancel={()=>dispatch({type:'paramsBrowse/updateState', payload: {isSetting:false}})}
    >
        <Row style={{marginBottom: 10, marginTop:20}}>
            <Col span={2}>型号：</Col>
            <Col span={22}>
                <InputSelect style={{width:'100%'}}></InputSelect>
            </Col>

        </Row>
        <Row>
            <Col span={2}>任务：</Col>
            <Col span={22}>
                <InputSelect style={{width:'100%'}}></InputSelect>
            </Col>
        </Row>
    </AntdModal>
  </div>)
}

Index.propTypes = {
  user: PropTypes.object,
  paramsBrowse: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ user, paramsBrowse, loading }) => ({ user, paramsBrowse, loading }))(Index)
