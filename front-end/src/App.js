import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import LoginForm from "./components/LoginForm";
import KakaoMap from "./components/KakaoMap";
import Subsidy from "./components/Subsidy";
import Board from "./components/Board";

const { Content } = Layout;

const App = () => {
  return (
      <Router>
        <Layout>
          <Navbar />
          <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
                <Routes>
                    <Route exact path="/" element={<MainPage/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/KaKaoMap" element={<KakaoMap/>} />
                    <Route path="/Subsidy" element={<Subsidy/>} />
                    <Route path="/Board" element={<Board/>} />
                </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
  );
};

export default App;
