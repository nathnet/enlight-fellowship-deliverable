import React, { useEffect, useState } from "react";
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

function UserDataTable() {
  const [completionData, setCompletionData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, completionData.length - page * rowsPerPage);

  useEffect(() => {
    getCompletionData();
  }, []);

  const getCompletionData = () => {
    fetch("https://enlight.nyc/completions.json", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "no-cors"
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <section className="my-4">
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
              ? completionData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : completionData
            ).map((user) => (
              <Row key={user.username} user={user} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={completionData.length}
                rowsPerPageOptions={[
                  10,
                  20,
                  50,
                  { label: "All", value: completionData.length },
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

export default UserDataTable;
