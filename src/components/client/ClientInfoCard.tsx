import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientIdState from "../../states/client/ClientIdState.tsx";
import Button from "@mui/material/Button";
import {
  AppRegistration,
  Email,
  LocationOn,
  PhoneIphone,
  Person,
} from "@mui/icons-material";
import ClientRemovePopUpButton from "./ClientRemovePopUpButton.tsx";
import { Link, SvgIcon, Typography } from "@mui/material";
import { ClientData } from "../../type/ResponseType.ts";
import ConfirmDialog from "../common/dialog/ConfirmDialog";
import NormalDialog from "../common/dialog/NormalDialog";
import TextField from "@mui/material/TextField";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import curMemberAddressState from "../../states/employee/CurMemberAddressState.tsx";

type Props = {
  width?: string | number;
  height?: string | number;
  useEdit?: boolean;
};

function ClientInfoCard({ width, height, useEdit }: Props) {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [memberId, setMemberId] = useState<number>();
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [promotionKey, setPromotionKey] = useState("");

  useEffect(() => {
    if (typeof clientId !== "number") {
      return;
    }
    requestClientInfo();
  }, [clientId]);

  const requestClientInfo = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const clientData: ClientData = res.data;
      setName(clientData.name);
      setPhone(clientData.phone);
      setEmail(clientData.email);
      setAddress(clientData.address);
      setMemberId(clientData.memberId);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const requestUpdateClientInfo = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const updatedData: ClientData = res.data;
        setName(updatedData.name);
        setPhone(updatedData.phone);
        setEmail(updatedData.email);
        setAddress(updatedData.address);
        setMemberId(updatedData.memberId);
      };

      const handleRequestFail2: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
      };

      requestDeprecated("GET", `/clients/${clientId}`, {
        useMock: false,
        onSuccess: handleRequestSuccess2,
        onFail: handleRequestFail2,
      });
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PUT", `/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      body: {
        email,
        name,
        phone,
        address,
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const requestCreateClientPromotion = () => {
    return new Promise((resolve, reject) => {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        setPromotionKey(res.data);
        setIsDialogOpen(true);
        resolve(res); // 작업이 성공적으로 완료되면 resolve를 호출합니다.
      };

      const handelRequestFail: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
        reject(e); // 에러 발생 시 reject를 호출합니다.
      };

      requestDeprecated("POST", `/promotions/clients/${clientId}`, {
        useMock: false,
        withToken: true,
        onSuccess: handleRequestSuccess,
        onFail: handelRequestFail,
      });
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
            setIsModalOpen(false);
          }}
          autoClose={false}
          defaultQuery={address}
        />
      </ReactModal>
      <NormalDialog
        openStatus={isDialogOpen}
        setOpenStatus={setIsDialogOpen}
        title={"고객 초대키 발급 성공"}
        text={`초대키가 발급되었습니다.<br/>발급된 초대키 : <b>${promotionKey}</b>`}
      />
      <ConfirmDialog
        openStatus={isPromotionDialogOpen}
        setOpenStatus={setIsPromotionDialogOpen}
        title={"의뢰인 회원 초대"}
        text={`해당 고객의 이메일<b>(${email})</b>로 초대코드가 발급됩니다.<br/>진행하시겠습니까?`}
        agreeAction={requestCreateClientPromotion}
      />
      <Card sx={{ width, height }}>
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            {!editMode ? (
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
            {useEdit ? (
              <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}>
                {editMode ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      requestUpdateClientInfo();
                      setEditMode(false);
                    }}
                  >
                    확인
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    수정
                  </Button>
                )}
                <ClientRemovePopUpButton />
              </Box>
            ) : null}
          </Box>
          <hr />
          <br />
          {memberId ? (
            <Typography
              sx={{
                display: "inline-block",
                fontSize: 20,
                fontWeight: "bold",
              }}
              color="text.secondary"
              gutterBottom
              contentEditable={editMode}
            >
              <SvgIcon component={AppRegistration} sx={{ color: "#1976d2" }} />{" "}
              &nbsp;회원가입 완료
            </Typography>
          ) : (
            <Typography
              sx={{
                display: "inline-block",
                fontSize: 20,
                fontWeight: "bold",
              }}
              color="text.secondary"
              gutterBottom
              contentEditable={editMode}
            >
              <SvgIcon component={AppRegistration} />
              &nbsp;
              <Link
                component="button"
                sx={{
                  display: "inline-block",
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => setIsPromotionDialogOpen(true)}
              >
                회원 초대
              </Link>
            </Typography>
          )}
          <br />
          <br />
          <Box>
            {useEdit ? (
              <Box>
                <SvgIcon
                  component={Email}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <TextField
                  disabled={!editMode}
                  size="small"
                  sx={{ display: "inline-block", fontSize: 20 }}
                  color="secondary"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
            ) : (
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
            )}
          </Box>
          <br />
          <Box>
            {useEdit ? (
              <Box>
                <SvgIcon
                  component={PhoneIphone}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <TextField
                  disabled={!editMode}
                  size="small"
                  sx={{ display: "inline-block", fontSize: 20 }}
                  color="secondary"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
          <br />
          <Box>
            {useEdit ? (
              <Box>
                <SvgIcon
                  component={LocationOn}
                  sx={{ color: "#1976d2", marginTop: "5px" }}
                />{" "}
                &nbsp;
                <TextField
                  disabled={!editMode}
                  size="small"
                  sx={{ display: "inline-block", fontSize: 20 }}
                  color="secondary"
                  value={address}
                />
              </Box>
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
            {editMode ? (
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default ClientInfoCard;
