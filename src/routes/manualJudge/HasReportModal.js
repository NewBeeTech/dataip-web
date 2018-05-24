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
                <Button  onClick={props.showDownloadModal}>取消</Button>
                <Button onClick={props.download} type='primary' style={{marginLeft:10}}>写入报告</Button>
            </div>
        }
    >
      <Row className={styles.hasReportTitle}>没有当前报告，请创建当前报告或者选择当前报告</Row>
      <Row className={styles.hasReportBtns}>
        <Button onClick={() => props.dispatch({
          type: 'manualJudge/updateState',
          payload: {
            createReportModal: true,
          }
        })}>创建报告</Button>
        <Button>选择已有报告</Button>
      </Row>
        <Row>
            <Col span={2}>标题：</Col>
            <Col span={19}>
                <Input
                    onChange={value => onChangeParamForm('precision', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>描述：</Col>
            <Col span={19}>
                <Input
                    type="textarea"
                    onChange={value => onChangeParamForm('precision', value)}
                >
                </Input>
            </Col>
        </Row>
    </Modal>
  </div>)
}
