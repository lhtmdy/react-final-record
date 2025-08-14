// https://mui.com/x/react-data-grid/style/
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { greenColor } from "../tailwindcss/color";

function AppDataTable({ rows, columns, paginationModel, setPagination }) {
  
  const handleChange = (event, value) => {
    console.log(value);
    setPagination({
      ...paginationModel,
      current_page: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <DataGrid
        hideFooterPagination // 隱藏頁碼
        disableColumnSorting // 禁止列排序
        disableColumnSelector // 禁止列選擇
        disableColumnMenu // 禁止列選擇和列菜單
        disableRowSelectionOnClick // 禁止行選擇
        disableColumnResize // 禁止調整列寬
        getRowHeight={() => "auto"}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "" : "bg-gray-02"
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
            background: greenColor["07"],
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#fff",
            fontSize: 16,
          },
        }}
      />
      <div className="flex justify-end !pb-4 ">
        <Pagination
          count={paginationModel.total_pages || 1}
          page={paginationModel.current_page || 1}
          // color="secondary"
          variant="outlined" shape="rounded"
          sx={{
            //背景色
            "& .MuiPaginationItem-root": {
              "&:hover": {
                backgroundColor: '#FFF',
                border: `1px solid ${greenColor["06"]}`,
                color: "#000",
              },
              // 當前頁碼的樣式
              "&.Mui-selected": {
                backgroundColor: greenColor["07"],
                color: "#fff",
                "&:hover": {
                  backgroundColor: greenColor["05"],
                  color: "#fff",
                },
              },
            }
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default AppDataTable;
