import React from "react";

import UserDataTable from "../components/table";
import Layout from "../components/layout";
import SEO from "../components/seo";
import OverallStatistics from "../components/statistics";

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <UserDataTable />
      <OverallStatistics />
    </Layout>
  );
}

export default IndexPage;
