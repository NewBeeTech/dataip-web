import { Table, Modal, Button, Icon, Tooltip, Input, Row, Col } from 'antd'
import styles from './styles.less';

export default (props) => {
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
  function onChangeReport(name, value) {
    props.dispatch({
        type: 'manualJudge/onChangeReport',
        payload: {
            name,
            value: value.target ? value.target.value : value
        }
    })
  }
  return (<div>
    <Modal
        visible={props.hasReportModal}
        title='写入报告'
        onCancel={() => props.dispatch({
          type: 'manualJudge/updateState',
          payload: {
            hasReportModal: false,
          }
        })}
        footer={
            <div>
                <Button  onClick={() => props.dispatch({
                  type: 'manualJudge/updateState',
                  payload: {
                    hasReportModal: false,
                  }
                })}>取消</Button>
                <Button onClick={props.reportResult} type='primary' style={{marginLeft:10}}>写入报告</Button>
            </div>
        }
    >
      {!props.hasReport && <Row className={styles.hasReportTitle}>没有当前报告，请创建当前报告或者选择当前报告</Row>}
      {!props.hasReport &&
        <Row className={styles.hasReportBtns}>
          <Button onClick={() => props.dispatch({
            type: 'manualJudge/updateState',
            payload: {
              createReportModal: true,
            }
          })}>创建报告</Button>
          <Button onClick={() => props.dispatch({
            type: 'manualJudge/updateState',
            payload: {
              chooseReportModal: true,
            }
          })}>选择已有报告</Button>
        </Row>
      }
      {props.hasReport &&
        <Row style={{ margin: '5px 0'}}>
            <Col span={3}>当前报告：</Col>
            <Col span={19}>
                <div>{props.currentReport.name}</div>
            </Col>
        </Row>
      }
      {props.hasReport &&
        <div>
          <span style={{ margin: '5px 5px 5px 0'}}>所属型号：{props.currentReport.modelName}</span>
          <span style={{ margin: '5px 5px 5px 0'}}>所属任务：{props.currentReport.taskName}</span>
          <span style={{ margin: '5px 5px 5px 0'}}>所属试验：{props.currentReport.instanceName}</span>
        </div>
      }
        <Row style={{ marginTop: '5px'}}>
            <Col span={2}>标题：</Col>
            <Col span={19}>
                <Input
                    onChange={value => onChangeReport('title', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>描述：</Col>
            <Col span={19}>
                <Input
                    type="textarea"
                    onChange={value => onChangeReport('description', value)}
                >
                </Input>
            </Col>
        </Row>
    </Modal>
  </div>)
}
