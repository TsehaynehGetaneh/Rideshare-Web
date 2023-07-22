import Layout from "./Layout";
import React, { ComponentType } from "react";

type WithLayoutProps = {
  // Define any props specific to the layout HOC, if needed
};

const withLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLayoutProps> => {
  const WithLayout: React.FC<P & WithLayoutProps> = (props) => {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };

  return WithLayout;
};

export default withLayout;
