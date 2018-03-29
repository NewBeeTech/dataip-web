/**
 * Created by wyz on 2017/12/18.
 */

import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

class TreeBar extends React.Component {
  render () {
    const { listTask, onSelect } = this.props
    const taskList = Object.keys(listTask)

    const treeNodes = taskList.map((type) => {
      return (<TreeNode title={type} key={type} disable>
        { listTask[type].map(v => <TreeNode title={v} key={v} device={type} />) }
      </TreeNode>)
    })

    return (<div>
      {
        treeNodes.length ?
          <Tree
            onSelect={onSelect}
            defaultExpandAll
          >
            {treeNodes}
          </Tree>
          : 'loading tree'
      }
    </div>)
  }
}

export default TreeBar
