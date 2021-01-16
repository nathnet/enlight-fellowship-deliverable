import React, { useEffect, useState } from "react";

import UserDataTable from "../components/table";
import Layout from "../components/layout";
import SEO from "../components/seo";
import OverallStatistics from "../components/statistics";

function IndexPage() {
  const [completionData, setCompletionData] = useState([]);

  useEffect(() => {
    getCompletionData();
  }, []);

  const getCompletionData = () => {
    fetch("data/completions.json", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        response.completions.map((user) => {
          user.milestones = user.milestones.sort(
            (projectOne, projectTwo) =>
              parseInt(projectTwo.datetime) - parseInt(projectOne.datetime)
          );
        });
        return response.completions;
      })
      .then((data) => {
        setCompletionData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <SEO title="Home" />
      <UserDataTable data={completionData} />
      <OverallStatistics data={completionData} />
    </Layout>
  );
}

export default IndexPage;
