import { Table, Modal, Button, Icon, Tooltip } from 'antd'
import styles from './styles.less';

export default ({ saveJudgeResult, viewData, downloadData, report }) => {
  function handleSaveJudge () {
    // saveJudge('abc')
  }

  const BtnProps = {
    size: 'small',
    style: { marginRight: 5 },
  }
  const style = {
    marginBottom: 10,
    // marginTop: 10,
  }
  const btnStyle = {
    width: '90px',
    height: '90px',
  };
  return (<div className={styles.toolBar} style={style}>
    <Tooltip placement="leftTop" title='查看数据'>
      <Button className={styles.iconBtn} {...BtnProps} icon="copy" onClick={viewData}></Button>
    </Tooltip>
    <Tooltip placement="leftTop" title='保存判读结果'>
      <Button className={styles.iconBtn} {...BtnProps} icon="save" onClick={saveJudgeResult}></Button>
    </Tooltip>
    <Tooltip placement="leftTop" title='写入报告'>
      <Button className={styles.iconBtn} {...BtnProps} icon="edit" onClick={report}></Button>
    </Tooltip>
    <Tooltip placement="leftTop" title='数据下载'>
      <Button className={styles.iconBtn} {...BtnProps} icon="download" onClick={downloadData}></Button>
    </Tooltip>
  </div>)
}
