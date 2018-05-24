import { Table, Modal, Button, Icon, Tooltip, Input, Row, Col } from 'antd'
import styles from './styles.less';

export default (props) => {
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
        visible={props.createReportModal}
        title='创建报告'
        onCancel={() => props.dispatch({
          type: 'manualJudge/updateState',
          payload: {
            createReportModal: false,
          }
        })}
        footer={
            <div>
                <Button  onClick={() => props.dispatch({
                  type: 'manualJudge/updateState',
                  payload: {
                    createReportModal: false,
                  }
                })}>取消</Button>
                <Button onClick={props.download} type='primary' style={{marginLeft:10}}>创建</Button>
            </div>
        }
    >
        <Row>
            <Col span={2}>型号：</Col>
            <Col span={10}>
                <Input
                    onChange={value => onChangeParamForm('precision', value)}
                >
                </Input>
            </Col>
            <Col span={2}>任务：</Col>
            <Col span={10}>
                <Input
                    onChange={value => onChangeParamForm('precision', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>试验：</Col>
            <Col span={22}>
                <Input
                    onChange={value => onChangeParamForm('precision', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>名称：</Col>
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
