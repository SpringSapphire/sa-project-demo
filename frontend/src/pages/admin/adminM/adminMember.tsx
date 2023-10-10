import React, { FC, useState, useEffect } from "react";
import { Table, Button, Row, Col, Divider, Card, Modal, message } from "antd";
import { MemberInterface } from "../../../interfaces/IMember";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { GetGenders, GetMembers, DeleteMemberByID } from "../../../services/https/https";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AdminMember: FC = () => {
  const columns: ColumnsType<MemberInterface> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "UserName",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "PassWord",
      key: "password",
    },
    {
      title: "FirstName",
      dataIndex: "FirstName",
      key: "firstname",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "gender",
      render: (text, item, index) => item.Gender?.GenderName,
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      key: "birthday",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Phone Number",
      dataIndex: "Phone",
      key: "phone",
    },
    {
      title: "Occupation",
      dataIndex: "Occupation",
      key: "occupation",
      render: (text, item, index) => item.Occupation?.OccupationName,
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/admin/member/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  const [members, setMembers] = useState<MemberInterface[]>([]);
  //Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const [messageApi, contextHolder] = message.useMessage();

  const getMembers = async () => {
    let res = await GetMembers();
    console.log(res);
    
    if (res) {
      setMembers(res);
    }
  };

  const showModal = (val: MemberInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลผู้ใช้ "${val.FirstName} ${val.LastName}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteMemberByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getMembers();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <main>
      {contextHolder}
      <Card style={{ maxHeight: "1000vw" }}>
        <Card>
          <Row>
            <Col
              span={22}
              style={{ textAlign: "start", justifyItems: "center" }}
            >
              <h2>ข้อมูลทันตแพทย์</h2>
            </Col>
            
            <Col
              span={2}
              style={{
                justifyContent: "end",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/admin/member/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  เพิ่มข้อมูล
                </Button>
              </Link>
            </Col>
          </Row>
          <Divider />
          <div style={{ marginTop: "20px" }}>
            <Table
              style={{ width: "100%" }}
              rowKey="ID"
              columns={columns}
              dataSource={members}
            />
          </div>
          <Modal
            title="ลบข้อมูล ?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </Card>
      </Card>
    </main>
  );
};

export default AdminMember;
