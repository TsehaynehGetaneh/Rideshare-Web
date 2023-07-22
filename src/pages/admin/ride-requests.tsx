import RideRequestList from "@/components/admin/ride-request/RideRequestList";
import withAdminLayout from "@/components/common/admin/withAdminLayout";
import Head from "next/head";
import React from "react";

type RideRequestsProps = {};

const RideRequests = (props: RideRequestsProps) => {
  return (
    <div>
      <Head>
        <title>Ride Requests</title>
      </Head>
      <div><RideRequestList/></div>
    </div>
  );
};

export default withAdminLayout(RideRequests);
