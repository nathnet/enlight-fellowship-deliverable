import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OverallStatistics(props) {
  const { data } = props;

  const [completedStudents, setCompletedStudents] = useState(0);
  const [totalProjectsCompleted, setTotalProjectsCompleted] = useState(0);

  /**
   * Could be made better by inserting the project count into
   * findCompletedStudents, however, I chose to do it this way
   * for readability
   */
  useEffect(() => {
    findCompletedStudents();
    countTotalCompletions();
  }, [data]);

  /**
   * Find students who completed project 3 (cohort)
   */
  const findCompletedStudents = () => {
    const completedUsers = data.filter((user) => {
      const qualified = user.milestones.filter((milestone) => {
        return milestone.id === "project-3";
      });
      return qualified.length !== 0;
    });

    setCompletedStudents(completedUsers);
  };

  /**
   * Count the number of submissions from all students
   */
  const countTotalCompletions = () => {
    let numProjectsCompleted = 0;
    data.forEach((user) => {
      numProjectsCompleted += user.milestones.length;
    });

    setTotalProjectsCompleted(numProjectsCompleted);
  };

  return (
    <section className="my-8 py-4">
      <h2 className="p-4 text-3xl text-green-600">Statistics</h2>
      <p className="text-xl">
        Overall Completion Rate:{" "}
        {((completedStudents.length / data.length) * 100).toFixed(1) + "%"}
      </p>
      <p className="text-xl">
        Average Number of Milestones Completed per Cohort Member:{" "}
        {totalProjectsCompleted / data.length} Milestones/Cohort Member
      </p>
    </section>
  );
}

OverallStatistics.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      milestones: PropTypes.arrayOf(
        PropTypes.shape({
          milestone: PropTypes.string.isRequired,
          datetime: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          demo: PropTypes.string.isRequired,
          image: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default OverallStatistics;
