/**
 * Created by wyz on 2017/11/24.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { routerRedux } from 'dva/router'
import styles from './TabsBar.less'
import localmenus from 'models/constmenus'
const TabPane = Tabs.TabPane

class TabsBar extends React.Component {
  constructor (props) {
    super(props)
    this.newTabIndex = 0
    const panes = [
      { title: '参数浏览', content: 'Content of Tab 1', key: '1', route: '/paramsBrowse', closable: false },
    ]
    this.state = {
      activeKey: panes[0].key,
      panes,
    }
  }

  onChange = (activeKey) => {
    const currentRoute = this.state.panes.find(p => p.key === activeKey)
    this.setState({ activeKey })
    this.props.dispatch(routerRedux.push({
      pathname: currentRoute.route,
    }))
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey)
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey
    let lastIndex
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const panes = this.state.panes.filter(pane => pane.key !== targetKey)
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key
    }
    // panes = panes;
    this.setState({ panes })
    this.onChange(activeKey)
  }
  componentWillReceiveProps (nextProps) {
    const nextPathname = nextProps.location.pathname
    const { menu, location } = this.props
    const { panes } = this.state

    // console.log('TabsBar  pathname: %s ---- next: %s', location.pathname, nextPathname)
    const findCurrentPanes = panes.find(p => p.route === nextPathname)

    if (!findCurrentPanes) {
      if (menu.length === 1) { return }
      const rolesList = localmenus

      const currentMenu = rolesList.find(v => v.route === nextPathname)

      if (currentMenu) {
        panes.push({
          title: currentMenu.name,
          key: currentMenu.name,
          content: currentMenu.name,
          route: currentMenu.route,
        })
        this.setState({
          panes,
          activeKey: currentMenu.name,
        })
      } else {
        console.warn('TabBar --- currentMenu is undefined')
      }
    } else if (findCurrentPanes) {
      this.setState({
        activeKey: findCurrentPanes.key,
      })
    }
  }
  render () {
    return (
      <div className={styles.tabsBarContainer}>
        <Tabs
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          hideAdd
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}

export default TabsBar
