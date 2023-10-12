import React, { useState } from "react";
import { Layout, theme, Breadcrumb, Row, Col } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminDentist from "./pages/admin/adminD/adminDentist";
import AdminCreateDentist from "./pages/admin/adminD/create/adminCreateDentist";
import AdminEditDentistProfile from "./pages/admin/adminD/edit/adminDentistEdit";
import AdminMember from "./pages/admin/adminM/adminMember";
import AdminCreateMember from "./pages/admin/adminM/create/adminCreateMember";
import AdminEditMemberProfile from "./pages/admin/adminM/edit/adminMemberEdit";
import DentistProfile from "./pages/dentist/dentistProfile";
import DentistEditProfile from "./pages/dentist/edit/editProfile";
import MemberProfile from "./pages/member/memberProfile";
import MemberEditProfile from "./pages/member/edit/editProfile";

import { start } from "repl";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let { id } = useParams();

  return (
    <div style={{ height: "200px" }}>
      <Layout>
        <Router>
          <Header
            style={{
              background: "Blue",
              display: "flex",
              alignContent: "center",
            }}
          >
            <div
              className="DentistData"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link to="/admin/dentist">
                <h2>DentistData</h2>
              </Link>
            </div>
            <div
              className="MemberData"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <Link to="/admin/member">
                <h2>MemberData</h2>
              </Link>
            </div>
            <div
              className="dentist"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <Link to="/dentist/profile/:username">
                <h2>DentistProfile</h2>
              </Link>
            </div>
            <div
              className="member"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <Link to="/member/profile/:username">
                <h2>MemberProfile</h2>
              </Link>
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<AdminDentist />} />
              <Route path="/admin/dentist" element={<AdminDentist />} />
              <Route path="/admin/dentist/create" element={<AdminCreateDentist />} />
              <Route path="/admin/dentist/edit/:username" element={<AdminEditDentistProfile />} />

              <Route path="/admin/member" element={<AdminMember />} />
              <Route path="/admin/member/create" element={<AdminCreateMember />} />
              <Route path="/admin/member/edit/:username" element={<AdminEditMemberProfile />} />

              <Route path="/dentist/profile/:username" element={<DentistProfile />} />
              <Route path="/dentist/profile/edit/:username" element={<DentistEditProfile />}/>
              <Route path="/member/profile/:username" element={<MemberProfile />} />
              <Route path="/member/profile/edit/:username" element={<MemberEditProfile />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
};
export default App;
