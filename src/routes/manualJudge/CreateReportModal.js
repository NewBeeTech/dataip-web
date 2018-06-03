import { Table, Modal, Button, Icon, Tooltip, Input, Row, Col } from 'antd'
import styles from './styles.less';
import InputSelect from '@@/Inputselect'

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
  function onChangeCreateReport(name, value) {
      props.dispatch({
          type: 'manualJudge/onChangeCreateReport',
          payload: {
              name,
              value: value.target ? value.target.value : value
          }
      })
  }
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
                <Button onClick={props.createReport} type='primary' style={{marginLeft:10}}>创建</Button>
            </div>
        }
    >
        <Row>
            <Col span={2}>型号：</Col>
            <Col span={10} style={{ paddingRight: '10px'}}>
               <InputSelect
                  style={{width:'100%'}}
                  disableInput
                  onChange={value=>onChangeCreateReport('modelName', value)}
                  options={props.models} value={props.modelName}
                >
                </InputSelect>
            </Col>
            <Col span={2}>任务：</Col>
            <Col span={10}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value=>onChangeCreateReport('taskName', value)}
                 options={props.tasks} value={props.taskName}
               >
               </InputSelect>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>试验：</Col>
            <Col span={22}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value => {
                   console.log(value);
                   const values = value && value.split(',');
                   onChangeCreateReport('instanceName', values[0]);
                   onChangeCreateReport('instanceId', values[1]);
                 }}
                 options={props.instances}
               >
               </InputSelect>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>名称：</Col>
            <Col span={19}>
                <Input
                    onChange={value => onChangeCreateReport('name', value)}
                >
                </Input>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>描述：</Col>
            <Col span={19}>
                <Input
                    type="textarea"
                    onChange={value => onChangeCreateReport('description', value)}
                >
                </Input>
            </Col>
        </Row>
    </Modal>
  </div>)
}
