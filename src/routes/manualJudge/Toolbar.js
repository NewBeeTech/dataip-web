import { Table, Modal, Button, Icon } from 'antd'

export default ({ saveJudgeResult, viewData, downloadData }) => {
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
  return (<div style={style}>
    <Button {...BtnProps} onClick={viewData}>查看数据</Button>
    <Button {...BtnProps} onClick={saveJudgeResult}>保存判读结果</Button>
    <Button {...BtnProps}>写入报告</Button>
    <Button {...BtnProps} onClick={downloadData}>数据下载</Button>
  </div>)
}
