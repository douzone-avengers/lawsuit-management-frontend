import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
//import requestd, { RequestSuccessHandler } from "../../lib/request.ts";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";

//import PopUp from "../common/PopUp.tsx";

import { Advicedata } from "../../../mock/advice/advicedata.ts";
import PopUp from "../../common/PopUp.tsx";
import CloseButton from "../../common/CloseButton.tsx";
import adviceRegisterPopUpOpenState from "./AdviceRegisterPopUpOpenState.tsx";

function AdviceRegisterPopUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");

  //   const setClientRegisterPopUpOpen = useSetRecoilState(
  //     clientRegisterPopUpState,
  //     );

  const setAdviceRegisterPopUpOpen = useSetRecoilState(
    adviceRegisterPopUpOpenState,
  );
  //   const [subNavigationBar, setSubNavigationBar] = useRecoilState(
  //     subNavigationBarState,
  //   );
  const handleCloseButtonClick = () => {
    setAdviceRegisterPopUpOpen(false);
  };
  const handleRegisterButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: Advicedata[] } = res.data;
      const newItems: MainNavigationBarItemState[] = body.data.map((item) => {
        return {
          id: item.id,
          text: item.contents,
          url: `clients/${item.id}`,
          SvgIcon: PersonIcon,
        };
      });

      setAdviceRegisterPopUpOpen(false);
      setName("");
      setEmail("");
      setTitle("");
      setContents("");
      setDate("");
    };

    request("POST", "/clients", {
      body: {
        name,
        email,
        title,
        contents,
        date,
      },
      onSuccess: handleRequestSuccess,
    });
  };
  return (
    <PopUp>
      {/* <CloseButton onClick={handleCloseButtonClick} /> */}
      <CloseButton onClick={handleCloseButtonClick} />
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        상담 등록
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
        type="text"
        size="small"
        label="상담 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        type="text"
        size="medium"
        label="상담 내용"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <TextField
        type="date"
        size="small"
        label="상담 일시"
        value={date}
        onChange={(e) => setContents(e.target.value)}
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

export default AdviceRegisterPopUp;
