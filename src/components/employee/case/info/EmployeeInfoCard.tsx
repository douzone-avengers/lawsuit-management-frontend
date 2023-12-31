import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
} from "@mui/material";
import { MemberInfo } from "../../type/MemberInfo";
import ReactModal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import curMemberAddressState from "../../../../states/employee/CurMemberAddressState";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated";
import hierarchyListState from "../../../../states/data/hierarchyListState";
import roleListState from "../../../../states/data/roleListState";
import {
  Badge,
  Email,
  Grade,
  LocationOn,
  Person,
  PhoneIphone,
} from "@mui/icons-material";
import { SubNavigationBarItemState } from "../../../layout/snb/SubNavigationBarItem";
import BalanceIcon from "@mui/icons-material/Balance";
import snbLoadedState from "../../../../states/common/SnbLoadedState";
import subNavigationBarState from "../../../../states/layout/SubNavigationBarState";
import caseIdState from "../../../../states/case/CaseIdState";
import { isAdminState } from "../../../../states/user/UserState";

type Props = {
  width?: string | number;
  height?: string | number;
  memberInfo: MemberInfo;
  setMemberInfo: React.Dispatch<React.SetStateAction<MemberInfo | undefined>>;
  isEditable?: boolean;
};

function EmployeeInfoCard({
  width,
  height,
  memberInfo,
  setMemberInfo,
  isEditable = true,
}: Props) {
  const setSnbLoaded = useSetRecoilState(snbLoadedState);
  const setSubNavigationBar = useSetRecoilState(subNavigationBarState);
  const caseId = useRecoilValue(caseIdState);

  const employeeId = useRecoilValue(employeeIdState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [hierarchyId, setHierarchyId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);
  const hierarchyList = useRecoilValue(hierarchyListState);
  const roleList = useRecoilValue(roleListState);
  const filteredRoleList = roleList.filter((it) => it.nameKr !== "의뢰인");

  //수정 취소 시 사용
  const [previousName, setPreviousName] = useState("");
  const [previousPhone, setPreviousPhone] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [previousHierarchyId, setPreviousHierarchyId] = useState(0);
  const [previousRoleId, setPreviousRoleId] = useState(0);
  const [previousAddress, setPreviousAddress] = useState("");
  const [previousAddressDetail, setPreviousAddressDetail] = useState("");

  //수정 시 에러 표시
  const [isPhoneOk, setIsPhoneOk] = useState(true);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [isAddressDetailOk, setIsAddressDetailOk] = useState(true);
  const [addressDetailMessage, setAddressDetailMessage] = useState("");

  const isAdmin = useRecoilValue(isAdminState);

  const onPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let input = e.target.value.replace(/\D/g, ""); // 모든 숫자 아닌 문자를 제거합니다.
    if (input.length > 2) {
      input = input.substring(0, 3) + "-" + input.substring(3);
    }
    if (input.length > 7) {
      input = input.substring(0, 8) + "-" + input.substring(8);
    }
    setPhone(input);

    const phonePattern = /^010-\d{4}-?\d{4}$/;

    if (phonePattern.test(input)) {
      setPhoneMessage("올바른 전화번호 형식입니다.");
      setIsPhoneOk(true);
    } else {
      setPhoneMessage("올바르지 않은 전화번호 형식입니다.");
      setIsPhoneOk(false);
    }
  };

  const onAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let input = e.target.value;
    setAddressDetail(input);

    if (input.length === 0) {
      setAddressDetailMessage("상세주소를 입력해 주세요.");
      setIsAddressDetailOk(false);
    } else {
      setIsAddressDetailOk(true);
      setAddressDetailMessage("");
    }
  };

  const handleUpdateButton = () => {
    setPreviousName(name);
    setPreviousPhone(phone);
    setPreviousEmail(email);
    setPreviousAddress(address);
    setPreviousAddressDetail(addressDetail);
    setPreviousHierarchyId(hierarchyId);
    setPreviousRoleId(roleId);

    setIsEditMode(true);
  };

  const handleCancelUpdateButton = () => {
    setName(previousName);
    setPhone(previousPhone);
    setEmail(previousEmail);
    setAddress(previousAddress);
    setAddressDetail(previousAddressDetail);
    setHierarchyId(previousHierarchyId);
    setRoleId(previousRoleId);

    setIsPhoneOk(true);
    setPhoneMessage("");
    setIsAddressDetailOk(true);
    setAddressDetailMessage("");
    setIsEditMode(false);
  };

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
    if (memberInfo?.addressDetail) {
      setAddressDetail(memberInfo.addressDetail);
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
      const newMemberInfo = {
        ...memberInfo,
        name: name,
        email: email,
        phone: phone,
        address: address,
        addressDetail: addressDetail,
        hierarchyId: hierarchyId,
        roleId: roleId,
      };
      setMemberInfo(newMemberInfo);
      setIsEditMode(false);
      setIsPhoneOk(true);
      setPhoneMessage("");
      setIsAddressDetailOk(true);
      renewSnb();
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `/members/employees/${employeeId}`, {
      withToken: true,

      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
      body: {
        email,
        name,
        phone,
        address,
        addressDetail,
        hierarchyId,
        roleId,
      },
    });
  };

  const renewSnb = () => {
    setSnbLoaded(false);
    requestDeprecated("GET", `/members/employees`, {
      onSuccess: (res) => {
        const memberInfos: MemberInfo[] = res.data.memberDtoNonPassList;
        const newItems: SubNavigationBarItemState[] = memberInfos.map(
          (item) => {
            return {
              id: item.id,
              text: item.name,
              subText: roleList.filter((it) => it.id == item.roleId)[0].nameKr,
              url: `employees/${item.id}`,
              SvgIcon: BalanceIcon,
            };
          },
        );
        setSubNavigationBar({
          type: "employee",
          curId: newItems.find((it) => it.id === caseId)?.id ?? -1,

          items: newItems,
        });
        setSnbLoaded(true);
      },
    });
  };

  return (
    <>
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
            setAddressDetail("");
            setAddressDetailMessage("상세주소를 입력해 주세요.");
            setIsAddressDetailOk(false);
            setIsModalOpen(false);
          }}
          autoClose={false}
          defaultQuery={address}
        />
      </ReactModal>

      <Card sx={{ width, height }}>
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
                  {isEditable && isAdmin ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleUpdateButton();
                      }}
                    >
                      수정
                    </Button>
                  ) : null}
                </>
              )}
            </Box>
          </Box>
          <hr />
          <br />
          <Box sx={{ marginBottom: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SvgIcon
                component={Email}
                sx={{ color: "#1976d2", marginBottom: "5px" }}
              />{" "}
              &nbsp;&nbsp;
              <Typography
                sx={{
                  display: "inline-block",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                color="text.secondary"
                gutterBottom
              >
                {email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginBottom: "15px" }}>
            {isEditMode ? (
              <Box>
                <SvgIcon
                  component={PhoneIphone}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <TextField
                  {...(isPhoneOk ? {} : { error: true })}
                  id="phone-input"
                  disabled={!isEditMode}
                  type="tel"
                  size="small"
                  sx={{ display: "inline-block", fontSize: 20 }}
                  value={phone}
                  onChange={onPhoneChange}
                  helperText={phoneMessage}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SvgIcon
                  component={PhoneIphone}
                  sx={{ color: "#1976d2", marginBottom: "5px" }}
                />{" "}
                &nbsp;&nbsp;
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {phone}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ marginBottom: "15px", display: "flex" }}>
            {isEditMode ? (
              <>
                <Box sx={{ display: "flex" }}>
                  <SvgIcon
                    component={LocationOn}
                    sx={{ color: "#1976d2", marginTop: "5px" }}
                  />{" "}
                  &nbsp;
                  <TextField
                    disabled={!isEditMode}
                    size="small"
                    fullWidth
                    sx={{
                      display: "inline-block",
                      fontSize: 20,
                      width: 300,
                      marginLeft: "4px",
                    }}
                    value={address}
                  />
                </Box>
                <Box sx={{ marginTop: "5px" }}>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    주소검색
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SvgIcon
                  component={LocationOn}
                  sx={{ color: "#1976d2", marginBottom: "8px" }}
                />{" "}
                &nbsp;&nbsp;
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {address}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ marginBottom: "15px" }}>
            {isEditMode ? (
              <Box>
                <SvgIcon
                  component={LocationOn}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <TextField
                  {...(isAddressDetailOk ? {} : { error: true })}
                  id="phone-input"
                  disabled={!isEditMode}
                  type="tel"
                  size="small"
                  sx={{ display: "inline-block", fontSize: 20 }}
                  value={addressDetail}
                  onChange={onAddressDetailChange}
                  helperText={addressDetailMessage}
                />
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SvgIcon
                  component={LocationOn}
                  sx={{ color: "#1976d2", marginBottom: "5px" }}
                />{" "}
                &nbsp;&nbsp;
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {addressDetail}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ marginBottom: "12px" }}>
            {isEditMode ? (
              <Box>
                <SvgIcon
                  component={Badge}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <FormControl>
                  <Select
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                    value={hierarchyId}
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
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SvgIcon
                  component={Badge}
                  sx={{ color: "#1976d2", marginBottom: "13px" }}
                />{" "}
                &nbsp;&nbsp;
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {hierarchyList.find((it) => it.id === hierarchyId)?.nameKr}
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            {isEditMode ? (
              <Box>
                <SvgIcon
                  component={Grade}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <FormControl>
                  <Select
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                    value={roleId}
                    onChange={(e) =>
                      setRoleId(parseInt(e.target.value as string))
                    }
                  >
                    {filteredRoleList.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.nameKr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SvgIcon
                  component={Grade}
                  sx={{ color: "#1976d2", marginBottom: "13px" }}
                />{" "}
                &nbsp;&nbsp;
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {filteredRoleList.find((it) => it.id === roleId)?.nameKr}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default EmployeeInfoCard;
