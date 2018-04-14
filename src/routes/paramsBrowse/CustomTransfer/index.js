/**
 * Created by wyz on 2017/12/31.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal} from 'antd'
import styles from './style.less'
import CardList from './CardList'
import InputSelect from '@@/Inputselect'

class TransferTable extends React.Component {
  state = {
    targetMatchKey: '',
    targetKeys: [],
    selectedKeys: [], // 保持选择的状态  标记选中效果
    targetSelectedObjects: [], // 保持右边的数组 --object
    isUpdating: false,
    isSaving: false
  }

  // 点击方向按钮触发
  handleChange = (direction) => {
    const { targetSelectedObjects, selectedKeys } = this.state
    let targetSelectedObjectsCopy = _.clone(targetSelectedObjects)
    const { paramsetList } = this.props
    // direction 向左 向右
    if (!direction) {
      return false
    } else if (direction === 'right') {
      // 添加到选中数据里的就可以
      const selectList = paramsetList.filter((p, i) => _.includes(selectedKeys, p.id))
      selectList.forEach((item) => {
        if (!targetSelectedObjects.find(v => v.id === item.id)) {
          targetSelectedObjectsCopy.push(item)
        }
      })
    } else if (direction === 'left') {
      // 只要删除选中数据里的就可以 右边
      _.remove(targetSelectedObjectsCopy, cy => _.findIndex(selectedKeys, k => k === cy.id) > -1)
  }else if(direction === 'allLeft'){
      targetSelectedObjectsCopy = []

  }else if(direction === 'allRight'){
      targetSelectedObjectsCopy = [...paramsetList]
  }
    // console.log('----targetSelectedObjects ----', targetSelectedObjectsCopy)
    this.setState({
      targetSelectedObjects: targetSelectedObjectsCopy,
    })
  }

  handleSelectChange = (selectedKey) => {
    const { selectedKeys } = this.state
    const newKeys = _.clone(selectedKeys)
    if (_.findIndex(newKeys, v => v === selectedKey) > -1) {
      _.remove(newKeys, v => v === selectedKey)
    } else {
      newKeys.push(selectedKey)
    }

    this.setState({ selectedKeys: newKeys })
  }

  saveParamSet = () => {
    this.props.dispatch({
        type: 'paramsBrowse/updateState',
        payload: {
            isSaving: true,
            paramsForm: {}
        }
    })
  }
  updateParamSet = () => {
      this.props.dispatch({
          type: 'paramsBrowse/updateState',
          payload: {
              isUpdating: true,
              paramsForm: {}
          }
      })
  }

  handleStarter = (key) => {
    const { targetSelectedObjects } = this.state
    const { dispatch } = this.props
    const dataDto = targetSelectedObjects.map(obj => _.omit(obj, 'id'))
    dispatch({
      type: 'paramsBrowse/queryStartJudge',
      payload: {
        paramSelect: dataDto,
      },
    })
  }



  render () {
    const state = this.state
    const props = this.props
    const { paramsetList, models, paramsForm={} , dispatch, listUserParam = []} = props

    function onChangeParamForm(name, value) {
        dispatch({
            type: 'paramsBrowse/updateParamForm',
            payload: {
                name,
                value: value.target ? value.target.value : value
            }
        })
    }

    const confirmUpdate = (type)=>{
        const { targetSelectedObjects } = this.state
        const data = targetSelectedObjects.map(obj => _.omit(obj, 'id'))
            dispatch({
                type:'paramsBrowse/updateParamSet',
                payload: {
                    type,
                    listParamSelectDTO: data
                }
            })
    }
    const confirmAdd = ()=>{
        const { targetSelectedObjects } = this.state
        const data = targetSelectedObjects.map(obj => _.omit(obj, 'id'))
            dispatch({
                type:'paramsBrowse/updateParamSet',
                payload: {
                    listParamSelectDTO: data
                }
            })
    }
    return (
      <div>

        <Row>
            <Col span={10}>
                选择参数： <Input value={state.targetMatchKey} onChange={e=>this.setState({targetMatchKey:e.target.value})}/>
            </Col>
        </Row>
        <Row>
          <Col span={10}>

            <CardList
              rowKey="id"
              onSelectChange={this.handleSelectChange}
              selectedKeys={state.selectedKeys}
              list={_.difference(paramsetList, state.targetSelectedObjects)
                  .filter(i => (i.paramName.match(state.targetMatchKey) || i.paramCode.match(state.targetMatchKey)))}
              title="待选参数"
            />
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <div >

                <Button type="primary" style={{ marginTop: 150 }} onClick={() => { this.handleChange('left') }}>
                  <Icon type="left" />
                </Button>

                <h3 style={{ height: 15 }} />
                <Button type="primary"  onClick={() => { this.handleChange('allLeft') }}>
                  <Icon type="double-left" />
                </Button>
                <h3 style={{ height: 15 }} />
                <Button type="primary" onClick={() => { this.handleChange('right') }}>
                  <Icon type="right" />
                </Button>
                <h3 style={{ height: 15 }} />
                <Button type="primary" onClick={() => { this.handleChange('allRight') }}>
                  <Icon type="double-right" />
                </Button>
            </div>
          </Col>
          <Col span={10}>
            <CardList
              rowKey="id"
              onSelectChange={this.handleSelectChange}
              selectedKeys={state.selectedKeys}
              list={state.targetSelectedObjects}
              title="已选参数"
            />
          </Col>
          <Col span={2}>
              <div style={{width:15}}>
                <Tooltip title='启动判'>
                    <Button icon='play-circle' onClick={this.handleStarter} className="margin-bottom8" title='启动判读' ></Button>
                </Tooltip>


                <Tooltip title='数据下载'>
                    <Button icon='download' onClick={this.download} className="margin-bottom8" title='数据下载' ></Button>
                </Tooltip>


                <Tooltip title='保存为参数组'>
                    <Button icon='save' onClick={this.saveParamSet} className="margin-bottom8" title='保存为参数组' ></Button>
                </Tooltip>


                <Tooltip title='更新参数组'>
                    <Button icon='sync' onClick={this.updateParamSet} className="margin-bottom8" title='更新参数组' ></Button>
                </Tooltip>

              </div>
           </Col>
        </Row>

        <Modal
            visible={props.isSaving}
            title='创建自定义参数组'
            footer={
                <div>
                    <Button  onClick={()=>dispatch({type:'paramsBrowse/updateState', payload: {isSaving:false}})}>取消</Button>
                    <Button onClick={confirmAdd} type='primary' style={{marginLeft:10}}>保存</Button>
                </div>
            }
            onCancel={()=>this.setState({isSaving:false})}
        >
            <Row style={{marginBottom: 10, marginTop:20}}>
                <Col span={2}>型号：</Col>
                <Col span={22}>
                    <InputSelect style={{width:'100%'}}
                        disableInput
                        onChange={value=>onChangeParamForm('modelName', value)}
                        options={models} value={paramsForm.modelName}></InputSelect>
                </Col>

            </Row>
            <Row>
                <Col span={2}>名称：</Col>
                <Col span={22}>
                    <Input type='textarea'
                        onChange={value=>onChangeParamForm('userParamsetName', value)}
                        value={paramsForm.userParamsetName} ></Input>
                </Col>
            </Row>
        </Modal>

        <Modal
            visible={ props.isUpdating}
            title='更新自定义参数组'
            footer={
                <div>
                    <Button onClick={()=>dispatch({type:'paramsBrowse/updateState', payload: {isUpdating:false}})}>取消</Button>
                    <Button onClick={()=>confirmUpdate('append')} type='primary' style={{marginLeft:10}}>追加</Button>
                    <Button onClick={()=>confirmUpdate('update')} type='primary' style={{marginLeft:10}}>覆盖</Button>
                </div>
            }
        >
            <Row style={{marginBottom: 10, marginTop:20}}>
                <Col span={2}>型号：</Col>
                <Col span={22}>
                    <InputSelect style={{width:'100%'}} options={models}
                        disableInput
                        onChange={value=>onChangeParamForm('modelName', value)}
                        value={paramsForm.modelName}
                    ></InputSelect>
                </Col>

            </Row>
            <Row>
                <Col span={2}>名称：</Col>
                <Col span={22}>
                    <InputSelect style={{width:'100%'}}
                        disableInput
                        value={paramsForm.userParamsetName}
                        options={listUserParam.map(i=>({name:i, value:i}))}
                        onChange={value=>onChangeParamForm('userParamsetName', value)}
                    ></InputSelect>
                </Col>
            </Row>
        </Modal>

      </div>
    )
  }
}

export default TransferTable
