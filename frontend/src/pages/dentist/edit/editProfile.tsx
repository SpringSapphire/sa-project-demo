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
import { DentistInterface } from "../../../interfaces/IDentist";
import { GenderInterface } from "../../../interfaces/IGender";
import {
    CreateDentist,
    GetGenders,
    GetDentistById,
    UpdateDentist,
} from "../../../services/https/https";
import { useNavigate, useParams } from "react-router-dom";
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

    const [dentsit, setDentist] = useState<DentistInterface>();
    const [genders, setGenders] = useState<GenderInterface[]>([]);

    // รับข้อมูลจาก params
    let { id } = useParams();
    // อ้างอิง form กรอกข้อมูล
    const [form] = Form.useForm();

    const onFinish = async (values: DentistInterface) => {
        values.ID = dentsit?.ID;
        let res = await UpdateDentist(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "แก้ไขข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/admin");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "แก้ไขข้อมูลไม่สำเร็จ",
            });
        }
    };

    const getGendet = async () => {
        let res = await GetGenders();
        if (res) {
            setGenders(res);
        }
    };

    const getDentistById = async () => {
        let res = await GetDentistById(Number(id));
        if (res) {
            setDentist(res);
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
            });
        }
    };

    useEffect(() => {
        getGendet();
        getDentistById();
    }, []);

    return (
        <div>
            {contextHolder}
            <Card>
                <h2> แก้ไขข้อมูลส่วนตัว </h2>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={8} />
                    <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                        <Form
                            name="basic"
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Card>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                    <Col xs={0} sm={2} md={2} lg={2} xl={2} />
                                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
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
                                                <Button
                                                    htmlType="button"
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    ยกเลิก
                                                </Button>
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
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default DentistProfile;
