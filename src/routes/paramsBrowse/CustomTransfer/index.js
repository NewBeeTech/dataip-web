/**
 * Created by wyz on 2017/12/31.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip} from 'antd'
import styles from './style.less'
import CardList from './CardList'

class TransferTable extends React.Component {
  state = {
    targetMatchKey: '',
    targetKeys: [],
    selectedKeys: [], // 保持选择的状态  标记选中效果
    targetSelectedObjects: [], // 保持右边的数组 --object
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
    console.log('保存为参数组')
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
    const { paramsetList } = this.props

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
              <div>
                <Tooltip title='启动判'>
                    <Button icon='play-circle' onClick={this.handleStarter} className="margin-bottom8" title='启动判读' ></Button>
                </Tooltip>


                <Tooltip title='数据下载'>
                    <Button icon='download' onClick={this.handleStarter} className="margin-bottom8" title='数据下载' ></Button>
                </Tooltip>


                <Tooltip title='保存为参数组'>
                    <Button icon='save' onClick={this.saveParamSet} className="margin-bottom8" title='保存为参数组' ></Button>
                </Tooltip>


                <Tooltip title='更新参数组'>
                    <Button icon='sync' onClick={this.saveParamSet} className="margin-bottom8" title='更新参数组' ></Button>
                </Tooltip>


              </div>
           </Col>
        </Row>
      </div>
    )
  }
}

export default TransferTable
