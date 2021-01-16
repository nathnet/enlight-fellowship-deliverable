import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  /**
   * Set the page to the first page
   * @param {event} event Event handler
   */
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  /**
   * Set the page to the one before the current one
   * @param {event} event Event handler
   */
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  /**
   * Set the page to the one after the current one
   * @param {event} event Event handler
   */
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  /**
   * Set the page to the last page
   * @param {event} event Event handler
   */
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className="flex-shrink-0">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
