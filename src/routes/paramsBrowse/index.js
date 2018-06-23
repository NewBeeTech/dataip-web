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

const styles = require('./index.less');
const TabPane = Tabs.TabPane


const Index = ({ user, paramsBrowse, dispatch, loading, location }) => {
  const { paramList, pagination, listModalVisible, selectedRowKeys, paramsetList, listInstanceId , filterKey} = paramsBrowse
  const { listInstance, listUserParam,
      listDeviceParamset, paramsetName,
      isSetting, models = [],paramsForm = {}, taskModels = [],
  } = paramsBrowse

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
    loading: loading.effects['paramsBrowse/query', 'crossComparison/crossComparisonModel', 'paramsBrowse/downloadFiles1Model'],
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
    title: '选择试验',
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
  // 自定义参数组
  const customTreeProps = {
    paramList: listUserParam,
    dispatch,
  }

  const transferProps = {
    paramsetList,
    paramsetName,
    models,
    paramsForm,
    dispatch,
  }

  // console.log(' listProps dataSource %o ---- selectedInstanceList length: %o', listProps.dataSource, selectedInstanceList.length)
  // console. warn(models);

  return (<div className="content-inner">
    <Row>
      <Col span={3} className={styles.leftTree}>
        <p className={styles.leftTreeHeader}>自定义参数组</p>
        <Tree {...customTreeProps} />
        <p className={styles.leftTreeHeader}>默认参数组</p>
        <Tree {...treeProps} />
      </Col>
      <Col span={21}>
        {listModalVisible && <Modal {...modalProps} />}
        <Row style={{ marginLeft: '10px'}}>
          <Col span={23}>
            {(list.length && !listModalVisible || listInstance.length) && <List {...listProps} />}
          </Col>
          <Col span={1}>
            <div style={{ marginBottom: 10, width: 20, marginLeft: 10 }}>
              <Tooltip placement="leftTop" title='选择试验'>
                <Button className={styles.iconBtn} onClick={handleBtnClick} icon='select'></Button>
              </Tooltip>
              <Tooltip placement="leftTop" title='设置当前任务'>
                <Button className={styles.iconBtn} onClick={setCurrentTask} icon='setting'></Button>
              </Tooltip>

            </div>
          </Col>
        </Row>


        <Row style={{ marginLeft: '10px'}} className={styles.rightCard}>
          <Col span={24}>
            <CustomTransfer {...paramsBrowse} {...transferProps} downloadLoading={loading.effects['paramsBrowse/downloadFiles1Model']} />
          </Col>
        </Row>
      </Col>
    </Row>
    <AntdModal
      visible={isSetting}
      title='设置当前任务'
      okText='设置'
      onCancel={()=>dispatch({type:'paramsBrowse/updateState', payload: {isSetting:false}})}
      onOk={()=>dispatch({type: 'paramsBrowse/confirmSetCurrentTask'})}
    >
      <Row style={{marginBottom: 10, marginTop:20}}>
        <Col span={2}>型号：</Col>
        <Col span={22}>
          <InputSelect style={{width:'100%'}} options={models}
                       onChange={value=> {
                         dispatch({type: 'paramsBrowse/updateState', payload: {currentTaskModel: value}});
                         dispatch({
                           type: 'paramsBrowse/queryTasksByModelNameModel',
                           payload: {
                             modelName: value,
                           }
                         });
                       }}
                       value={paramsBrowse.currentTaskModel}></InputSelect>
        </Col>

      </Row>
      <Row>
        <Col span={2}>任务：</Col>
        <Col span={22}>
          <InputSelect
            options={taskModels}
            value={paramsBrowse.currentTask}
            onChange={value=>dispatch({type: 'paramsBrowse/updateState', payload: {currentTask: value}})}
            style={{width:'100%'}}></InputSelect>
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

export default connect(({ user, paramsBrowse, crossComparison, loading }) => ({ user, paramsBrowse, loading }))(Index)
