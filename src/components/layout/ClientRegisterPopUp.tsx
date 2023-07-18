import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { ClientData } from "../../mock/client/clientTable";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import { MainNavigationBarItemState } from "./MainNavigationBarItem";

function ClientRegisterPopUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [clientRegisterPopUpOpen, setClientRegisterPopUpOpen] = useRecoilState(
    clientRegisterPopUpState,
  );
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );
  const handleCloseButtonClick = () => {
    setClientRegisterPopUpOpen(false);
  };
  const handleRegisterButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: ClientData[] } = res.data;
      const newItems: MainNavigationBarItemState[] = body.data.map((item) => {
        return {
          id: item.id,
          text: item.name,
          url: `clients/${item.id}`,
          SvgIcon: PersonIcon,
        };
      });
      setSubNavigationBar({ ...subNavigationBar, items: newItems });
      setClientRegisterPopUpOpen(false);
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
    };

    request("POST", "/clients", {
      body: {
        name,
        phone,
        email,
        address,
      },
      onSuccess: handleRequestSuccess,
    });
  };
  return (
    <Dialog open={clientRegisterPopUpOpen} sx={{ backdropFilter: "blur(3px)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 360,
          padding: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "right", cursor: "pointer" }}
          onClick={handleCloseButtonClick}
        >
          <CloseIcon />
        </Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          의뢰인 등록
        </Typography>
        <TextField
          type="text"
          size="small"
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="email"
          size="small"
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="tel"
          size="small"
          label="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          type="text"
          size="small"
          label="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleRegisterButtonClick}
        >
          등록
        </Button>
      </Box>
    </Dialog>
  );
}

export default ClientRegisterPopUp;
