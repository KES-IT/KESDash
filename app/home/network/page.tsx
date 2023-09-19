"use client";

import { Divider, Typography } from "@douyinfe/semi-ui";
import React from "react";
import XuiSummary from "@/app/home/network/xuiSummary";
import XuiTable from "@/app/home/network/xuiTable";

export default function NetWork() {
  const { Title } = Typography;
  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        💻 代理服务状态
      </Title>
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "30px",
          }}
        >
          X-UI
        </div>
      </Divider>
      <XuiSummary />
      <XuiTable />
    </>
  );
}
