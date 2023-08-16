import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import { MainNavigationBarItemState } from "../layout/snb/MainNavigationBarItem.tsx";
import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import { ClientData } from "../../type/ResponseType.ts";

function ClientRegisterPopUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const setClientRegisterPopUpOpen = useSetRecoilState(
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
    <PopUp>
      <CloseButton onClick={handleCloseButtonClick} />
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
    </PopUp>
  );
}

export default ClientRegisterPopUp;
