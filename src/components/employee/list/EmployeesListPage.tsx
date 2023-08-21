import { useEffect, useRef, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import { Box } from "@mui/material";
import EmployeeListTable from "./EmployeeListTable";
import { useNavigate } from "react-router-dom";
import { Hierarchy, MemberInfo, Role } from "../type/MemberInfo";
import EmployeeListSearchBox from "./EmployeeListSearchBox";

function EmployeeListPage() {
  const navigate = useNavigate();

  const [memberInfos, setMemberInfos] = useState<MemberInfo[]>([]);

  //for search
  const [hierarchyList, setHierarchyList] = useState<Hierarchy[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);

  const [searchHierarchy, setSearchHierarchy] = useState<Hierarchy>({
    id: 0,
    nameKr: "전체",
    nameEng: "all",
  });
  const [searchRole, setSearchRole] = useState<Role>({
    id: 0,
    nameKr: "전체",
    nameEng: "all",
  });
  const [searchWord, setSearchWord] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [count, setCount] = useState(0);

  const [curSearchWord, setCurSearchWord] = useState("");

  useEffect(() => {
    hierarchyRequest();
    roleRequest();
  }, []);

  const prevDependencies = useRef({
    sortKey,
    sortOrder,
    rowsPerPage,
    page,
  });

  useEffect(() => {
    // page만 변화했는지 체크
    if (
      prevDependencies.current.sortKey === sortKey &&
      prevDependencies.current.sortOrder === sortOrder &&
      prevDependencies.current.rowsPerPage === rowsPerPage &&
      prevDependencies.current.page !== page
    ) {
      searchRequest(false, true);
    } else {
      searchRequest(true, true);
    }

    // 의존성 변수들의 마지막 값을 저장
    prevDependencies.current = {
      sortKey,
      sortOrder,
      rowsPerPage,
      page,
    };
  }, [sortKey, sortOrder, rowsPerPage, page]);

  //검색
  const searchRequest = (isInitPage?: boolean, isGetBackWord?: boolean) => {
    if (isInitPage) {
      setPage(0);
    }
    if (isGetBackWord) {
      setCurSearchWord(searchWord);
    }
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      setMemberInfos(res.data.memberDtoNonPassList);
      setCount(res.data.count);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    const getQueryString = () => {
      const queryParts = [
        searchWord ? `searchWord=${searchWord}` : null,
        searchHierarchy.nameEng !== "all"
          ? `hierarchyId=${searchHierarchy.id}`
          : null,
        searchRole.nameEng !== "all" ? `roleId=${searchRole.id}` : null,
        sortKey ? `sortKey=${sortKey}` : null,
        sortOrder ? `sortOrder=${sortOrder}` : null,
        `page=${page + 1}`,
        `rowsPerPage=${rowsPerPage}`,
      ];

      return queryParts.filter(Boolean).join("&");
    };

    requestDeprecated("GET", `/members/employees?${getQueryString()}`, {
      withToken: true,
      useMock: false,
      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  //직급 리스트
  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const allHierarchy: Hierarchy = {
        id: 0,
        nameKr: "전체",
        nameEng: "ALL",
      };
      const filteredData = res.data.filter(
        (item: Hierarchy) => item.nameEng !== "NONE",
      );
      setHierarchyList([allHierarchy, ...filteredData]);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/hierarchy`, {
      withToken: false,
      useMock: false,
      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  //권한 리스트
  const roleRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const allRole: Role = {
        id: 0,
        nameKr: "전체",
        nameEng: "ALL",
      };

      const filteredData = res.data.filter(
        (item: Role) => item.nameEng !== "CLIENT",
      );
      // res.data에 allRole 추가
      setRoleList([allRole, ...filteredData]);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/role`, {
      withToken: false,
      useMock: false,
      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  return (
    <Box sx={{ margin: 3 }}>
      <EmployeeListSearchBox
        hierarchyList={hierarchyList}
        roleList={roleList}
        searchHierarchy={searchHierarchy}
        setSearchHierarchy={setSearchHierarchy}
        searchRole={searchRole}
        setSearchRole={setSearchRole}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        curSearchWord={curSearchWord}
        setCurSearchWord={setCurSearchWord}
        searchRequest={searchRequest}
      />

      <EmployeeListTable
        memberInfos={memberInfos.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/employees/${item.id}`);
          },
        }))}
        hierarchyList={hierarchyList}
        roleList={roleList}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </Box>
  );
}

export default EmployeeListPage;
