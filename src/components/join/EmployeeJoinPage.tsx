import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo.tsx";
import PopUp from "../common/PopUp";
import DaumPostcode from "react-daum-postcode";
import ReactModal from "react-modal";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import { useRecoilValue } from "recoil";
import validatedEmployeeKeyState from "../../states/join/ValidatedEmployeeKeyState";
import NormalDialog from "../common/dialog/NormalDialog";

type AlertState = {
  isOpen: boolean;
  message: string;
  action: any;
};

type Hierarchy = {
  id: number;
  nameEng: string;
  nameKr: string;
};

function EmployeeJoinPage() {
  const validatedEmployeeKey = useRecoilValue(validatedEmployeeKeyState);

  const [hierarchyMenuList, setHierarchyMenuList] = useState<Hierarchy[]>([]);
  const [promotionKey, setPromotionKey] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordOk, setIsPasswordOk] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirmOk, setIsPasswordConfirmOk] = useState(true);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [name, setName] = useState("");
  const [isNameOk, setIsNameOk] = useState(true);
  const [nameMessage, setNameMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [isPhoneOk, setIsPhoneOk] = useState(true);
  const [phoneMessage, setPhoneMessage] = useState("");

  const [address, setAddress] = useState("");
  const [hierarchyId, setHierarchyId] = useState(2);

  const [addressDetail, setAddressDetail] = useState("");
  const [isAddressDetailOk, setIsAddressDetailOk] = useState(true);
  const [addressDetailMessage, setAddressDetailMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    message: "",
    action: null,
  });

  const setAlertIsOpen = (isOpen: boolean) => {
    setAlert((prevState) => ({ ...prevState, isOpen: isOpen }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    setPromotionKey(validatedEmployeeKey);
  }, [validatedEmployeeKey]);

  useEffect(() => {
    hierarchyRequest();
  }, []);

  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      setHierarchyMenuList(res.data);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      const message = (e.response.data as { code: string; message: string })
        .message;
      setAlert({ isOpen: true, message: message, action: null });
    };

    requestDeprecated("GET", `/hierarchy`, {
      withToken: false,

      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  const joinRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = () => {
      const afterClose = () => {
        navigate("/login");
      };
      setAlert({
        isOpen: true,
        message: "가입 되었습니다.",
        action: afterClose,
      });
    };

    const handelRequestFail: RequestFailHandler = (e) => {
      const message = (e.response.data as { code: string; message: string })
        .message;
      setAlert({ isOpen: true, message: message, action: null });
    };

    const canRequest = () => {
      const hasRequiredFields =
        promotionKey &&
        email &&
        password &&
        passwordConfirm &&
        name &&
        phone &&
        address &&
        addressDetail &&
        hierarchyId;

      const isDataValid =
        isEmailOk &&
        isPasswordOk &&
        isPasswordConfirmOk &&
        isNameOk &&
        isPhoneOk &&
        isAddressDetailOk;

      return hasRequiredFields && isDataValid;
    };

    if (!canRequest()) {
      setAlert({
        isOpen: true,
        message: "입력되지 않은 정보가 있습니다.",
        action: null,
      });
      return;
    }
    requestDeprecated("POST", `/members/employees`, {
      withToken: false,

      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
      body: {
        promotionKey,
        email,
        password,
        name,
        phone,
        address,
        addressDetail,
        hierarchyId,
        roleId: 2, //일반사원
      },
    });
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
    } else {
      setEmailMessage("");
      setIsEmailOk(true);
    }
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자 조합 8자리 이상 입력하세요");
      setIsPasswordOk(false);
    } else {
      setPasswordMessage("");
      setIsPasswordOk(true);
    }
  };

  const onPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirmOk(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 다릅니다.");
      setIsPasswordConfirmOk(false);
    }
  };

  const onNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length >= 10) {
      setNameMessage("2글자 이상 10글자 이하로 입력해주세요.");
      setIsNameOk(false);
    } else {
      setNameMessage("");
      setIsNameOk(true);
    }
  };

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
      setPhoneMessage("");
      setIsPhoneOk(true);
    } else {
      setPhoneMessage("올바르지 않은 전화번호 형식입니다.");
      setIsPhoneOk(false);
    }
  };

  const onAddressDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddressDetail(e.target.value);
    if (e.target.value.length === 0) {
      setAddressDetailMessage("상세주소를 입력해주세요.");
      setIsAddressDetailOk(false);
    } else {
      setAddressDetailMessage("");
      setIsAddressDetailOk(true);
    }
  };

  return (
    <>
      <NormalDialog
        openStatus={alert.isOpen}
        setOpenStatus={setAlertIsOpen}
        title={"알림"}
        text={alert.message}
        action={alert.action}
      />
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
              setIsModalOpen(false);
            }}
            autoClose={false}
            defaultQuery="부산 해운대구 센텀중앙로 79"
          />
        </ReactModal>

        <Logo sx={{ width: "50%", marginBottom: 2 }} />
        <TextField
          disabled
          type="text"
          size="small"
          label="가입키"
          value={promotionKey}
        />
        <TextField
          {...(isEmailOk ? {} : { error: true })}
          type="email"
          size="small"
          label="이메일"
          value={email}
          onChange={onEmailChange}
          helperText={emailMessage}
        />
        <TextField
          {...(isPasswordOk ? {} : { error: true })}
          type="password"
          size="small"
          label="비밀번호"
          value={password}
          onChange={onPasswordChange}
          helperText={passwordMessage}
        />
        <TextField
          {...(isPasswordConfirmOk ? {} : { error: true })}
          type="password"
          size="small"
          label="비밀번호 확인"
          value={passwordConfirm}
          onChange={onPasswordConfirmChange}
          helperText={passwordConfirmMessage}
        />

        <TextField
          {...(isNameOk ? {} : { error: true })}
          type="text"
          size="small"
          label="이름"
          value={name}
          onChange={onNameChange}
          helperText={nameMessage}
        />

        <TextField
          {...(isPhoneOk ? {} : { error: true })}
          type="tel"
          size="small"
          label="전화번호"
          value={phone}
          onChange={onPhoneChange}
          helperText={phoneMessage}
        />

        <Box>
          <TextField type="text" size="small" label="주소" value={address} />
          <Button
            size="small"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            주소검색
          </Button>
        </Box>

        <TextField
          {...(isAddressDetailOk ? {} : { error: true })}
          type="text"
          size="small"
          label="상세주소"
          value={addressDetail}
          onChange={onAddressDetailChange}
          helperText={addressDetailMessage}
        />

        <FormControl fullWidth size="small">
          <InputLabel>직책</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={hierarchyId}
            label="Age"
            onChange={(e) => setHierarchyId(parseInt(e.target.value as string))}
          >
            {hierarchyMenuList.map((hierarchy) => (
              <MenuItem key={hierarchy.id} value={hierarchy.id}>
                {hierarchy.nameKr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" size="large" onClick={joinRequest}>
          회원 가입
        </Button>
      </PopUp>
    </>
  );
}

export default EmployeeJoinPage;
