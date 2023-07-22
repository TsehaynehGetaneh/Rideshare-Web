import withAdminLayout from "@/components/common/admin/withAdminLayout";
import Head from "next/head";
import React from "react";
import CommutersAnalytics from "@/components/admin/dashboard/Commuters/CommutersAnalytics";
import DriverAndVehicleAnalytics from "@/components/admin/dashboard/Drivers/DriverAndVehicleAnalytics";
import RideRequestsAnalytics from "@/components/admin/dashboard/RideRequest/RideRequestsAnalytics";
import RideOffersAnalytics from "@/components/admin/dashboard/RideOffer/RideOffersAnalytics";
import Card from "@/components/admin/dashboard/Card";
import { AiOutlineUser } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { MdOutlineLocalOffer, MdOutlineRequestPage } from "react-icons/md";
import TotalCommuters from "@/components/admin/dashboard/summary/TotalCommuters";
import TopCommuters from "@/components/admin/dashboard/Commuters/TopCommuters";
import TotalSummary from "@/components/admin/dashboard/summary/TotalSummary";

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
  return (
    <div className="space-y-16">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="space-y-10 mt-5">
        <div>
          <div className="font-bold text-3xl">Welcome Back</div>
          <div className="text-gray-400">
            Here are some Statistics on RideShare
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <TotalCommuters />
          <TotalSummary />
        </div>
      </div>

      <CommutersAnalytics />
      <TopCommuters />
      <DriverAndVehicleAnalytics />
      <RideRequestsAnalytics />
      <RideOffersAnalytics />
    </div>
  );
};

export default withAdminLayout(Dashboard);
