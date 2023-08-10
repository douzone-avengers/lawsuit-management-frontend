import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import { Hierarchy, Role } from "../type/MemberInfo";
import React from "react";
import Card from "@mui/material/Card";
import CardTitle from "../../common/CardTitle";

type Props = {
  hierarchyList: Hierarchy[];
  roleList: Role[];
  searchHierarchy: Hierarchy;
  setSearchHierarchy: React.Dispatch<React.SetStateAction<Hierarchy>>;
  searchRole: Role;
  setSearchRole: React.Dispatch<React.SetStateAction<Role>>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  searchRequest: void;
};

function EmployeeListSearchBox({
  hierarchyList,
  roleList,
  searchHierarchy,
  setSearchHierarchy,
  searchRole,
  setSearchRole,
  searchWord,
  setSearchWord,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
  searchRequest,
}: Props) {
  return (
    <Card sx={{ marginBottom: 3, marginTop: 2 }}>
      <CardTitle text="검색 조건" />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "right",
          padding: 2,
          marginTop: 2,
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
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

          <FormControl size="small" sx={{ width: 100 }}>
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

          <FormControl size="small" sx={{ width: 100 }}>
            <InputLabel>정렬기준</InputLabel>
            <Select
              label="SortKey"
              onChange={(e) => {
                setSortKey(e.target.value as string);
              }}
              value={sortKey}
            >
              <MenuItem key="createdAt" value="createdAt">
                가입일
              </MenuItem>
              <MenuItem key="hierarchy" value="hierarchy">
                직급
              </MenuItem>
              <MenuItem key="role" value="role">
                권한
              </MenuItem>
              <MenuItem key="email" value="email">
                이메일
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel>정렬순서</InputLabel>
            <Select
              label="SortOrder"
              onChange={(e) => {
                setSortOrder(e.target.value as string);
              }}
              value={sortOrder}
            >
              <MenuItem key="asc" value="asc">
                오름차순
              </MenuItem>
              <MenuItem key="desc" value="desc">
                내림차순
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
          <TextField
            sx={{ flexGrow: 1 }}
            placeholder="이름, 전화번호, email 검색"
            size="small"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              searchRequest(true);
            }}
          >
            검색
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default EmployeeListSearchBox;
