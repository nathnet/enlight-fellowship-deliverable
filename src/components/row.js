import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

/**
 * The total amount of milestones
 */
const TOTAL_MILESTONES = 9;

/**
 * Creation of styles for table
 */
const tableStyles = makeStyles({
  p0: {
    padding: 0,
  },
});

function Row(props) {
  const { user } = props;
  const [open, setOpen] = useState(false);

  const mainStyles = tableStyles();

  /**
   * Convert the date from milestone
   */
  const mostRecentMilestoneDate = new Date(
    parseInt(user.milestones[0].datetime)
  );

  /**
   * Render the collapsed row for each user
   */
  const renderCollapsed = user.milestones.map((milestone) => {
    const date = new Date(parseInt(milestone.datetime));

    return (
      <TableRow key={milestone.id}>
        <TableCell>{milestone.milestone}</TableCell>
        <TableCell>
          {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
        </TableCell>
        <TableCell>{milestone.demo}</TableCell>
        <TableCell>{milestone.description}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>enlight.nyc/user/{user.username}</TableCell>
        <TableCell>
          {((user.milestones.length / TOTAL_MILESTONES) * 100).toFixed(1) + "%"}
        </TableCell>
        <TableCell>{user.milestones[0].milestone}</TableCell>
        <TableCell>
          {mostRecentMilestoneDate.toLocaleDateString() +
            " " +
            mostRecentMilestoneDate.toLocaleTimeString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} className={mainStyles.p0}>
          <Collapse in={open} timeout="auto" unmountOnExit className="p-4">
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Milestones
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                className="table-fixed break-words"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="w-2/12">Milestone</TableCell>
                    <TableCell className="w-2/12">
                      Completed Date &amp; Time
                    </TableCell>
                    <TableCell className="w-3/12">Demo</TableCell>
                    <TableCell className="w-5/12">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderCollapsed}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  user: PropTypes.shape({
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
  }).isRequired,
};

export default Row;
