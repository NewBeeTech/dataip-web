import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Modal, Checkbox, Table } from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'
import CacheList from './CacheList'
import Interpretation from './Interpretation'
// import { PieChart, Pie } from 'recharts';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label, DataSet} from 'bizcharts';
import { View } from '@antv/data-set';
// import { Pie } from 'ant-design-pro/lib/Charts';
// import { WaterWave } from 'ant-design-pro/lib/Charts';
// import 'ant-design-pro/dist/ant-design-pro.css';
// import { Gauge } from 'ant-design-pro/lib/Charts';
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
    // const { DataView } = DataSet;
        const data = [
          { item: '内存占用', count: this.props.monitor.serverStatusDTO.memoryUnused },
          { item: '内存未使用', count: 100 - this.props.monitor.serverStatusDTO.memoryUnused },
          // { item: '事例三', count: 17 },
          // { item: '事例四', count: 13 },
          // { item: '事例五', count: 9 }
        ];
        const dv = new View();
        dv.source(data).transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        const cpudata = [
          { item: 'cpu占用', count: this.props.monitor.serverStatusDTO.cpuUsed },
          { item: 'cpu使用', count: 100 - this.props.monitor.serverStatusDTO.cpuUsed },
        ];
        const cpudv = new View();
        cpudv.source(cpudata).transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        const cols = {
          percent: {
            formatter: val => {
              val = (val * 100) + '%';
              return val;
            }
          }
        }
    return (
      <div>
        <div>
          {this.renderIpControl()}
        </div>
        <div className={styles.content}>
           <div style={{ marginRight: '10px' }}>
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
           <div>
             {this.props.monitor.serverStatusDTO.memoryUnused&&
               <div>
                 <div>内存使用情况</div>
                 <Chart height='300' width='300' data={dv} scale={cols} >
                   <Coord type='theta' radius={0.75} />
                   <Axis name="percent" />
                   <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
                   <Tooltip
                     showTitle={false}
                     itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                     />
                   <Geom
                     type="intervalStack"
                     position="percent"
                     color='item'
                     tooltip={['item*percent',(item, percent) => {
                       percent = percent * 100 + '%';
                       return {
                         name: item,
                         value: percent
                       };
                     }]}
                     style={{lineWidth: 1,stroke: '#fff'}}
                     >
                     <Label content='percent' offset={-40} textStyle={{
                         rotate: 0,
                         textAlign: 'center',
                         shadowBlur: 2,
                         shadowColor: 'rgba(0, 0, 0, .45)'
                       }} />
                   </Geom>
                </Chart>
               </div>
             }
             <br />
             {this.props.monitor.serverStatusDTO.cpuUsed&&
               <div>
                 <div>服务器CPU占用情况</div>
                 <Chart height='300' width='300' data={cpudv} scale={cols} >
                   <Coord type='theta' radius={0.75} />
                   <Axis name="percent" />
                   <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
                   <Tooltip
                     showTitle={false}
                     itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                     />
                   <Geom
                     type="intervalStack"
                     position="percent"
                     color='item'
                     tooltip={['item*percent',(item, percent) => {
                       percent = percent * 100 + '%';
                       return {
                         name: item,
                         value: percent
                       };
                     }]}
                     style={{lineWidth: 1,stroke: '#fff'}}
                     >
                     <Label content='percent' offset={-40} textStyle={{
                         rotate: 0,
                         textAlign: 'center',
                         shadowBlur: 2,
                         shadowColor: 'rgba(0, 0, 0, .45)'
                       }} />
                   </Geom>
                </Chart>
               </div>
             }
             {/* {
               this.props.monitor.serverStatusDTO.cpuUsed&&
               <WaterWave
                 height={161}
                 title="服务器CPU占用状态"
                 percent={this.props.monitor.serverStatusDTO.cpuUsed}
               />
             } */}
           </div>

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
