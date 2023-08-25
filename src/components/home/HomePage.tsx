import { Navigate } from "react-router-dom";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated";
import { useRecoilState } from "recoil";
import hierarchyListState, {
  Hierarchy,
} from "../../states/data/hierarchyListState";
import roleListState, { Role } from "../../states/data/roleListState";
import { useEffect } from "react";

function HomePage() {
  const [, setHierarchyList] = useRecoilState(hierarchyListState);
  const [, setRoleList] = useRecoilState(roleListState);

  //set enum table
  //직급 리스트
  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const allHierarchy: Hierarchy = {
        id: 0,
        nameKr: "전체",
        nameEng: "ALL",
      };
      const data: Hierarchy[] = res.data;
      // const filteredData = res.data.filter(
      //   (item: Hierarchy) => item.nameEng !== "NONE",
      // );
      setHierarchyList([allHierarchy, ...data]);
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

  useEffect(() => {
    hierarchyRequest();
    roleRequest();
  }, []);

  return <Navigate to="clients" />;
}

export default HomePage;
