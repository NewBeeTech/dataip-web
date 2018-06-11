import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Tabs, Button, Icon, Input, Tooltip, Modal, Checkbox, Table} from 'antd'
import { routerRedux } from 'dva/router'
import InputSelect from '@@/Inputselect'
import CacheList from './CacheList'
import Interpretation from './Interpretation'
// import { Pie } from 'ant-design-pro/lib/Charts';
import { WaterWave } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';

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

  render() {
    return (
      <div className={styles.content}>
         <div>第一块</div>
         <Interpretation />
         <CacheList />
         <div>
           <WaterWave
             height={161}
             title="服务器内存占用状态"
             percent={this.props.monitor.serverStatusDTO.memoryUnused}
           />
           <WaterWave
             height={161}
             title="服务器CPU占用状态"
             percent={this.props.monitor.serverStatusDTO.cpuUsed}
           />
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

export default connect(({ monitor, loading }) => ({ monitor, loading }))(Index)
