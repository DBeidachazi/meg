import React from 'react';
import { Button } from "antd"
import "../upload/upload.css"
import { LogoutOutlined } from "@ant-design/icons";

const UiBackup = () => {
  function goToRoot() {
    window.location.href = "/";
  }

  return (
      <Button icon={<LogoutOutlined/>} colorBorder="red" type="text" onClick={goToRoot}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "3rem"
              }}>
        返回首页
      </Button>
  );
};

export default UiBackup;