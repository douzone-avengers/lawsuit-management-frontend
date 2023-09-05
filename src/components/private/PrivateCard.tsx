import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";

import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
} from "@mui/material";
import { MemberInfo } from "../employee/type/MemberInfo";
import ReactModal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import curMemberAddressState from "../../states/employee/CurMemberAddressState";
import hierarchyListState from "../../states/data/hierarchyListState";
import roleListState from "../../states/data/roleListState";
import { Person } from "@mui/icons-material";
import ClientRemovePopUpButton from "../client/ClientRemovePopUpButton";

type Props = {
  width?: string | number;
  height?: string | number;
  memberInfo: MemberInfo;
  setMemberInfo: React.Dispatch<React.SetStateAction<MemberInfo>>;
};

function PrivateCard({ width = "50%", memberInfo, setMemberInfo }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hierarchyId, setHierarchyId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);
  const hierarchyList = useRecoilValue(hierarchyListState);
  const roleList = useRecoilValue(roleListState);

  //수정 취소 시 사용
  const [previousName, setPreviousName] = useState("");
  const [previousPhone, setPreviousPhone] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [previousHierarchyId, setPreviousHierarchyId] = useState(0);
  const [previousAddress, setPreviousAddress] = useState("");

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

  const updateRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = () => {
      alert("정보가 수정되었습니다.");

      const newMemberInfo = {
        ...memberInfo,
        name: name,
        email: email,
        phone: phone,
        address: address,
        hierarchyId: hierarchyId,
      };
      setMemberInfo(newMemberInfo);
      setIsEditMode(false);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `/members/me`, {
      withToken: true,

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

  const handleUpdateButton = () => {
    setPreviousName(name);
    setPreviousPhone(phone);
    setPreviousEmail(email);
    setPreviousAddress(address);
    setPreviousHierarchyId(hierarchyId);

    setIsEditMode(true);
  };

  const handleCancelUpdateButton = () => {
    setName(previousName);
    setPhone(previousPhone);
    setEmail(previousEmail);
    setAddress(previousAddress);
    setHierarchyId(previousHierarchyId);

    setIsEditMode(false);
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

      <Card>
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            {!isEditMode ? (
              <Box>
                <SvgIcon
                  component={Person}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />
                &nbsp;
                <Typography sx={{ display: "inline-block" }} variant="h4">
                  {name}
                </Typography>
              </Box>
            ) : (
              <Box>
                <SvgIcon
                  component={Person}
                  sx={{ color: "#1976d2", marginTop: "15px" }}
                />
                &nbsp;
                <TextField
                  sx={{ display: "inline-block" }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}>
              {isEditMode ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{ width: "64px", height: "41.98px" }}
                    onClick={() => {
                      updateRequest();
                    }}
                  >
                    확인
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      width: "64px",
                      height: "41.98px",
                    }}
                    onClick={() => {
                      handleCancelUpdateButton();
                    }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      handleUpdateButton();
                    }}
                  >
                    수정
                  </Button>
                  <ClientRemovePopUpButton />
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

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
          <FormControl margin="normal" fullWidth disabled>
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

export default PrivateCard;
