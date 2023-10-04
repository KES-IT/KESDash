"use client";
import "./globals.css";

import { Layout } from "@douyinfe/semi-ui";
import React, { useCallback, useEffect, useState } from "react";

import FixedButton from "@/app/home/utils/fixedButton";
import LeftSide from "@/app/home/utils/leftSide";
import { SSEConnectProvider } from "@/app/home/utils/sseContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Sider, Content } = Layout;

  function setTheme(theme: string) {
    const body = document.body;
    if (theme === "dark") {
      body.setAttribute("theme-mode", "dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      body.removeAttribute("theme-mode");
      localStorage.setItem("theme-mode", "light");
    }
  }

  const matchMode = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Firstly, apply theme from localStorage or fallback to system preference
    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDarkScheme) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }

    // Then, setup the event listener to track system preference changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMatchMode = (e: MediaQueryListEvent) => matchMode(e);
    mql.addEventListener("change", handleMatchMode);

    return () => {
      mql.removeEventListener("change", handleMatchMode);
    };
  }, [matchMode]);

  const [navWidth, setNavWidth] = useState("220px");
  const callbackNavWidth = (width: string) => {
    setNavWidth(width);
  };

  return (
    <Layout>
      <Sider
        style={{
          marginRight: navWidth,
        }}
      >
        <LeftSide callbackWidth={callbackNavWidth} />
      </Sider>

      <Layout>
        <Content>
          <SSEConnectProvider>{children}</SSEConnectProvider>
        </Content>
      </Layout>

      <FixedButton />
    </Layout>
  );
}
