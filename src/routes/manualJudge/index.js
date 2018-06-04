/**
 * Created by wyz on 2017/12/6.
 */
// 人工判读

import React from 'react'
import { Page } from 'components'
import { request, config } from 'utils'
import { connect } from 'dva'
import List from './List'
import Line from './Line'
import HasReportModal from './HasReportModal';
import CreateReportModal from './CreateReportModal';
import ChooseReportModal from './ChooseReportModal'

class ManualJudgePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result: '',
    }
  }

  render () {
    const { dispatch, paramsBrowse, manualJudge, loading } = this.props
    const { selectedRowKeys } = manualJudge

    const listProps = {
      rowKey: record => `${record.tableName}-${record.columnName}`,
      dispatch,
      dataSource: paramsBrowse.judgeList,
      loading: loading.effects['manualJudge/query'],
      pagination: false,
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'manualJudge/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const lineProps = {
      // 上边表格当前选中的
      selectedJudges: paramsBrowse.judgeList.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1),
      // 放大缩小图表 start end
      zoomQueryChartData: (start, end) => {
        const tableList = paramsBrowse.judgeList
        const postDto = tableList.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1)
        dispatch({
          type: 'manualJudge/loadChart',
          payload: { start, end, listManualJudgeDTO: postDto },
        })
      },
      // 加载chart 发送选中的  曲线左侧 line 图标
      queryChartData: (record) => {
        const tableList = paramsBrowse.judgeList
        const postDto = tableList.filter(v => selectedRowKeys.indexOf(`${v.tableName}-${v.columnName}`) > -1)
        console.log('postDto --', postDto)
        if (postDto.length > 0) {
          dispatch({
            type: 'manualJudge/loadChart',
            payload: { start: 0, end: -1, listManualJudgeDTO: postDto },
          })
        }
      },
    }

    return (
      <Page inner>
        <HasReportModal
          dispatch={dispatch}
          hasReportModal={manualJudge.hasReportModal}
          hasReport={manualJudge.hasReport}
          currentReport={manualJudge.currentReport}
        />
        <CreateReportModal
          dispatch={dispatch}
          createReportModal={manualJudge.createReportModal}
          models={manualJudge.models}
          tasks={manualJudge.tasks}
          instances={manualJudge.instances}
          createReport={() => {
            dispatch({
              type: 'manualJudge/reportCreateModel',
            });
          }}
        />
        <ChooseReportModal
          dispatch={dispatch}
          chooseReportModal={manualJudge.chooseReportModal}
          models={manualJudge.models}
          tasks={manualJudge.tasks}
          instances={manualJudge.instances}
          reports={manualJudge.reports}
          chooseReport={() => {
            dispatch({
              type: 'manualJudge/chooseReport',
            });
          }}
        />
        {
          paramsBrowse.judgeList.length ?
            <div>
              <List {...listProps} />
              <Line {...lineProps} />
            </div> :
            <div>暂无数据</div>
        }
      </Page>
    )
  }
}

export default connect(({ manualJudge, paramsBrowse, loading }) => ({ manualJudge, paramsBrowse, loading }))(ManualJudgePage)
