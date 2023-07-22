import UserDetail from "@/components/admin/users/UserDetail";
import withAdminLayout from "@/components/common/admin/withAdminLayout";
import { useRouter } from "next/router";
import React from "react";
import CommuterFeedbacks from "@/components/admin/users/commuters/CommuterFeedback";

type UserProps = {};

const User = (props: UserProps) => {
  const router = useRouter();
  const id = router.query.userId as string;
  return (
    <div className="space-y-10">
      <UserDetail id={id} />
      <CommuterFeedbacks />
    </div>
  );
};

export default withAdminLayout(User);
