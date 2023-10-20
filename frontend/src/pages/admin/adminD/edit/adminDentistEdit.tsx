import React, { FC, useState, useEffect } from "react";
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
import { PlusOutlined } from "@ant-design/icons";
import { DentistInterface } from "../../../../interfaces/IDentist";
import { GenderInterface } from "../../../../interfaces/IGender";
import { AdminInterface } from "../../../../interfaces/IAdmin";
import {
  GetGenders,
  GetDentistByID,
  UpdateDentist,
  GetAdmin,
} from "../../../../services/https/https";
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

const AdminEditDentistProfile: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [dentist, setDentist] = useState<DentistInterface>();
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>();

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: DentistInterface) => {
    values.AdminID = 1;
    values.ID = dentist?.ID;
    let res = await UpdateDentist(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/admin/dentist");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
  };

  const getGender = async () => {
    let res = await GetGenders();
    if (res) {
      setGenders(res);
    }
  };

  const getAdmin = async () => {
    let res = await GetAdmin();
    if (res) {
      setAdmin(res);
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
    getAdmin();
    getGender();
    getDentistByID();
  }, []);

  return (
    <div className="AdminDentistEdit">
      {contextHolder}
      <Card>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2> แก้ไขข้อมูลส่วนตัว </h2>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}></Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={16}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                    <Form.Item
                      label="บัญชี"
                      name="Username"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกชื่อบัญชี",
                        },
                      ]}
                    >
                      <Input  placeholder="บัญชี"/>
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
                          message: "กรุณากรอกรหัสผ่าน",
                        },
                      ]}
                    >
                      <Input placeholder="รหัสผ่าน"/>
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
                          message: "กรุณากรอกชื่อ",
                        },
                      ]}
                    >
                      <Input placeholder="ชื่อ"/>
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
                      <Input placeholder="นามกสุล"/>
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
                      <Input placeholder="เบอร์โทรศัพท์"/>
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
                <Row justify="end">
                  <Col style={{ marginTop: "40px" }}>
                    <Form.Item>
                      <Space>
                        <Link to="/admin/dentist">
                          <Button
                            htmlType="button"
                            style={{ marginRight: "10px" }}
                          >
                            ยกเลิก
                          </Button>
                        </Link>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<PlusOutlined />}
                        >
                          ยืนยัน
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AdminEditDentistProfile;
