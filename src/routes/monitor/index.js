import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table } from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'
import CacheList from './CacheList'
import Interpretation from './Interpretation'
// import { Pie } from 'ant-design-pro/lib/Charts';
// import { WaterWave } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';
import Tree from '../user/Tree'

const TabPane = Tabs.TabPane

const styles = require('./styles.css')

class Index extends React.Component {
  timer = null;
  componentWillMount() {
    const that = this;
    this.timer = setInterval(function () {
      that.props.dispatch({
        type: 'monitor/managerStatusModel',
        payload: {},
      });
    }, 2000);
  }
  ipControl = (ipControl) => {
    this.props.dispatch({
      type: 'monitor/ipControlModel',
      payload: {
        ipControl,
      }
    });
  }
  renderIpControl() {
    if (this.props.monitor.ipControl == 1) {
      return (
        <div style={{ paddingTop: '20px'}}>
          <span style={{ marginRight: '10px' }}>当前状态：已启用判读</span>
          <Button onClick={() => this.ipControl(0)} type="danger">禁用</Button>
        </div>
      );
    } else if (this.props.monitor.ipControl == 0) {
      return (
        <div style={{ paddingTop: '20px'}}>
          <span style={{ marginRight: '10px' }}>当前状态：已禁用判读</span>
          <Button onClick={() => this.ipControl(1)} type="primary">启用</Button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <div>
          {this.renderIpControl()}
        </div>
        <div className={styles.content}>
           <div>
             <Tree
               listTask={this.props.user.listTask}
               onSelect={(selectedKeys, info) => {
                 console.log(selectedKeys, info);
                 if (selectedKeys[0]) {
                   this.props.dispatch({
                     type: 'monitor/listInstanceByNameModel',
                     payload: {
                       taskName: selectedKeys[0],
                     },
                   })
                 }
                   // const { device } = info.node.props

                   // console.log('selected', selectedKeys, device)

                   // if (device && selectedKeys[0]) {
                     // dispatch({
                       // type: 'user/queryInstanceList',
                       // payload: {
                         // taskName: selectedKeys[0],
                       // },
                     // })
                   // }
                }}
             />
           </div>
           <Interpretation leftTable={this.props.monitor.leftTable} />
           <CacheList instanceCacheDTOList={this.props.monitor.instanceCacheDTOList} />
           {/* <div>
             {this.props.monitor.serverStatusDTO.memoryUnused&&
               <WaterWave
                 height={161}
                 title="服务器内存占用状态"
                 percent={this.props.monitor.serverStatusDTO.memoryUnused}
               />
             }
             <br />
             {
               this.props.monitor.serverStatusDTO.cpuUsed&&
               <WaterWave
                 height={161}
                 title="服务器CPU占用状态"
                 percent={this.props.monitor.serverStatusDTO.cpuUsed}
               />
             }
           </div> */}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}


Index.propTypes = {
  user: PropTypes.object,
  paramsBrowse: PropTypes.object,
  paramsManage: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ monitor, loading, user }) => ({ monitor, loading, user }))(Index)
