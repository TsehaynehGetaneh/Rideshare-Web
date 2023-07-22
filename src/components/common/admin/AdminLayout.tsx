import React, { ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import AdminHeader from "./AdminHeader";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin/auth/login");
    }
  });
  return (
    <>
      <AdminHeader />
      <SideBar />
      <div className="py-24 px-5 md:ml-52 ml-16">{children}</div>
    </>
  );
};

export default AdminLayout;
