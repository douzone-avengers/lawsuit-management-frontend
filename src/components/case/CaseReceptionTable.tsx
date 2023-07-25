import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import EditButton from "../common/EditButton.tsx";
import DeleteButton from "../common/DeleteButton.tsx";
import { useRecoilValue } from "recoil";
import caseReceptionsState, {
  CaseReceptionType,
} from "../../states/case/CaseReceptionsState.tsx";

type CustomDataGridType = {
  rows: CaseReceptionType[];
  columns: GridColDef[];
};

function CustomDataGrid({ rows, columns }: CustomDataGridType) {
  const customColumns: GridColDef[] = [
    ...columns,
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (_) => {
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <EditButton onClick={() => {}} />
            <DeleteButton onClick={() => {}} />
          </Box>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={customColumns}
      disableColumnSelector={true}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
    />
  );
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "아이디",
    width: 100,
  },
  {
    field: "isDone",
    headerName: "완료",
    width: 150,
  },
  {
    field: "receptionType",
    headerName: "유형",
    width: 150,
  },
  {
    field: "contents",
    headerName: "내용",
    width: 150,
  },
  {
    field: "receivedAt",
    headerName: "접수일",
    width: 150,
  },
  {
    field: "deadline",
    headerName: "마감일",
    width: 150,
  },
];

function CaseReceptionTable() {
  const caseReceptions = useRecoilValue(caseReceptionsState);

  return <CustomDataGrid columns={columns} rows={caseReceptions} />;
}

export default CaseReceptionTable;
