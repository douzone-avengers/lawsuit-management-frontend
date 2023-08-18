import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Hierarchy, MemberInfo, Role } from "../type/MemberInfo";
import ReactModal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import curMemberAddressState from "../../../states/employee/CurMemberAddressState";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated";

type Props = {
  width?: string | number;
  height?: string | number;
  memberInfo?: MemberInfo;
};

function EmployeeInfoCard({ width = "50%", memberInfo }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  const [hierarchyList, setHierarchyList] = useState<Hierarchy[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hierarchyId, setHierarchyId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);
  const employeeId = useRecoilValue(employeeIdState);
  useEffect(() => {
    if (memberInfo?.email) {
      setEmail(memberInfo.email);
    }
    if (memberInfo?.phone) {
      setPhone(memberInfo.phone);
    }
    if (memberInfo?.name) {
      setName(memberInfo.name);
    }
    if (memberInfo?.address) {
      setAddress(memberInfo.address);
    }
    if (memberInfo?.hierarchyId) {
      setHierarchyId(memberInfo.hierarchyId);
    }
    if (memberInfo?.roleId) {
      setRoleId(memberInfo.roleId);
    }
  }, [memberInfo]);

  useEffect(() => {
    hierarchyRequest();
    roleRequest();
  }, []);

  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      setHierarchyList(res.data);
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

  const roleRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      setRoleList(res.data);
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

  const updateRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = () => {
      alert("정보가 수정되었습니다.");
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `/members/employees/${employeeId}`, {
      withToken: true,
      useMock: false,
      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
      body: {
        email,
        name,
        phone,
        address,
        hierarchyId,
        roleId,
      },
    });
  };

  return (
    <Box
      style={{
        width: width,
      }}
    >
      <ReactModal
        style={{
          overlay: {
            zIndex: 10000, // 여기서 z-index 값을 높여주세요
          },
          content: {
            width: "30%", // 모달의 너비를 50%로 설정
            height: "60%", // 모달의 높이를 50%로 설정
            margin: "auto", // 모달을 화면 가운데에 위치시킴
          },
        }}
        isOpen={isModalOpen}
      >
        <DaumPostcode
          style={{
            height: "100%",
          }}
          onComplete={(data) => {
            // handle the complete event with selected data
            setAddress(data.address);
            setRecoilAddress(data.address);
            setIsModalOpen(false);
          }}
          autoClose={false}
          defaultQuery={address}
        />
      </ReactModal>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Typography variant="h4">개인정보</Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            if (isEditMode) {
              updateRequest();
              setIsEditMode(false);
            } else {
              setIsEditMode(true);
            }
          }}
        >
          {isEditMode ? "저장" : "수정"}
        </Button>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            disabled={!isEditMode}
            label="이메일"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={!isEditMode}
            label="이름"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={!isEditMode}
            label="전화번호"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={!isEditMode}
            label="주소"
            name="address"
            value={address}
            margin="normal"
            fullWidth
          />
          {isEditMode ? (
            <Button
              size="small"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              주소검색
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth disabled={!isEditMode}>
            <InputLabel>직책</InputLabel>
            <Select
              value={hierarchyId}
              label="hierarchy"
              onChange={(e) =>
                setHierarchyId(parseInt(e.target.value as string))
              }
            >
              {hierarchyList.map((hierarchy) => (
                <MenuItem key={hierarchy.id} value={hierarchy.id}>
                  {hierarchy.nameKr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth disabled={!isEditMode}>
            <InputLabel>권한</InputLabel>
            <Select
              value={roleId}
              label="role"
              onChange={(e) => setRoleId(parseInt(e.target.value as string))}
            >
              {roleList.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.nameKr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmployeeInfoCard;
