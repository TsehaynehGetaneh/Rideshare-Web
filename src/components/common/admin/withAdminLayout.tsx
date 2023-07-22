import AdminLayout from "./AdminLayout";
import React, { ComponentType } from "react";

type WithAdminLayoutProps = {
  // Define any props specific to the layout HOC, if needed
};

const withAdminLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithAdminLayoutProps> => {
  const WithLayout: React.FC<P & WithAdminLayoutProps> = (props) => {
    return (
      <AdminLayout>
        <WrappedComponent {...props} />
      </AdminLayout>
    );
  };

  return WithLayout;
};

export default withAdminLayout;
