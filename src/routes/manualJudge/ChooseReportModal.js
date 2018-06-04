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
  function onChangeChooseReport(name, value) {
      props.dispatch({
          type: 'manualJudge/onChangeChooseReport',
          payload: {
              name,
              value: value.target ? value.target.value : value
          }
      });

      props.dispatch({
          type: 'manualJudge/listReportMineModel',
          payload: {
          }
      });
  }
  return (<div>
    <Modal
        visible={props.chooseReportModal}
        title='选择当前报告'
        onCancel={() => props.dispatch({
          type: 'manualJudge/updateState',
          payload: {
            chooseReportModal: false,
          }
        })}
        footer={
            <div>
                <Button  onClick={() => props.dispatch({
                  type: 'manualJudge/updateState',
                  payload: {
                    chooseReportModal: false,
                  }
                })}>取消</Button>
                <Button onClick={props.chooseReport} type='primary' style={{marginLeft:10}}>选择</Button>
            </div>
        }
    >
        <Row>
            <Col span={2}>型号：</Col>
            <Col span={10} style={{ paddingRight: '10px'}}>
               <InputSelect
                  style={{width:'100%'}}
                  disableInput
                  onChange={value=>onChangeChooseReport('modelName', value)}
                  options={props.models} value={props.modelName}
                >
                </InputSelect>
            </Col>
            <Col span={2}>任务：</Col>
            <Col span={10}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value=>onChangeChooseReport('taskName', value)}
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
                   onChangeChooseReport('instanceId', values[1]);
                 }}
                 options={props.instances}
               >
               </InputSelect>
            </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
            <Col span={2}>报告：</Col>
            <Col span={22}>
              <InputSelect
                 style={{width:'100%'}}
                 disableInput
                 onChange={value => {
                   onChangeChooseReport('reportId', value);
                 }}
                 options={props.reports.map(item => ({
                   name: item.name,
                   value: item.reportId,
                 }))}
               >
               </InputSelect>
            </Col>
        </Row>
    </Modal>
  </div>)
}
