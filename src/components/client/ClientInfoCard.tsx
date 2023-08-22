import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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
} from "@mui/icons-material";
import ClientRemovePopUpButton from "./ClientRemovePopUpButton.tsx";
import { Link, SvgIcon, Typography } from "@mui/material";
import { ClientData } from "../../type/ResponseType.ts";
import ConfirmDialog from "../common/ConfirmDialog";

type Props = {
  width?: string | number;
  height?: string | number;
};

function ClientInfoCard({ width, height }: Props) {
  const clientId = useRecoilValue(clientIdState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [memberId, setMemberId] = useState<number>();
  const [editMode, setEditMode] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);

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

    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      onSuccess: handleRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  const requestCreateClientPromotion = () => {
    return new Promise((resolve, reject) => {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        alert(`초대키가 발급되었습니다.\n발급된 초대키 : ${res.data}`);
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
      <ConfirmDialog
        openStatus={isPromotionDialogOpen}
        setOpenStatus={setIsPromotionDialogOpen}
        title={"의뢰인 회원 초대"}
        text={`해당 고객의 이메일<b>(${email})</b>로 초대코드가 발급됩니다.<br/>진행하시겠습니까?`}
        agreeAction={requestCreateClientPromotion}
      />
      <Card sx={{ width, height }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}>
              {editMode ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
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
          </Box>
          <Typography
            sx={{ display: "inline-block" }}
            variant="h4"
            contentEditable={editMode}
          >
            {name}
          </Typography>
          <br />
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
              <SvgIcon component={AppRegistration} /> &nbsp;회원가입 완료
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
          <Typography
            sx={{ display: "inline-block", fontSize: 20 }}
            color="text.secondary"
            gutterBottom
            contentEditable={editMode}
          >
            <SvgIcon component={Email} /> &nbsp;
            {email}
          </Typography>
          <br />
          <Typography
            sx={{ display: "inline-block", fontSize: 20 }}
            color="text.secondary"
            gutterBottom
            contentEditable={editMode}
          >
            <SvgIcon component={PhoneIphone} /> &nbsp;
            {phone}
          </Typography>
          <br />
          <Typography
            sx={{ display: "inline-block", fontSize: 20 }}
            color="text.secondary"
            gutterBottom
            contentEditable={editMode}
          >
            <SvgIcon component={LocationOn} /> &nbsp;
            {address}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ClientInfoCard;
