import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import PopUp from "../common/PopUp.tsx";
import CloseButton from "../common/CloseButton.tsx";
import { ClientData } from "../../type/ResponseType.ts";
import curMemberAddressState from "../../states/employee/CurMemberAddressState.tsx";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import Box from "@mui/material/Box";
import { SubNavigationBarItemState } from "../layout/snb/SubNavigationBarItem";
import * as React from "react";

function ClientRegisterPopUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [showWarnings, setShowWarnings] = useState<boolean>(false);
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [isPhoneOk, setIsPhoneOk] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [isAddressDetailOk, setIsAddressDetailOk] = useState(false);
  const [addressDetailMessage, setAddressDetailMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRecoilAddress = useSetRecoilState(curMemberAddressState);

  const setClientRegisterPopUpOpen = useSetRecoilState(
    clientRegisterPopUpState,
  );
  const setSubNavigationBar = useSetRecoilState(subNavigationBarState);
  const handleCloseButtonClick = () => {
    setClientRegisterPopUpOpen(false);
  };
  const handleRegisterButtonClick = () => {
    console.log(email.length);
    if (
      !name.length ||
      !isEmailOk ||
      !isPhoneOk ||
      address.length < 1 ||
      !isAddressDetailOk
    ) {
      setShowWarnings(true);
      return;
    }

    setShowWarnings(false);

    const handleRequestSuccess: RequestSuccessHandler = () => {
      setClientRegisterPopUpOpen(false);
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setAddressDetail("");
      handelAfterRegister();
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("POST", "/clients", {
      body: {
        name,
        phone,
        email,
        address,
        addressDetail,
      },

      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });

    setClientRegisterPopUpOpen(false);
  };

  const handelAfterRegister = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: ClientData[] = res.data;
      const newItems: SubNavigationBarItemState[] = body.map((item) => {
        return {
          id: item.id,
          text: item.name,
          url: `clients/${item.id}`,
          SvgIcon: PersonIcon,
        };
      });
      setSubNavigationBar({
        type: "client",
        curId: newItems[0].id,
        items: newItems,
      });
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", "/clients", {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  const onPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length <= 11) {
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
    }
  };

  const onEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다.");
      setIsEmailOk(false);
    } else if (emailCurrent.length == 0) {
      setIsEmailOk(true);
    } else {
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmailOk(true);
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

  console.log(showWarnings);
  console.log(isEmailOk);

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
        {...(showWarnings && !name.length ? { error: true } : {})}
        type="text"
        size="small"
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {showWarnings && !isEmailOk ? (
        <TextField
          error
          type="email"
          size="small"
          label="이메일"
          value={email}
          onChange={onEmailChange}
          helperText={emailMessage}
        />
      ) : (
        <TextField
          {...(isEmailOk
            ? {}
            : { ...(email.length == 0 ? {} : { error: true }) })}
          type="email"
          size="small"
          label="이메일"
          value={email}
          onChange={onEmailChange}
          helperText={emailMessage}
        />
      )}
      {showWarnings && !isPhoneOk ? (
        <TextField
          error
          type="tel"
          size="small"
          label="전화번호"
          value={phone}
          placeholder="010-xxxx-xxxx"
          onChange={onPhoneChange}
          helperText={phoneMessage}
        />
      ) : (
        <TextField
          {...(isPhoneOk
            ? {}
            : { ...(phone.length == 0 ? {} : { error: true }) })}
          type="tel"
          size="small"
          label="전화번호"
          value={phone}
          placeholder="010-xxxx-xxxx"
          onChange={onPhoneChange}
          helperText={phoneMessage}
        />
      )}
      <Box>
        <TextField
          {...(showWarnings && address.length == 0 ? { error: true } : {})}
          type="text"
          size="small"
          label="주소"
          value={address}
        />
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
      <TextField
        {...(showWarnings && !isAddressDetailOk ? { error: true } : {})}
        type="addressDetail"
        size="small"
        label="상세주소"
        value={addressDetail}
        onChange={onAddressDetailChange}
        helperText={addressDetailMessage}
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
