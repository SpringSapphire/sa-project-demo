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
  Upload,
  Select,
  DatePicker,
} from "antd";
import type { DatePickerProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MemberInterface } from "../../interfaces/IMember";
import { GenderInterface } from "../../interfaces/IGender";
import { OccupationInterface } from "../../interfaces/IOcc";
import {
  GetGenders,
  GetMemberById,
  UpdateMember,
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

const MemberProfile: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [member, setMember] = useState<MemberInterface>();
  const [genders, setGenders] = useState<GenderInterface[]>([]);

  // รับข้อมูลจาก params ที่ได้จากหน้า login
  // ถ้าต้องการไป id อื่น ๆ ต้องพิมพ์ ใน URL เอง(ตอนนี้(11/10/2566))
  let { id } = useParams();

  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onClick = async () => {
    navigate(`/member/profile/edit/${member?.ID}`);
  };

  const [Disabled] = useState<boolean>(true);

  const getGendet = async () => {
    let res = await GetGenders();
    if (res) {
      setGenders(res);
    }
  };

  const getMemberById = async () => {
    let res = await GetMemberById(Number(id));
    if (res) {
      setMember(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        UserName: res.UserName,
        PassWord: res.PassWord,
        FirstName: res.FirstName,
        LastName: res.LastName,
        GenderID: res.GenderID,
        Email: res.Email,
        Phone: res.Phone,
        Birthday: dayjs(res.Birthday),
        Occpation: res.Occpation,
      });
    }
  };

  useEffect(() => {
    getGendet();
    getMemberById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> ข้อมูลส่วนตัวสมาชิก </h2>
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
                      label="Username"
                      name="UserName"
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
                  <Col xs={0} sm={0} md={0} lg={0} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="Password"
                      name="PassWord"
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
                      label="ชื่อจริง"
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
                  <Col xs={0} sm={0} md={0} lg={0} xl={2} />
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
                  <Col xs={0} sm={0} md={0} lg={0} xl={2} />
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="เบอร์โทรศัพท์"
                      name="Phone"
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
                      name="GenderID"
                      label="เพศ"
                      rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
                    >
                      <Select allowClear onChange={handleChange}>
                        {genders.map((item) => (
                          <Option value={item.ID} key={item.GenderName}>
                            {item.GenderName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={0} xl={2} />
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
                      icon={<PlusOutlined />}
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

export default MemberProfile;
