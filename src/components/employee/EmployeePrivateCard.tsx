import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import Button from "@mui/material/Button";
import { Business, Email, LocationOn, PhoneIphone } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import userState from "../../states/common/UserState";
import { MemberInfo } from "../../mock/member/memberHandlers";

type Props = {
  width?: string | number;
  height?: string | number;
};

function EmployeePrivateCard({ width, height }: Props) {
  const loginUser = useRecoilValue(userState);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hierarchy, setHierarchy] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!loginUser) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: MemberInfo } = res.data;
      const { data } = body;
      const { email, name, phone, hierarchy, role, address } = data;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setHierarchy(hierarchy);
      setRole(role);
      setAddress(address);

      console.log("이메일 : " + email);
    };

    request("GET", `/members/${loginUser?.id}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [loginUser]);

  return (
    <Card sx={{ width, height }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", justifyContent: "right", gap: 1 }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{ display: "inline-block" }}
            variant="h4"
            contentEditable={editMode}
          >
            {name}
          </Typography>
        </Box>
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
      </Box>

      <hr />
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
      <br />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
        contentEditable="false"
      >
        <SvgIcon component={Business} /> &nbsp;
        {hierarchy}
      </Typography>
      <br />
      <Typography
        sx={{ display: "inline-block", fontSize: 20 }}
        color="text.secondary"
        gutterBottom
        contentEditable="false"
      >
        <SvgIcon component={Business} /> &nbsp;
        {role}
      </Typography>
    </Card>
  );
}

export default EmployeePrivateCard;
