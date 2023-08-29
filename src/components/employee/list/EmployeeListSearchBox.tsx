import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardTitle from "../../common/CardTitle";
import { Hierarchy } from "../../../states/data/hierarchyListState.ts";
import { Role } from "../../../states/data/roleListState.ts";

type Props = {
  hierarchyList: Hierarchy[];
  roleList: Role[];
  searchHierarchy: Hierarchy;
  setSearchHierarchy: React.Dispatch<React.SetStateAction<Hierarchy>>;
  searchRole: Role;
  setSearchRole: React.Dispatch<React.SetStateAction<Role>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;

  curSearchWord: string;
  setCurSearchWord: React.Dispatch<React.SetStateAction<string>>;
  searchRequest: (isInitPage?: boolean, isGetBackWord?: boolean) => void;
};

function EmployeeListSearchBox({
  hierarchyList,
  roleList,
  searchHierarchy,
  setSearchHierarchy,
  searchRole,
  setSearchRole,
  setSearchWord,
  curSearchWord,
  setCurSearchWord,
  searchRequest,
}: Props) {
  const [triggerSearch, setTriggerSearch] = useState(false);
  useEffect(() => {
    if (triggerSearch) {
      searchRequest(true, false);
      setTriggerSearch(false);
    }
  }, [triggerSearch]);
  return (
    <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
      <Card sx={{ marginBottom: 1, marginTop: 1, flexGrow: 15 }}>
        <CardTitle text="검색" />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <FormControl size="small" sx={{ width: 100 }}>
            <InputLabel>직급</InputLabel>
            <Select
              label="Hierarchy"
              onChange={(e) => {
                setSearchHierarchy(
                  hierarchyList.filter((it) => it.id === e.target.value)[0],
                );
              }}
              value={searchHierarchy.id}
            >
              {hierarchyList.map((hierarchy) => (
                <MenuItem key={hierarchy.id} value={hierarchy.id}>
                  {hierarchy.nameKr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel>권한</InputLabel>
            <Select
              label="Role"
              onChange={(e) => {
                setSearchRole(
                  roleList.filter((it) => it.id === e.target.value)[0],
                );
              }}
              value={searchRole.id}
            >
              {roleList.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.nameKr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
            <TextField
              sx={{ flexGrow: 1 }}
              placeholder="이름, 이메일 검색"
              size="small"
              value={curSearchWord}
              onChange={(e) => setCurSearchWord(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                setSearchWord(curSearchWord);
                setTriggerSearch(true);
              }}
            >
              검색
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default EmployeeListSearchBox;
