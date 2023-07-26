import "react";
import { Box, Paper } from "@mui/material";
import DataGrid from "@/components/Table/DataGrid";
import { IconContext } from "react-icons";
import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { useQuery } from "react-query";
import { Project } from "@/lib/shared";
import { fetchProjectList } from "@/lib/client-data/projects";
import CreateProjectDialog from "@/components/Projects/CreateProjectDialog";

const columns: GridColDef[] = [
  { field: "key", headerName: "Key", width: 100 },
  {
    field: "name",
    headerName: "Name",
    align: "left",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Link
        href={`/${params.row.key}/backlog`}
        className="hover:underline hover:text-blue-600">
        {params.value}
      </Link>
    ),
  },
  {
    field: "owner",
    headerName: "Owner",
    align: "left",
    width: 150,
  },
  {
    field: "actions",
    type: "actions",
    width: 100,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        label="Delete"
        icon={<MdDelete />}
        onClick={(): void => {
          return;
        }}
      />,
      <GridActionsCellItem
        label="Edit"
        icon={<MdEdit />}
        onClick={(): void => {
          return;
        }}
      />,
    ],
  },
];

export default function ProjectTable(): JSX.Element {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const { data, isLoading } = useQuery<Project[]>("projects", fetchProjectList);

  React.useEffect((): void => {
    if (!isLoading && data && data.length > 0) {
      const newRows: GridRowsProp = data.map((row: Project) => {
        console.log(row);
        return {
          id: row.id,
          key: row.key,
          name: row.name,
          owner: row.ownerName,
        };
      });
      setRows(newRows);
    }
  }, [data]);

  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{ width: "100%", mb: 2 }}
          className="bg-transparent shadow-none">
          <DataGrid
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
            columns={columns}
            rows={rows}
          />
        </Paper>
      </Box>
      <CreateProjectDialog />
    </IconContext.Provider>
  );
}
