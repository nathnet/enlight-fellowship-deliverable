import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Row from "./row";
import TablePaginationActions from "./tableActions";

function UserDataTable(props) {
  const { data } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /**
   * Get the number of empty rows on the page
   */
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  /**
   * Set rows per page to the number given
   * and set the page to the first page
   * @param {event} event Event handler
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Set the page to the number given
   * @param {event} event Event handler
   * @param {number} newPage The number of page to set to
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <section className="my-8 py-4">
      <h2 className="p-4 text-3xl text-green-600">Table</h2>
      <TableContainer component={Paper}>
        <Table
          aria-label="collapsible custom pagination table"
          className="break-words table-auto"
        >
          <TableHead>
            <TableRow>
              <TableCell className="w-1/12" />
              <TableCell className="w-1/12">Name</TableCell>
              <TableCell className="w-2/12">Enlight Profile</TableCell>
              <TableCell className="w-2/12">Completion Rate</TableCell>
              <TableCell className="w-3/12">Last Completed Milestone</TableCell>
              <TableCell className="w-3/12">
                Last Completed Milestone Date &amp; Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((user) => (
              <Row key={user.username} user={user} />
            ))}

            {emptyRows > 0 && data.length > rowsPerPage && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                rowsPerPageOptions={[
                  5,
                  10,
                  20,
                  50,
                  { label: "All", value: data.length },
                ]}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </section>
  );
}

UserDataTable.propTypes = {
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

export default UserDataTable;
