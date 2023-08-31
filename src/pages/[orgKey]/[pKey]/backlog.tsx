import React from "react";
import Head from "next/head";
import { ProSidebarProvider } from "react-pro-sidebar";

import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import BacklogContent from "@/components/Backlog";
import SideNavigation from "@/components/SideNavigationBar/SideNavigation";
import { PageType } from "@/lib/types";

export default function BacklogPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Backlog</title>
      </Head>
      <TopNavigation activePage={NavigationPage.BACKLOG} />
      <ProSidebarProvider>
        <div
          style={{
            display: "flex",
            height: "95vh",
            minHeight: "400px",
            maxWidth: "100%",
          }}>
          <SideNavigation currentPage={PageType.BACKLOG} />
          <BacklogContent />
        </div>
      </ProSidebarProvider>
    </>
  );
}