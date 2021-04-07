import {Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router-dom";

export default () => {
  let history = useHistory();
  return   <Form onFinish={(value: { hash: string }) => {
    history.push('/hash/' + value.hash)
  }} >
    <Form.Item name='hash' style={{ marginBottom: 0, lineHeight: '56px' }} rules={[
      { required: true, message: '请输入一个有效的 block hash' },
      {
        pattern: /^[0-9,a-z]{64}$/, message: '必须是一个有效的 hash '
      }
    ]}>
      <Input prefix={<SearchOutlined />}  bordered={false} style={{
        width: '800px'
      }} placeholder="请输入 Hash"/>
    </Form.Item>
  </Form>
}