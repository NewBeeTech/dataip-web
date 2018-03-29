/**
 * Created by wyz on 2017/12/11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Page } from 'components'
import ChartComponent from 'components/Line/ChartComponent'
import { connect } from 'dva'


const Line = ({ manualJudge, ...prevProps }) => {
  const { lineChartData, colorArray, lineKeys, YAxisMax, YAxisMin, lineLoading } = manualJudge

  const chartProps = {
    lineChartData,
    colorArray,
    lineLoading,
    lineKeys,
    YAxisMax,
    YAxisMin,
    ...prevProps,
  }
  return (
    <Page>
      <ChartComponent {...chartProps} />
    </Page>
  )
}

Line.propTypes = {
  manualJudge: PropTypes.object,
  zoomQueryChartData: PropTypes.func,
}

export default connect(({ manualJudge }) => ({ manualJudge }))(Line)
