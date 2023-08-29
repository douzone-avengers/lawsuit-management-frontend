import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import { MainNavigationBarItemState } from "../layout/snb/MainNavigationBarItem.tsx";
import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import { ClientData } from "../../type/ResponseType.ts";
import curMemberAddressState from "../../states/employee/CurMemberAddressState.tsx";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import Box from "@mui/material/Box";

function ClientRegisterPopUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);

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

    requestDeprecated("POST", "/clients", {
      body: {
        name,
        phone,
        email,
        address,
      },
      useMock: false,
      onSuccess: handleRequestSuccess,
    });

    setClientRegisterPopUpOpen(false);
  };

  return (
    <PopUp>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", flex: 1, marginLeft: "20px" }}
        >
          의뢰인 등록
        </Typography>
        <CloseButton onClick={handleCloseButtonClick} />
      </Box>
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
      <Box>
        <TextField type="text" size="small" label="주소" value={address} />
        <Button
          size="small"
          sx={{ marginTop: "5px" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          주소검색
        </Button>
      </Box>
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
