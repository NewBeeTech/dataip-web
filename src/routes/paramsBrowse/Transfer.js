/**
 * Created by wyz on 2017/12/6.
 */

import React from 'react'
import { Transfer, Button } from 'antd'
import listStyle from './List.less'

class TransferTable extends React.Component {
  state = {
    targetKeys: [],
    selectedKeys: [],
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys })

    // console.log('targetKeys: ', targetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
  }

  saveParamSet = () => {
    console.log('保存为参数组')
  }

  handleStarter = (key) => {
    const { targetKeys } = this.state
    const { paramsetList, dispatch } = this.props
    const filtered = paramsetList.filter(p => targetKeys.indexOf(p.paramName) > -1)
    const paramCodes = filtered.map(_ => _.paramCode)
    console.log('参数---', paramCodes)
    dispatch({
      type: 'paramsBrowse/queryStartJudge',
      payload: {
        paramCodes,
      },
    })
  }

  render () {
    const state = this.state
    const { paramsetList, paramsetName } = this.props
    console.log('当前选择的paramsetName ---', paramsetName)
    // const transferList = paramsetList.map((p, i) => ({ key: `transfer-key-${i}`, title: p.paramName }))
    const transferList = paramsetList.map((p, i) => ({ key: p.paramName, title: p.paramName }))

    return (
      <div>
        <div style={{ marginBottom: 10, marginLeft: 'calc( 40% + 45px )' }}>
          <Button onClick={this.handleStarter} className="margin-right8">启动判读</Button>
          <Button onClick={this.saveParamSet}>保存为参数组</Button>
        </div>
        <Transfer
          rowKey={record => record.id}
          dataSource={paramsetList}
          titles={['待选参数', '已选参数']}
          targetKeys={state.targetKeys}
          selectedKeys={state.selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          listStyle={{ width: '40%', height: 350 }}
          render={(item) => {
            if (item.paramsetName === paramsetName) {
              return item.paramName
            }
            return {
              label: <div className={listStyle.hide} />,
              value: 'test',
            }
          }}
        />
      </div>
    )
  }
}

export default TransferTable
