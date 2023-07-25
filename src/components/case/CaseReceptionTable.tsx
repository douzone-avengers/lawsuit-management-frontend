import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import EditButton from "../common/EditButton.tsx";
import DeleteButton from "../common/DeleteButton.tsx";
import { useRecoilValue } from "recoil";
import caseReceptionsState, {
  CaseReceptionType,
} from "../../states/case/CaseReceptionsState.tsx";
import { toDateValue } from "../../lib/convert.ts";
import { Checkbox } from "@mui/material";

type CustomDataGridType = {
  rows: CaseReceptionType[];
  columns: GridColDef[];
};

function CustomDataGrid({ rows, columns }: CustomDataGridType) {
  const customColumns: GridColDef[] = [
    {
      field: "isDone",
      headerName: "상태",
      width: 100,
      headerAlign: "left",
      align: "left",
      sortable: false,
      filterable: false,
      renderCell: ({ row }: { row: CaseReceptionType }) => (
        <Checkbox checked={row.isDone} />
      ),
    },
    ...columns,
    {
      field: "actions",
      headerName: "",
      headerAlign: "right",
      align: "right",
      width: 200,
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
      sx={{
        margin: "0 auto",
        maxWidth: 801,
      }}
      rows={rows}
      columns={customColumns}
      disableRowSelectionOnClick={true}
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
    field: "receptionType",
    headerName: "유형",
    headerAlign: "left",
    align: "left",
    width: 100,
  },
  {
    field: "contents",
    headerName: "내용",
    headerAlign: "left",
    align: "left",
    editable: true,

    width: 200,
  },
  {
    field: "receivedAt",
    headerName: "접수일",
    headerAlign: "left",
    align: "left",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${toDateValue(params.row["receivedAt"])}`,
  },
  {
    field: "deadline",
    headerName: "마감일",
    headerAlign: "left",
    align: "left",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${toDateValue(params.row["deadline"])}`,
  },
];

function CaseReceptionTable() {
  const caseReceptions = useRecoilValue(caseReceptionsState);

  return (
    <Box sx={{ margin: 1 }}>
      <CustomDataGrid columns={columns} rows={caseReceptions} />
    </Box>
  );
}

export default CaseReceptionTable;
