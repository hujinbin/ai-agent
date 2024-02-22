import { useState, useEffect } from "react";
import {fetchAlarmInfo, fetchSetAlarm} from "../../../services/alarmServices";
import {Button, Descriptions, message} from "antd";
import AlarmEditModal from "./components/alarmEditModal";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

const { Item } = Descriptions;

function AlarmSetting() {
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);
    const [alarmInfo, setAlarmInfo] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSetAlarmInfo = () => {
        fetchAlarmInfo().then(res => {
            console.log(res)
            setAlarmInfo(res.data.data)
        })
    }

    const handleOnCancel = () => {
        setIsModalVisible(false);
    }

    const handleOnFinish = (data) => {
        setSubmitBtnLoading(true);
        fetchSetAlarm(data).then(() => {
            message.success('告警设置修改成功！')
            handleOnCancel();
            handleSetAlarmInfo();
        }).finally(() => {
            setSubmitBtnLoading(false);
        })
    }

    useEffect(() => {
        handleSetAlarmInfo();
    }, [])

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Descriptions
          bordered={true}
          title={"告警信息"}
          size={"small"}
          colon={true}
          column={1}
          style={{
            width: 500,
            background: "#FFFFFF",
            padding: 20,
          }}
          labelStyle={{
            width: 140,
          }}
          extra={
            <Button type={"primary"} onClick={() => setIsModalVisible(true)}>
              编 辑
            </Button>
          }
        >
          <Item label={"告警状态"}>
            {alarmInfo.OpenAlarm ? (
              <CheckCircleFilled style={{ color: "green" }} />
            ) : (
              <CloseCircleFilled style={{ color: "red" }} />
            )}
          </Item>
          <Item label={"是否通知所有人"}> {alarmInfo.AtAll ? "是" : "否"}</Item>
          {/*TODO 暂时注释，后续修改*/}
          {/*<Item label={'联系电话'}>{alarmInfo.Phone || '-'}</Item>*/}
          <Item label={"Secret"}>{alarmInfo.Secret || "-"}</Item>
          <Item label={"AccessToken"}>{alarmInfo.AccessToken || "-"}</Item>
        </Descriptions>
         <AlarmEditModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          submitBtnLoading={submitBtnLoading}
          onFinish={handleOnFinish}
          onCancel={handleOnCancel}
          initialValues={alarmInfo}
        />
      </div>
    );
}

export default AlarmSetting;
