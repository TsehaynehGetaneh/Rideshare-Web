import withAdminLayout from "@/components/common/admin/withAdminLayout";
import Head from "next/head";
import React, { useState } from "react";
import RideOffersList from "@/components/admin/ride-offers/RideOffersList";

type RideOffersProps = {};

const RideOffers = (props: RideOffersProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div>
      <Head>
        <title>Ride Offers</title>
      </Head>
      <RideOffersList />
    </div>
  );
};

export default withAdminLayout(RideOffers);
