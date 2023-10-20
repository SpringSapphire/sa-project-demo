import React, { FC, useState, useEffect, useId } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Select,
  DatePicker,
} from "antd";
import type { DatePickerProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DentistInterface } from "../../interfaces/IDentist";
import { GenderInterface } from "../../interfaces/IGender";
import {
  CreateDentist,
  GetGenders,
  GetDentistByID,
  UpdateDentist,
} from "../../services/https/https";
import { useNavigate, useParams, Link } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;

const dateFormat = "DD/MM/YYYY";

const handleChange = (value: string) => {
  console.log(`select ${value}`);
};

const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const DentistProfile: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [dentist, setDentist] = useState<DentistInterface>();
  const [genders, setGenders] = useState<GenderInterface[]>([]);

  let { id } = useParams();

  const [form] = Form.useForm();

  const onClick = async () => {
    navigate(`/dentist/profile/edit/${dentist?.ID}`);
  };

  const [Disabled] = useState<boolean>(true);

  const getGender = async () => {
    let res = await GetGenders();
    if (res) {
      setGenders(res);
    }
  };

  const getDentistByID = async () => {
    let res = await GetDentistByID(Number(id));
    if (res) {
      setDentist(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Username: res.Username,
        Password: res.Password,
        FirstName: res.FirstName,
        LastName: res.LastName,
        GenderID: res.GenderID,
        Email: res.Email,
        Phone_number: res.Phone_number,
        Birthday: dayjs(res.Birthday),
        AdminID: res.AdminID,
      });
    }
  };

  useEffect(() => {
    getGender();
    getDentistByID();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> ข้อมูลส่วนตัวทันตแพทย์ </h2>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} />
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Card>
              <Form
                name="basic"
                form={form}
                layout="vertical"
                autoComplete="off"
                disabled={Disabled}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="ชื่อบัญชี"
                      name="Username"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกชื่อ !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={0} sm={2} md={2} lg={2} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="รหัสผ่าน"
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกชื่อ !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="ชื่อ"
                      name="FirstName"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกชื่อ !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={0} sm={2} md={2} lg={2} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="นามกสุล"
                      name="LastName"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกนามสกุล !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="อีเมล"
                      name="Email"
                      rules={[
                        {
                          type: "email",
                          message: "รูปแบบอีเมลไม่ถูกต้อง !",
                        },
                        {
                          required: true,
                          message: "กรุณากรอกอีเมล !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={0} sm={2} md={2} lg={2} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="เบอร์โทรศัพท์"
                      name="Phone_number"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกเบอร์โทรศัพท์ !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="เพศ"
                      name="GenderID"
                      rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
                    >
                      <Select allowClear onChange={handleChange}>
                        {genders.map((item) => (
                          <Option value={item.ID} key={item.Name}>
                            {item.Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={0} sm={2} md={2} lg={2} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="วันเกิด"
                      name="Birthday"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกเบอร์โทรศัพท์ !",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onDateChange}
                        defaultValue={dayjs("01/01/2000", dateFormat)}
                        format={dateFormat}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Row justify="end">
                <Col style={{ marginTop: "40px" }}>
                  {/* <Form.Item> */}
                  <Space>
                    <Button
                      type="primary"
                      onClick={onClick}
                      icon={<EditOutlined />}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DentistProfile;
