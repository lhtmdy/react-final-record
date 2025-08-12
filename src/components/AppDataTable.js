import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
// import { useState } from "react";

function AppDataTable({ rows, columns, paginationModel, setPagination }) {
  // const [paginationModel, setPaginationModel] = useState({
  //   pageSize: 5,
  //   page: 0,
  // });
  const handleChange = (event, value) => {
    console.log(value);
    setPagination({
      ...paginationModel,
      current_page: value,
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <pre>{JSON.stringify(paginationModel)}</pre>
      <DataGrid rows={rows} columns={columns} sx={{ border: 0 }} />
      <div className="flex justify-end mt-4">
        <Pagination
          count={paginationModel.total_pages ||1}
          page={paginationModel.current_page ||1}
          color="secondary"
          onChange={handleChange}
        />
      </div>
    </Paper>
  );
}

export default AppDataTable;
