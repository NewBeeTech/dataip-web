/**
 * Created by wyz on 2017/12/11.
 */
import React from 'react'
import { Button } from 'antd'
import styles from './line.less'

export default ({ reset, queryChartData }) => { // eslint-disable-line
  const BtnProps = {
    size: 'default',
    style: { marginBottom: 5 },
  }
  return (<span className={styles.toolbarBox}>
    <Button {...BtnProps} type="primary" icon="line-chart" onClick={queryChartData} />
    <Button {...BtnProps} onClick={reset} icon="close" />
    <Button {...BtnProps} icon="setting" />
    <Button {...BtnProps} icon="edit" />
  </span>)
}
