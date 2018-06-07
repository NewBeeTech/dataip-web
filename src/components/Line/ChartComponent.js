import React from 'react'
import propTypes from 'prop-types'
import { Row, Col, Spin } from 'antd'
import { Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea } from 'recharts'
import html2canvas from 'html2canvas';

import LineToolbar from './LineToolbar'

const initialState = {
  refAreaLeft: '',
  refAreaRight: '',
  animation: true,
}


class ChartComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  zoom () {
    let { refAreaLeft, refAreaRight } = this.state
    const { zoomQueryChartData } = this.props

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }))
      return
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      const tem = refAreaLeft
      refAreaLeft = refAreaRight
      refAreaRight = tem
    }
    console.log('start: refAreaLeft: %s ---- end: refAreaRight: %s', refAreaLeft, refAreaRight)

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
    }))
    zoomQueryChartData(refAreaLeft, refAreaRight)
  }

  zoomOut () {
    const { data } = this.state
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+10',
      bottom: 'dataMin-10',
    }))
  }

  render () {
    const {
      lineChartData,
      lineKeys,
      colorArray,
      lineLoading,
      YAxisMax,
      YAxisMin,
      zoomQueryChartData,
      queryChartData,
      selectedJudges,
      clear,
      report,
      viewData
    } = this.props
    const { refAreaLeft, refAreaRight } = this.state

    const toolBarProps = {
      queryChartData,
      clear,
      report,
      viewData,
      saveImg() {
        console.log('save');
        console.log(document.getElementById('chartContainer'));
        html2canvas(document.getElementById('chartContainer'), {
            logging: true,
            // allowTaint: true,
            useCORS: true,
          }).then(canvas => {
            // const dataURL = canvas.toDataURL("image/png");
            // console.log(dataURL);
            canvas.toBlob(function(blob) {
              var anchor = document.createElement('a'),
              dataUrl  = URL.createObjectURL(blob),
              fileName = 'line.png';

              // set a attributes
              anchor.setAttribute('href', dataUrl);
              anchor.setAttribute('target', '_blank');
              anchor.setAttribute('download', fileName);
              // simulate click
              if (document.createEvent) {
                const evtObj = document.createEvent('MouseEvents');
                evtObj.initEvent('click', true, true);
                anchor.dispatchEvent(evtObj);
              }
              else if (anchor.click) {
                anchor.click();
              }
            });
          })
      },
      reset () {
        zoomQueryChartData(0, -1)
      },
    }
    const renderLegend = (props) => {
      const { payload } = props
      // console.log('renderLegend  %o ---  selectedJudges: %o', payload, selectedJudges)
      return (
        <ul>
          {
            payload.map((entry, index) => {
              const currentItem = selectedJudges.find(j => j.paramCode === entry.value) || {}
              // t 坐标不显示
              if (entry.value === 't') {
                return null
              }
              return (<li
                key={`item-${index}`}
                className="recharts-legend-item legend-item-1"
                style={{ display: 'block', marginRight: '10px' }}
              >
                <svg
                  className="recharts-surface"
                  width="14"
                  height="14"
                  viewBox="0 0 32 32"
                  version="1.1"
                  style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }}
                >
                  <path
                    strokeWidth="4"
                    fill="none"
                    stroke={entry.color}
                    d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
                    className="recharts-legend-icon"
                  />
                </svg>
                <span className="recharts-legend-item-text">{`${entry.value}${currentItem.instanceName ? ` - ${currentItem.instanceName}` : ''}`}</span>
              </li>)
            })
          }
        </ul>
      )
    }
    const chartContainer = document.getElementById('chartContainer') // eslint-disable-line
    const containerWidth = chartContainer ? chartContainer.offsetWidth : 1600
    // console.log('容器 w:', containerWidth)
    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>

        <Row>
          <Col xs={4} sm={4} md={2} lg={1}>
            <LineToolbar {...toolBarProps} />
          </Col>
          <Col id="line" xs={20} sm={20} md={22} lg={23} id="chartContainer">
            <Spin spinning={lineLoading}>
              <LineChart
                margin={{ top: 15, right: 5, bottom: 5, left: 10 }}
                width={containerWidth - 200} // legend width
                height={520}
                data={lineChartData}
                onMouseDown={(e) => e && this.setState({ refAreaLeft:e.activeLabel }) }
                onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel }) }
                onMouseUp={this.zoom.bind(this)}
              >
                <CartesianGrid stroke="#eee" strokeDasharray="6 6" />
                <XAxis
                  allowDataOverflow
                  domain={['dataMin', 'dataMax']}
                  dataKey="t"
                  type="number"
                />
                <YAxis
                  allowDataOverflow
                  domain={[(YAxisMin - (YAxisMax - YAxisMin) / 4), (YAxisMax + (YAxisMax - YAxisMin) / 4)]}
                  type="number"
                  yAxisId="1"
                />

                <Tooltip />
                {
                  lineChartData.length && <Legend
                    layout="vertical"
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ right: -20 }}
                    content={renderLegend}
                  />
                }
                {
                  lineKeys.map((lineKey, i) => (<Line yAxisId="1"
                    type="linear"
                    key={`line_k_${i}`}
                    dataKey={lineKey}
                    stroke={colorArray[i]}
                    activeDot={false}
                    dot={false}
                    animationDuration={300}
                  />))
                }

                {
                  (refAreaLeft && refAreaRight) ? (
                    <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                }
              </LineChart>
            </Spin>
          </Col>
        </Row>

      </div>
    )
  }
}

ChartComponent.propTypes = {
  lineChartData: propTypes.array,
  colorArray: propTypes.array,
  selectedJudges: propTypes.array,
  YAxisMax: propTypes.number,
  YAxisMin: propTypes.number,
  lineKeys: propTypes.array,
  lineLoading: propTypes.bool,
  zoomQueryChartData: propTypes.func,
  queryChartData: propTypes.func,
}


export default ChartComponent
