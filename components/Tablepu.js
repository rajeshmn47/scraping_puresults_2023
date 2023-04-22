import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Root = styled.div``;
const PageBody = styled.div`
  position: relative;
`;
const Overlay = styled.div`
  background: black;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0.5;
  z-index: 99;
`;

const Tablepu = ({ rows }) => {
  const { user, isAuthenticated, loading, error, status } = useSelector(
    (state) => state.user
  );

  const columns = [
    { field: "_id", headerName: "ID", width: 1 },
    { field: "name", headerName: "name", width: 160 },
    { field: "regno", headerName: "regno", width: 70 },
    {
      field: "total",
      headerName: "total",
      type: "number",
      width: 90,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Tablepu;
