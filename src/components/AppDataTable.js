// https://mui.com/x/react-data-grid/style/
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
      <DataGrid
        disableRowSelectionOnClick
        getRowHeight={() => "auto"}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "bg-[#FAFAFA]"
        }
        rows={rows}
        columns={columns}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            padding: "12px",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#666666",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#fff",
            fontSize: 16,
          },
        }}
      />
      <div className="flex justify-end mt-4">
        <Pagination
          count={paginationModel.total_pages || 1}
          page={paginationModel.current_page || 1}
          color="secondary"
          onChange={handleChange}
        />
      </div>
    </Paper>
  );
}

export default AppDataTable;
