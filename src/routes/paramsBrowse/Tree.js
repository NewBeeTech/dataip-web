/**
 * Created by wyz on 2017/12/5.
 */

import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

class TreeBar extends React.Component {
  onSelect = (selectedKeys, info) => {
    const { device, isUser } = info.node.props
    const { dispatch } = this.props
    // console.log('selected', selectedKeys, device)

    if (device && selectedKeys[0]) {
      dispatch({
        type: 'paramsBrowse/queryParamsetName',
        payload: {
          device,
          isUser,
          paramsetName: selectedKeys[0],
        },
      })
    }
  }
  render () {
    const { paramList = [] } = this.props

    const treeNodes = paramList.map((p) => {
      const uniqueParamset = Array.from(new Set(p.paramsetName))

      if(!p.device) {
          return <TreeNode title={p} key={p} device={p} isUser/>
      }
      return (<TreeNode title={p.device} key={p.device} disable>
        { uniqueParamset.map(v => <TreeNode title={v} key={v} device={p.device} />) }
      </TreeNode>)
    })

    return (<div>
      <Tree
        onSelect={this.onSelect}
        style={{maxHeight:'45%'}}
      >
        {treeNodes}
      </Tree>
    </div>)
  }
}

export default TreeBar
